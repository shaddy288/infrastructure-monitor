import { LINK_KEYS, LINK_META, S_COLOR, getLinkStatus } from "./data"

export function CityCard({ city, onLink }) {
  const present = LINK_KEYS.map((k) => city.links[k]).filter(Boolean)
  const isDown = present.some((l) => getLinkStatus(l) === "down")
  const isLatency = !isDown && present.some((l) => getLinkStatus(l) === "latency")

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
          const link = city.links?.[k]

          // Link type not procured at this location - do not render
          if (!link) {
            return null
          }

          const status = getLinkStatus(link)
          const multi = link.providers.length > 1
          const activeProvider = link.providers.find((p) => p.status === status) || link.providers[0]

          const labelText = link.subType
            ? `${LINK_META[k].short} - ${link.subType}`
            : k === "leaseline"
            ? LINK_META[k].label
            : LINK_META[k].short

          return (
            <button
              key={k}
              onClick={() => onLink(city, k)}
              className="w-full flex items-center gap-1.5 px-1 py-0.5 rounded hover:bg-slate-50 cursor-pointer transition-colors group"
            >
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: S_COLOR[status] }} />
              <span
                className={`text-[10px] font-semibold flex-1 text-left truncate
                ${status === "down" ? "text-red-600" : status === "latency" ? "text-amber-600" : "text-slate-500"}
                group-hover:text-slate-700`}
              >
                {labelText}{multi ? ` ×${link.providers.length}` : ""}
              </span>

              {status !== "up" && (
                <span className="text-[9px] font-bold leading-none flex-shrink-0" style={{ color: S_COLOR[status] }}>
                  {status === "latency" ? `${activeProvider?.latencyMs || 0}ms` : "✕"}
                </span>
              )}
            </button>
          )
        })}


      </div>
    </div>
  )
}