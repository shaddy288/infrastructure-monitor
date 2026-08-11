import { LINK_KEYS, LINK_META, S_COLOR, getLinkStatus } from "./data"

export function CityCard({ city, onLink }) {
  const present = LINK_KEYS.map((k) => city.links?.[k]).filter(Boolean)
  const isDown = present.some((l) => getLinkStatus(l) === "down")
  const isDegraded = !isDown && present.some((l) => getLinkStatus(l) === "degraded")
  const isLatency = !isDown && !isDegraded && present.some((l) => getLinkStatus(l) === "latency")

  return (
    <div
      className={`bg-white rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-all duration-150
      ${isDown ? "border-red-200" : isDegraded ? "border-orange-200" : isLatency ? "border-amber-200" : "border-slate-200"}`}
    >
      {/* Header */}
      <div
        className={`px-2 py-1.5 border-b flex items-center gap-1
        ${isDown ? "bg-red-50 border-red-100" : isDegraded ? "bg-orange-50 border-orange-100" : isLatency ? "bg-amber-50 border-amber-100" : "bg-slate-50 border-slate-100"}`}
      >
        {isDown && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0" />}
        {isDegraded && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />}
        {isLatency && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />}
        <span
          className={`text-[11px] font-bold truncate flex-1
          ${isDown ? "text-red-700" : isDegraded ? "text-orange-700" : isLatency ? "text-amber-700" : "text-slate-700"}`}
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
          const multi = link.providers && link.providers.length > 1
          const activeProvider = link.providers ? (link.providers.find((p) => p.status === "up") || link.providers[0]) : null
          const upCount = link.providers ? link.providers.filter((p) => p.status === "up").length : (link.status === "up" ? 1 : 0)
          const totalCount = link.providers ? link.providers.length : 1

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
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: S_COLOR[status] || "#64748B" }} />
              <span
                className={`text-[10px] flex-1 text-left truncate
                ${status === "down" ? "text-red-600 font-semibold" : status === "degraded" ? "text-orange-600 font-semibold" : status === "latency" ? "text-amber-600 font-semibold" : status === "unmonitored" ? "text-slate-400 italic font-medium" : "text-slate-500 font-semibold"}
                group-hover:text-slate-700`}
              >
                {labelText}{multi ? ` ×${link.providers.length}` : ""}
              </span>

              {status !== "up" && link.providers && link.providers.length > 1 ? (
                <div
                  className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border flex-shrink-0
                    ${status === "degraded" ? "bg-orange-50/80 border-orange-200" : status === "latency" ? "bg-amber-50/80 border-amber-200" : status === "down" ? "bg-red-50/80 border-red-200" : "bg-slate-50 border-slate-200"}`}
                  title={`${upCount}/${totalCount} Up (${link.providers.map((p) => `${p.operator || 'Provider'}: ${p.status}${p.latencyMs ? ` (${p.latencyMs}ms)` : ''}`).join(', ')})`}
                >
                  {link.providers.map((p, idx) => {
                    const dotColor =
                      p.status === "up"
                        ? "bg-emerald-500"
                        : p.status === "down"
                        ? "bg-red-500 animate-pulse"
                        : p.status === "latency"
                        ? "bg-amber-500"
                        : "bg-slate-400";
                    return (
                      <span
                        key={idx}
                        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`}
                      />
                    );
                  })}
                  {status === "latency" && activeProvider?.latencyMs > 0 && (
                    <span className="text-[8.5px] font-bold leading-none text-amber-600 ml-0.5">
                      {activeProvider.latencyMs}ms
                    </span>
                  )}
                </div>
              ) : status === "degraded" ? (
                <span className="text-[8.5px] font-bold leading-none flex-shrink-0 text-orange-600 bg-orange-50 px-1 py-0.5 rounded border border-orange-200">
                  {upCount}/{totalCount} Up
                </span>
              ) : status === "latency" ? (
                <span className="text-[9px] font-bold leading-none flex-shrink-0" style={{ color: S_COLOR[status] }}>
                  {activeProvider?.latencyMs || 0}ms
                </span>
              ) : status === "down" ? (
                <span className="text-[9px] font-bold leading-none flex-shrink-0" style={{ color: S_COLOR[status] }}>
                  ✕
                </span>
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

