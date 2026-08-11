import { LINK_META } from "./data"
import { Dot } from "./atoms"

export function MetricCard({ stat, activeTab, onTab }) {
  const meta = LINK_META[stat.key]
  // stat.total = only locations where this link type is actually provisioned
  const pct = stat.total > 0 ? Math.round((stat.up / stat.total) * 100) : 0

  return (
    <div
      className={`flex-1 min-w-0 bg-white rounded-xl border shadow-sm transition-all duration-200
      ${activeTab ? "border-blue-400 shadow-blue-100/50 shadow-md" : "border-slate-200 hover:border-slate-300"}`}
    >
      <div className="px-4 py-3">
        {/* Title + count */}
        <div className="flex items-start justify-between mb-2">
          <div>
            {/* <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{meta.short}</span> */}
            <p className="text-[20px] font-extrabold text-slate-800 leading-tight mt-0.5">{meta.label}</p>
          </div>
          <span className="text-2xl font-black text-slate-900 tabular-nums leading-none">{stat.total}</span>
        </div>

        {/* Health bar */}
        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mb-2.5">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, backgroundColor: "#10B981" }}
          />
        </div>

        {/* Status badges */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700">
            <Dot s="up" /><span className="text-[11px] font-extrabold">UP {stat.up}</span>
          </div>
          <button
            onClick={() => onTab("down")}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-all
              ${activeTab === "down" ? "bg-red-500 text-white shadow-sm" : "bg-red-50 text-red-600 hover:bg-red-100"}`}
          >
            <Dot s="down" /><span className="text-[11px] font-extrabold">Down {stat.down}</span>
          </button>
          <button
            onClick={() => onTab("latency")}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg cursor-pointer transition-all
              ${activeTab === "latency" ? "bg-amber-500 text-white shadow-sm" : "bg-amber-50 text-amber-600 hover:bg-amber-100"}`}
          >
            <Dot s="latency" /><span className="text-[11px] font-extrabold">Latency {stat.latency}</span>
          </button>
          <span className="ml-auto text-[10px] text-slate-400">{pct}%</span>
        </div>
      </div>
    </div>
  )
}