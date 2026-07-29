import { useState } from "react"
import { CITIES, LINK_KEYS, LINK_META } from "./data"

export function CalendarBtn() {
  const MN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  const DN = ["Su","Mo","Tu","We","Th","Fr","Sa"]
  const td = new Date()
  const [open, setOpen] = useState(false)
  const [vy, setVy] = useState(td.getFullYear())
  const [vm, setVm] = useState(td.getMonth())
  const [rs, setRs] = useState(null)
  const [re, setRe] = useState(null)
  const [hov, setHov] = useState(null)

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
  function pm() { vm === 0 ? (setVm(11), setVy((y) => y - 1)) : setVm((m) => m - 1) }
  function nm() { vm === 11 ? (setVm(0), setVy((y) => y + 1)) : setVm((m) => m + 1) }
  function pick(d) {
    if (!rs || (rs && re)) { setRs(d); setRe(null) }
    else { d < rs ? (setRe(rs), setRs(d)) : setRe(d) }
  }
  function dl() {
    if (!rs) return
    const fr = fmt(rs), to = re ? fmt(re) : fr
    const csv = [
      "NOC Report", `Period: ${fr} – ${to}`, "",
      "LOCATION,ZONE,LINK,OPERATOR,IP,BANDWIDTH,STATUS,LATENCY",
      ...CITIES.flatMap((c) => LINK_KEYS.flatMap((k) => {
        const link = c.links[k]
        if (!link) return []
        return link.providers.map((p) =>
          `${c.name},${c.region},${LINK_META[k].label},${p.operator},${p.ip},${p.bandwidth},${p.status},${p.status === "down" ? "—" : p.latencyMs}`
        )
      })),
    ].join("\n")
    const a = document.createElement("a")
    a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    a.download = `noc-${fr.replace(/\//g, "-")}-to-${to.replace(/\//g, "-")}.csv`
    a.click()
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
          className="absolute right-0 top-10 z-50 bg-white rounded-xl border border-slate-200 shadow-xl w-68 overflow-hidden animate-[modalIn_150ms_ease-out]"
          style={{ width: "272px" }}
        >
          <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
            <button onClick={pm} className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7 2L3 5l4 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span className="text-xs font-bold text-slate-800">{MN[vm]} {vy}</span>
            <button onClick={nm} className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer">
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
                const iS = rs && sd(date, rs), iE = re && sd(date, re), iM = inr(date), iT = sd(date, td)
                return (
                  <button
                    key={i}
                    onClick={() => pick(date)}
                    onMouseEnter={() => setHov(date)}
                    onMouseLeave={() => setHov(null)}
                    className={`h-7 text-[11px] font-medium cursor-pointer rounded transition-all
                      ${iS || iE ? "bg-blue-600 text-white" : iM ? "bg-blue-100 text-blue-700 rounded-none" : "text-slate-700 hover:bg-slate-100"}
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
                onClick={dl}
                disabled={!rs}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1
                  ${rs ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M5 1v5M2.5 4L5 6.5 7.5 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M1 8.5h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Export CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}