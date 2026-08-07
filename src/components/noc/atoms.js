import { S_COLOR, S_BG, S_TEXT } from "./data"

export function Dot({ s, pulse }) {
  return (
    <span className="relative inline-flex items-center justify-center flex-shrink-0 w-2 h-2">
      {pulse && (
        <span
          className="absolute inline-flex w-full h-full rounded-full opacity-60 animate-ping"
          style={{ backgroundColor: S_COLOR[s] }}
        />
      )}
      <span className="relative w-1.5 h-1.5 rounded-full" style={{ backgroundColor: S_COLOR[s] }} />
    </span>
  )
}

export function Chip({ s }) {
  return (
    <span
      className="inline-flex items-center gap-1 px-1.5 py-px rounded text-[10px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: S_BG[s], color: S_COLOR[s] }}
    >
      <Dot s={s} />
      {S_TEXT[s]}
    </span>
  )
}