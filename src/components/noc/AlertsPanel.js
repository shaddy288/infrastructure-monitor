import { useEffect, useRef } from "react"
import { Chip } from "./atoms"

export function AlertsPanel({ alerts, open }) {
  const topRef = useRef(null)
  useEffect(() => { if (topRef.current) topRef.current.scrollTop = 0 }, [alerts.length])

  return (
    <div
      className="flex-shrink-0 flex flex-col h-screen overflow-hidden bg-white border-r border-slate-200 transition-all duration-300 ease-in-out"
      style={{ width: open ? "240px" : "0px" }}
    >
      {/* Inner — always 240px wide, hidden by parent clip */}
      <div className="w-[240px] flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Live Alerts</span>
          </div>
          <span className="min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold text-white bg-red-500 rounded-full px-1">
            {alerts.filter((a) => a.status === "down").length}
          </span>
        </div>

        {/* Feed */}
        <div ref={topRef} className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {alerts.map((a, i) => (
            <div
              key={a.id}
              className={`px-3 py-2.5 hover:bg-slate-50 transition-colors ${i === 0 ? "animate-[fadeDown_280ms_ease-out]" : ""}`}
            >
              <div className="flex items-start justify-between gap-1 mb-1">
                <span className="text-[11px] font-bold text-slate-800 leading-tight">{a.city}</span>
                <span className="text-[10px] text-slate-400 font-mono flex-shrink-0 mt-px">{a.ts}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Chip s={a.status} />
                <span className="text-[10px] text-slate-500 truncate">{a.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 py-2 border-t border-slate-100 bg-slate-50 flex-shrink-0">
          <p className="text-[10px] text-slate-400 text-center">Updates every 5 s</p>
        </div>
      </div>
    </div>
  )
}