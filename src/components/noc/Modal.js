import { useEffect, useState } from "react"
import { LINK_META, S_COLOR } from "./data"
import { Chip } from "./atoms"
import { fetchStationLinkDetails, fetchCategoryReport } from "./api"

export function Modal({ target, onClose }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", fn)
    return () => window.removeEventListener("keydown", fn)
  }, [onClose])

  useEffect(() => {
    async function loadModalData() {
      setLoading(true)
      try {
        if (target.kind === "cityLink") {
          let details = null
          const linkObj = target.cityData?.links?.[target.linkKey]

          if (linkObj && linkObj.providers) {
            details = {
              stationName: target.cityData.name || target.city,
              region: target.cityData.region,
              subType: linkObj.subType,
              providers: linkObj.providers,
            }
          } else {
            details = await fetchStationLinkDetails(target.city, target.linkKey)
          }

          const meta = LINK_META[target?.linkKey] || { label: target?.linkKey || "Network", short: "NET", color: "#3B82F6" }
          const categoryLabel = details.subType ? `${meta.label} (${details.subType})` : meta.label
          setTitle(`${categoryLabel} — ${details.stationName || target.city}`)
          setSubtitle(`${details.providers?.length || 0} provider${details.providers?.length !== 1 ? "s" : ""} · ${details.region || "Zone"} zone`)

          setRows(
            (details.providers || []).map((p) => ({
              location: null,
              operator: p.operator,
              ip: p.ip,
              ipUnavailableReason: p.ipUnavailableReason,
              bandwidth: p.bandwidth,
              status: p.status,
              latencyMs: p.latencyMs,
              lastChecked: p.lastChecked,
              date: p.date,
            }))
          )
        } else {
          const meta = LINK_META[target?.linkKey] || { label: target?.linkKey || "Network", short: "NET", color: "#3B82F6" }
          const reportRows = await fetchCategoryReport(target.linkKey, target.tab)
          setTitle(`${meta.label} — ${target.tab === "down" ? "Down" : "Latency"} Report`)
          setSubtitle(`${reportRows.length} link${reportRows.length !== 1 ? "s" : ""} affected`)
          setRows(reportRows)
        }
      } catch (err) {
        setTitle("Backend Server Error")
        setSubtitle("Unable to load data from NOC backend")
        setRows([])
      } finally {
        setLoading(false)
      }
    }

    loadModalData()
  }, [target])


  const linkKey = target?.linkKey
  const meta = LINK_META[linkKey] || { label: linkKey || "Network", short: "NET", color: "#3B82F6" }
  const allDown = rows.length > 0 && rows.every((r) => r.status === "down")

  const cols = [
    target.kind === "card" ? "1fr" : null,
    "1fr",
    "1.3fr",
    "0.8fr",
    "0.7fr",
    allDown ? null : "0.7fr",
  ].filter(Boolean).join(" ")

  function exportModalCsv() {
    if (rows.length === 0) return
    const csvLines = [
      `Radio City NOC - ${title}`,
      `Generated At: ${new Date().toLocaleString()}`,
      `Summary: ${subtitle}`,
      "",
      target.kind === "card" ? "REPORT DATE,LOCATION,OPERATOR,IP ADDRESS,BANDWIDTH,STATUS,LATENCY (MS),DOWN TIME" : "REPORT DATE,OPERATOR,IP ADDRESS,BANDWIDTH,STATUS,LATENCY (MS),DOWN TIME",
      ...rows.map((r) => {
        const latStr = r.status === "down" ? "N/A" : `${r.latencyMs || 0} ms`
        let dtStr = r.downTime || r.down_time
        if (!dtStr || dtStr === "5 mins") {
          if (r.status === "down") {
            const downSince = r.downSince || r.down_since
            if (downSince) {
              const ms = Date.now() - new Date(downSince).getTime()
              const mins = Math.max(0, Math.round(ms / 60000))
              dtStr = mins < 1 ? "< 1 min" : mins < 60 ? `${mins} mins` : `${Math.floor(mins / 60)} hr ${mins % 60} mins`
            } else {
              dtStr = "< 1 min"
            }
          } else {
            dtStr = "N/A"
          }
        }

        const ipVal = r.ip || (r.ipUnavailableReason ? `N/A (${r.ipUnavailableReason})` : "N/A")
        const todayStr = r.date || new Date().toISOString().split("T")[0]
        return target.kind === "card"
          ? `"${todayStr}","${r.location || title}","${r.operator || "-"}","${ipVal}","${r.bandwidth || "-"}","${(r.status || "up").toUpperCase()}","${latStr}","${dtStr}"`
          : `"${todayStr}","${r.operator || "-"}","${ipVal}","${r.bandwidth || "-"}","${(r.status || "up").toUpperCase()}","${latStr}","${dtStr}"`
      }),
    ].join("\n")

    const blobContent = "\uFEFF" + csvLines
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([blobContent], { type: "text/csv;charset=utf-8;" }))
    a.download = `noc-modal-report-${linkKey}.csv`
    a.click()
  }


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ backgroundColor: "rgba(15,23,42,0.5)", backdropFilter: "blur(5px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col animate-[modalIn_180ms_ease-out]">
        {/* Modal header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black text-white"
              style={{ backgroundColor: meta.color }}
            >
              {meta.short}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">{title || "Loading..."}</p>
              <p className="text-[10px] text-slate-500 mt-px">{subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors cursor-pointer flex-shrink-0"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Provider table */}
        <div className="px-5 py-4 overflow-y-auto">
          {loading ? (
            <div className="py-8 text-center text-sm text-slate-400">Loading details from backend...</div>
          ) : rows.length === 0 ? (
            <p className="text-center text-sm text-slate-400 py-8">No records to show.</p>
          ) : (
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              {/* Header row */}
              <div
                className="grid gap-x-2 bg-slate-50 border-b border-slate-200 px-3 py-2"
                style={{ gridTemplateColumns: cols }}
              >
                {target.kind === "card" && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</span>}
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operator</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">IP Address</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bandwidth</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                {!allDown && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latency</span>}
              </div>

              {/* Data rows */}
              {rows.map((r, i) => (
                <div
                  key={i}
                  className={`grid gap-x-2 px-3 py-2.5 items-center border-b border-slate-100 last:border-0
                    ${i % 2 === 0 ? "bg-white" : "bg-slate-50/70"}`}
                  style={{ gridTemplateColumns: cols }}
                >
                  {target.kind === "card" && (
                    <span className="text-xs font-bold text-slate-700 truncate">{r.location}</span>
                  )}
                  <span className="text-xs font-medium text-slate-800 truncate">{r.operator}</span>
                  {r.ip ? (
                    <span className="text-xs font-mono text-slate-600 truncate">{r.ip}</span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded truncate max-w-fit"
                      title={r.ipUnavailableReason || "NO Static IP"}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      {r.ipUnavailableReason || "NO Static IP"}
                    </span>
                  )}
                  <span className="text-xs font-mono font-semibold text-slate-700">{r.bandwidth}</span>
                  <Chip s={r.status} />
                  {!allDown && (
                    r.status === "down" ? (
                      <span className="text-xs text-slate-400">—</span>
                    ) : r.status === "unmonitored" ? (
                      <span className="text-xs text-slate-400">—</span>
                    ) : (
                      <span className="text-xs font-mono font-bold" style={{ color: r.status === "latency" ? S_COLOR.latency : S_COLOR.up }}>
                        {r.latencyMs} ms
                      </span>
                    )
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center px-5 py-2.5 border-t border-slate-100 bg-slate-50 flex-shrink-0 gap-2">
          <span className="text-[10px] text-slate-400 mr-auto">Press Esc or click outside to dismiss</span>
          {rows.length > 0 && (
            <button
              onClick={exportModalCsv}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v5M2.5 4L5 6.5 7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 8.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Export CSV
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#0F172A] text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}