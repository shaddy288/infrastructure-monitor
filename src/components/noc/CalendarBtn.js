import { useState, useEffect, useMemo } from "react"
import { LINK_KEYS, LINK_META } from "./data"
import { fetchHistoricalReport } from "./api"

export function CalendarBtn({ stations = [], alerts = [], availableDateInfo = null }) {
  const MN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const DN = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const td = new Date()

  const availableSet = useMemo(() => {
    return new Set(availableDateInfo?.availableDates || [])
  }, [availableDateInfo])

  const minDateObj = useMemo(() => {
    return availableDateInfo?.minDate ? new Date(availableDateInfo.minDate + "T00:00:00") : null
  }, [availableDateInfo])

  const maxDateObj = useMemo(() => {
    return availableDateInfo?.maxDate ? new Date(availableDateInfo.maxDate + "T00:00:00") : null
  }, [availableDateInfo])

  const [open, setOpen] = useState(false)
  const [vy, setVy] = useState(maxDateObj ? maxDateObj.getFullYear() : td.getFullYear())
  const [vm, setVm] = useState(maxDateObj ? maxDateObj.getMonth() : td.getMonth())
  const [rs, setRs] = useState(null)
  const [re, setRe] = useState(null)
  const [hov, setHov] = useState(null)
  const [exporting, setExporting] = useState(false)

  // Sync calendar view month when available date info loads
  useEffect(() => {
    if (maxDateObj) {
      setVy(maxDateObj.getFullYear())
      setVm(maxDateObj.getMonth())
    }
  }, [maxDateObj])

  function dim(y, m) { return new Date(y, m + 1, 0).getDate() }
  function fd(y, m) { return new Date(y, m, 1).getDay() }
  function sd(a, b) { return a.toDateString() === b.toDateString() }
  function inr(d) {
    const e = re ?? hov
    if (!rs || !e) return false
    const lo = rs < e ? rs : e, hi = rs < e ? e : rs
    return d > lo && d < hi
  }
  function fmt(d) { return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}` }
  function toIso(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` }

  function isAvailable(d) {
    if (!d) return false
    const iso = toIso(d)
    if (availableSet.size > 0) {
      return availableSet.has(iso)
    }
    if (minDateObj && maxDateObj) {
      return d >= minDateObj && d <= maxDateObj
    }
    return true
  }

  function canPrevMonth() {
    if (!minDateObj) return true
    const prevMonthDate = new Date(vy, vm - 1, dim(vy, vm - 1))
    return prevMonthDate >= minDateObj
  }

  function canNextMonth() {
    if (!maxDateObj) return true
    const nextMonthDate = new Date(vy, vm + 1, 1)
    return nextMonthDate <= maxDateObj
  }

  function pm() {
    if (!canPrevMonth()) return
    vm === 0 ? (setVm(11), setVy((y) => y - 1)) : setVm((m) => m - 1)
  }
  function nm() {
    if (!canNextMonth()) return
    vm === 11 ? (setVm(0), setVy((y) => y + 1)) : setVm((m) => m + 1)
  }

  function pick(d) {
    if (!isAvailable(d)) return
    if (!rs || (rs && re)) { setRs(d); setRe(null) }
    else { d < rs ? (setRe(rs), setRs(d)) : setRe(d) }
  }

  // Preset Date Selection Helpers
  function selectPreset(type) {
    const end = maxDateObj || new Date()
    const start = new Date(end)

    if (type === "latest") {
      setRs(end)
      setRe(end)
    } else if (type === "7days") {
      start.setDate(end.getDate() - 6)
      const clampedStart = (minDateObj && start < minDateObj) ? minDateObj : start
      setRs(clampedStart)
      setRe(end)
    } else if (type === "all") {
      setRs(minDateObj || start)
      setRe(end)
    }
    setVm(end.getMonth())
    setVy(end.getFullYear())
  }

  async function generateCsv() {
    setExporting(true)
    const fallbackDate = maxDateObj || td
    const fr = rs ? fmt(rs) : fmt(fallbackDate)
    const to = re ? fmt(re) : fr

    const startDateIso = rs ? toIso(rs) : toIso(fallbackDate)
    const endDateIso = re ? toIso(re) : startDateIso

    let rows = []
    let downCount = 0
    let latencyCount = 0

    try {
      const records = await fetchHistoricalReport(startDateIso, endDateIso)
      if (records && records.length > 0) {
        records.forEach((r) => {
          if (r.status === "down") downCount++
          if (r.status === "latency") latencyCount++
          const latencyStr = r.status === "down" ? "N/A" : `${r.latencyMs || 0} ms`
          rows.push(`"${r.date}","${r.stationName}","${r.region}","${r.linkLabel}","${r.operator}","${r.ip}","${r.bandwidth}","${r.status.toUpperCase()}","${latencyStr}","${r.downTime}"`)
        })
      }
    } catch (err) {
      console.warn("Falling back to local state for CSV export:", err)
    }

    // Fallback if API returned empty
    if (rows.length === 0) {
      stations.forEach((c) => {
        LINK_KEYS.forEach((k) => {
          const link = c.links?.[k]
          if (!link || !link.providers) return
          link.providers.forEach((p) => {
            if (p.status === "down") downCount++
            if (p.status === "latency") latencyCount++
            const latencyStr = p.status === "down" ? "N/A" : `${p.latencyMs || 0} ms`
            let downTimeStr = p.downTime || p.down_since || "N/A"
            const ipVal = p.ip || p.ip_address || "-"
            const bwVal = p.bandwidth || "-"
            const opVal = p.operator || "-"
            rows.push(`"${startDateIso}","${c.name}","${c.region}","${LINK_META[k].label}","${opVal}","${ipVal}","${bwVal}","${p.status.toUpperCase()}","${latencyStr}","${downTimeStr}"`)
          })
        })
      })
    }

    const csvLines = [
      "Radio City NOC - Infrastructure Monitoring & Downtime Report",
      `Period: ${fr} to ${to}`,
      `Generated At: ${new Date().toLocaleString()}`,
      `Summary: ${stations.length} Stations Evaluated | ${downCount} Down Links | ${latencyCount} High Latency Links`,
      "",
      "REPORT DATE,STATION,ZONE,LINK CATEGORY,ISP OPERATOR,IP ADDRESS,BANDWIDTH,STATUS,LATENCY (MS),DOWN TIME",
      ...rows,
    ].join("\n")

    // Prepend UTF-8 BOM for Microsoft Excel
    const blobContent = "\uFEFF" + csvLines
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([blobContent], { type: "text/csv;charset=utf-8;" }))
    a.download = `noc-downtime-report-${fr.replace(/\//g, "-")}-to-${to.replace(/\//g, "-")}.csv`
    a.click()

    setExporting(false)
    setOpen(false)
  }

  const off = fd(vy, vm), tot = dim(vy, vm)
  const cells = Array.from({ length: off + tot }, (_, i) => (i < off ? null : new Date(vy, vm, i - off + 1)))

  return (
  <div className="relative">
    <button
      onClick={() => setOpen((o) => !o)}
      className={`w-8 h-8 rounded-lg border flex items-center justify-center cursor-pointer transition-all
          ${open ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600"}`}
      title="Generate & Export Downtime Report"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 6h12" stroke="currentColor" strokeWidth="1.2" />
        <path d="M4.5 1v2M9.5 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="4" cy="9.5" r=".7" fill="currentColor" />
        <circle cx="7" cy="9.5" r=".7" fill="currentColor" />
        <circle cx="10" cy="9.5" r=".7" fill="currentColor" />
      </svg>
    </button>

    {open && (
      <div
        className="absolute right-0 top-10 z-50 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden animate-[modalIn_150ms_ease-out]"
        style={{ width: "280px" }}
      >
        {/* Preset buttons row */}
        <div className="flex gap-1 p-2 bg-slate-50 border-b border-slate-100 text-[10px]">
          <button onClick={() => selectPreset("latest")} className="flex-1 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 cursor-pointer truncate">Latest</button>
          <button onClick={() => selectPreset("7days")} className="flex-1 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 cursor-pointer truncate">Last 7 Days</button>
          <button onClick={() => selectPreset("all")} className="flex-1 py-1 rounded bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 cursor-pointer truncate">All ({availableDateInfo?.totalAvailableDays || 10} Days)</button>
        </div>

        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
          <button
            onClick={pm}
            disabled={!canPrevMonth()}
            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7 2L3 5l4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span className="text-xs font-bold text-slate-800">{MN[vm]} {vy}</span>
          <button
            onClick={nm}
            disabled={!canNextMonth()}
            className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3 2l4 3-4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>

        <div className="px-3 py-2">
          <div className="grid grid-cols-7 mb-1">
            {DN.map((d) => <span key={d} className="text-center text-[9px] font-bold text-slate-400 py-0.5">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-y-0.5">
            {cells.map((date, i) => {
              if (!date) return <span key={i} />
              const avail = isAvailable(date)
              if (!avail) {
                return <span key={i} className="h-7 text-[11px] font-medium text-slate-200 flex items-center justify-center pointer-events-none select-none opacity-0">{date.getDate()}</span>
              }
              const iS = rs && sd(date, rs), iE = re && sd(date, re), iM = inr(date), iT = sd(date, maxDateObj || td)
              return (
                <button
                  key={i}
                  onClick={() => pick(date)}
                  onMouseEnter={() => setHov(date)}
                  onMouseLeave={() => setHov(null)}
                  className={`h-7 text-[11px] font-medium cursor-pointer rounded transition-all
                      ${iS || iE ? "bg-blue-600 text-white" : iM ? "bg-blue-100 text-blue-700 rounded-none" : "text-slate-700 hover:bg-blue-50 hover:text-blue-700"}
                      ${iT && !iS && !iE ? "underline decoration-dotted font-bold" : ""}`}
                >
                  {date.getDate()}
                </button>
              )
            })}
          </div>
        </div>

        <div className="border-t border-slate-100 px-3 py-2.5 space-y-2">
          <div className="flex gap-1.5 text-[10px]">
            <div className="flex-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700">
              {rs ? fmt(rs) : <span className="text-slate-400">Start</span>}
            </div>
            <div className="flex-1 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700">
              {re ? fmt(re) : <span className="text-slate-400">End</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setRs(null); setRe(null) }}
              className="flex-1 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer"
            >
              Clear
            </button>
            <button
              onClick={generateCsv}
              disabled={exporting}
              className="flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer transition-colors shadow-sm"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v5M2.5 4L5 6.5 7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 8.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              {exporting ? "Generating..." : "Export CSV"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  )
}

