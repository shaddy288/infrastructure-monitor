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
      if (target.kind === "cityLink") {
        const details = await fetchStationLinkDetails(target.city, target.linkKey)
        setTitle(`${LINK_META[target.linkKey].label} — ${details.stationName || target.city}`)
        setSubtitle(`${details.providers?.length || 0} provider${details.providers?.length !== 1 ? "s" : ""} · ${details.region || "Zone"} zone`)
        setRows(
          (details.providers || []).map((p) => ({
            location: null,
            operator: p.operator,
            ip: p.ip,
            bandwidth: p.bandwidth,
            status: p.status,
            latencyMs: p.latencyMs,
            lastChecked: p.lastChecked,
          }))
        )
      } else {
        const reportRows = await fetchCategoryReport(target.linkKey, target.tab)
        setTitle(`${LINK_META[target.linkKey].label} — ${target.tab === "down" ? "Down" : "Latency"} Report`)
        setSubtitle(`${reportRows.length} link${reportRows.length !== 1 ? "s" : ""} affected`)
        setRows(reportRows)
      }
      setLoading(false)
    }

    loadModalData()
  }, [target])

  const linkKey = target.linkKey
  const allDown = rows.length > 0 && rows.every((r) => r.status === "down")

  const cols = [
    target.kind === "card" ? "1fr" : null,
    "1fr",
    "1.3fr",
    "0.8fr",
    "0.7fr",
    allDown ? null : "0.7fr",
  ].filter(Boolean).join(" ")

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
              style={{ backgroundColor: LINK_META[linkKey].color }}
            >
              {LINK_META[linkKey].short}
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
                  <span className="text-xs font-mono text-slate-600 truncate">{r.ip}</span>
                  <span className="text-xs font-mono font-semibold text-slate-700">{r.bandwidth}</span>
                  <Chip s={r.status} />
                  {!allDown && (
                    r.status === "down" ? (
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
        <div className="flex items-center px-5 py-2.5 border-t border-slate-100 bg-slate-50 flex-shrink-0">
          <span className="text-[10px] text-slate-400 mr-auto">Press Esc or click outside to dismiss</span>
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