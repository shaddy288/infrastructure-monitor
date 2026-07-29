import { LINK_KEYS, LINK_META, S_COLOR } from "./data"

export function CityCard({ city, onLink }) {
  const present = LINK_KEYS.map((k) => city.links[k]).filter(Boolean)
  const isDown = present.some((l) => l.status === "down")
  const isLatency = !isDown && present.some((l) => l.status === "latency")

  return (
    <div
      className={`bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-all duration-150
      ${isDown ? "border-red-200" : isLatency ? "border-amber-200" : "border-slate-200"}`}
    >
      {/* Header */}
      <div
        className={`px-2 py-1.5 border-b flex items-center gap-1
        ${isDown ? "bg-red-50 border-red-100" : isLatency ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"}`}
      >
        {isDown && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />}
        {isLatency && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />}
        <span
          className={`text-[11px] font-bold truncate flex-1
          ${isDown ? "text-red-700" : isLatency ? "text-amber-700" : "text-slate-700"}`}
          title={city.name}
        >
          {city.name}
        </span>
        <span className="text-[9px] text-slate-400 font-semibold flex-shrink-0">{city.region}</span>
      </div>

      {/* Links */}
      <div className="px-1.5 py-1.5 space-y-0.5">
        {LINK_KEYS.map((k) => {
          const link = city.links[k]

          // Link type not procured at this location
          if (!link) {
            return (
              <div key={k} className="w-full flex items-center gap-1.5 px-1 py-0.5 rounded opacity-40">
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-slate-300" />
                <span className="text-[10px] font-semibold flex-1 text-left truncate text-slate-400">
                  {LINK_META[k].short}
                </span>
                <span className="text-[9px] text-slate-300 leading-none flex-shrink-0">n/a</span>
              </div>
            )
          }

          const multi = link.providers.length > 1

          return (
            <button
              key={k}
              onClick={() => onLink(city, k)}
              className="w-full flex items-center gap-1.5 px-1 py-0.5 rounded hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: S_COLOR[link.status] }} />
              <span
                className={`text-[10px] font-semibold flex-1 text-left truncate
                ${link.status === "down" ? "text-red-600" : link.status === "latency" ? "text-amber-600" : "text-slate-500"}
                group-hover:text-slate-700`}
              >
                {LINK_META[k].short}{multi ? ` ×${link.providers.length}` : ""}
              </span>
              {link.status !== "up" && (
                <span className="text-[9px] font-bold leading-none flex-shrink-0" style={{ color: S_COLOR[link.status] }}>
                  {link.status === "latency" ? `${link.providers[0].latencyMs}ms` : "✕"}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}