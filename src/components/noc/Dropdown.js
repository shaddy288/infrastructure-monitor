import { useState, useRef, useEffect } from "react"

export function Dropdown({ icon, options, value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer transition-all
          ${open ? "bg-blue-50 border-blue-300 text-blue-700" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"}`}
      >
        {icon}
        <span>{value}</span>
        <svg width="9" height="9" viewBox="0 0 10 10" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-9 z-40 bg-white rounded-lg border border-slate-200 shadow-xl min-w-[150px] py-1 animate-[modalIn_120ms_ease-out] overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full text-left px-3 py-1.5 text-[11px] font-medium cursor-pointer transition-colors
                ${opt === value ? "bg-blue-500 text-white font-semibold" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export function GlobeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M1.5 7h11M7 1.5c1.8 1.6 1.8 9.4 0 11M7 1.5c-1.8 1.6-1.8 9.4 0 11" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export function ActivityIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
      <path d="M1 7h2.5l1.5-4 2.5 8 1.5-4H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}