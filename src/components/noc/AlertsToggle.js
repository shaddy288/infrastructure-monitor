export function AlertsToggle({ open, count, onClick }) {
  return (
    <button
      onClick={onClick}
      title={open ? "Hide alerts" : "Show live alerts"}
      className={`flex-shrink-0 flex flex-col items-center justify-center gap-2 w-9 border-r
        transition-all duration-200 cursor-pointer h-full
        ${open ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200 hover:bg-slate-50"}`}
    >
      {/* Bell icon */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={open ? "text-white" : "text-slate-500"}>
        <path d="M8 1.5A5 5 0 003 6.5v3l-1.5 2h9L9 9.5v-3A5 5 0 008 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.3" />
      </svg>

      {count > 0 && (
        <span
          className={`min-w-[16px] h-4 flex items-center justify-center text-[9px] font-bold rounded-full px-1
          ${open ? "bg-red-500 text-white" : "bg-red-100 text-red-600"}`}
        >
          {count}
        </span>
      )}

      {/* Rotated label */}
      <span
        className="text-[9px] font-bold uppercase tracking-widest leading-none"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", color: "#94A3B8" }}
      >
        Alerts
      </span>
    </button>
  )
}