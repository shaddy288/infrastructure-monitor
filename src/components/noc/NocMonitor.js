import { useState, useEffect, useMemo, useCallback } from "react"
import { LINK_META, REGIONS, STATUS_FILTERS, getLinkStatus } from "./data"
import { fetchTelemetrySummary, fetchCategoryMetrics, fetchStations, fetchLiveAlerts, fetchAvailableDates, subscribeToAlertStream } from "./api"
import { AlertsPanel } from "./AlertsPanel"
import { AlertsToggle } from "./AlertsToggle"
import { MetricCard } from "./MetricCard"
import { CityCard } from "./CityCard"
import { Modal } from "./Modal"
import { CalendarBtn } from "./CalendarBtn"
import { Dropdown, GlobeIcon, ActivityIcon } from "./Dropdown"

export default function NocMonitor() {
  const [alertsOpen, setAlertsOpen] = useState(false)
  const [alerts, setAlerts] = useState([])
  const [summary, setSummary] = useState({ totalStations: 0, upLinks: 0, downLinks: 0, healthPercentage: 100 })
  const [metrics, setMetrics] = useState([])
  const [allStations, setAllStations] = useState([])
  const [availableDateInfo, setAvailableDateInfo] = useState(null)
  const [modal, setModal] = useState(null)
  const [activeCard, setActiveCard] = useState(null)
  const [regionFilter, setRegionFilter] = useState("All Regions")
  const [statusFilter, setStatusFilter] = useState("All Status")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load initial data once from server
  const loadInitialData = useCallback(async () => {
    setError(null)
    setLoading(true)
    try {
      const [sumData, metData, altData, stnData, datesData] = await Promise.all([
        fetchTelemetrySummary(),
        fetchCategoryMetrics(),
        fetchLiveAlerts(),
        fetchStations("All Regions", "All Status"),
        fetchAvailableDates(),
      ])
      setSummary(sumData)
      setMetrics(metData)
      setAlerts(altData)
      setAllStations(stnData)
      setAvailableDateInfo(datesData)
    } catch (err) {
      console.error("NOC Server Connection Error:", err)
      setError("Unable to connect to NOC Backend Server (http://localhost:5000). Please check if the server is running.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  // Instant in-memory filtering without API calls
  const filteredStations = useMemo(() => {
    return allStations.filter((s) => {
      // 1. Region filter
      if (regionFilter !== "All Regions" && s.region !== regionFilter) return false;

      // 2. Status filter
      if (statusFilter === "Down") {
        return Object.values(s.links || {}).some((l) => l && getLinkStatus(l) === "down");
      }
      if (statusFilter === "Degraded") {
        return Object.values(s.links || {}).some((l) => l && getLinkStatus(l) === "degraded");
      }
      if (statusFilter === "Latency") {
        return Object.values(s.links || {}).some((l) => l && getLinkStatus(l) === "latency");
      }
      if (statusFilter === "Unmonitored") {
        return Object.values(s.links || {}).some((l) => l && getLinkStatus(l) === "unmonitored");
      }
      if (statusFilter === "Up") {
        // Station is UP if NO links are down, degraded, or latency
        return !Object.values(s.links || {}).some((l) => {
          const st = getLinkStatus(l);
          return st === "down" || st === "degraded" || st === "latency";
        });
      }
      return true;
    });
  }, [allStations, regionFilter, statusFilter]);

  // Subscribe to live WebSocket alerts & telemetry stream
  useEffect(() => {
    const unsubscribe = subscribeToAlertStream({
      onAlert: (newAlert) => {
        setAlerts((prev) => [newAlert, ...prev.slice(0, 49)])
      },
      onSnapshot: (data) => {
        if (data.summary) setSummary(data.summary)
        if (data.categories) setMetrics(data.categories)
        if (data.stations) setAllStations(data.stations)
      },
      onTelemetryUpdate: (data) => {
        if (data.summary) setSummary(data.summary)
        if (data.categories) setMetrics(data.categories)
      },
      onStationsUpdate: (newStations) => {
        if (newStations) setAllStations(newStations)
      },
    })
    return () => unsubscribe()
  }, [])



  function onCardTab(key, tab) {
    if (activeCard?.key === key && activeCard?.tab === tab) {
      setActiveCard(null); setModal(null)
    } else {
      setActiveCard({ key, tab })
      setModal({ kind: "card", linkKey: key, tab })
    }
  }

  function onCityLink(city, key) {
    setModal({ kind: "cityLink", city: city.name, linkKey: key, cityData: city })
    setActiveCard(null)
  }


  const downCount = summary.downLinks > 0
    ? summary.downLinks
    : (alerts.unreadDownCount || alerts.filter((a) => a.status === "down").length)

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FA] font-sans">

      {/* ── Main content ── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm flex-shrink-0">
          <div className="px-5 py-2.5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.radiocity.in/rc-new/images/RC-logonew.png"
                alt="Radio City"
                className="h-7 w-auto object-contain"
                onError={(e) => { e.currentTarget.style.display = "none" }}
              />
              <span className="w-px h-5 bg-slate-200" />
              <div>
                <p className="text-sm font-bold text-[#0F172A] leading-tight">Infrastructure Monitor</p>
                <p className="text-[10px] text-slate-400">NOC Wallboard · PAN-India · {summary.totalStations} Stations</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-bold text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{summary.upLinks} Up
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 border border-red-100 text-[11px] font-bold text-red-600">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />{summary.downLinks} Down
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold bg-emerald-50 border-emerald-100 text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{summary.healthPercentage}% Healthy
              </span>
              <CalendarBtn stations={filteredStations} alerts={alerts} availableDateInfo={availableDateInfo} />

            </div>
          </div>
        </header>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

          {/* Server Error Alert Banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-4 shadow-sm animate-[fadeDown_150ms_ease-out]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 font-bold">⚠️</span>
                <div>
                  <p className="text-xs font-bold text-red-800">Backend Server Error</p>
                  <p className="text-xs text-red-600">{error}</p>
                </div>
              </div>
              <button
                onClick={loadInitialData}
                className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Retry Connection
              </button>
            </div>
          )}

          {/* Metric cards row */}
          <div className="flex gap-3">
            {metrics.map((stat) => (
              <MetricCard
                key={stat.key}
                stat={stat}
                activeTab={activeCard?.key === stat.key ? activeCard.tab : null}
                onTab={(t) => onCardTab(stat.key, t)}
              />
            ))}
          </div>

          {/* Section divider */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
              Global City Status — {filteredStations.length} Stations
            </span>
            <span className="flex-1 h-px bg-slate-200" />

            {/* Region + Status filters, worst-first sorted results */}
            <div className="flex items-center gap-2">
              <Dropdown icon={<GlobeIcon />} options={REGIONS} value={regionFilter} onChange={setRegionFilter} />
              <Dropdown icon={<ActivityIcon />} options={STATUS_FILTERS} value={statusFilter} onChange={setStatusFilter} />
            </div>
          </div>

          {/* 8-per-row city grid — worst stations (most Down, then Latency) show first */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-8 gap-2 lg:gap-3">
            {filteredStations.length > 0 ? (
              filteredStations.map((city) => (
                <CityCard key={city.name} city={city} onLink={onCityLink} />
              ))
            ) : (
              <div className="col-span-8 py-10 text-center text-sm text-slate-400">
                {loading ? "Loading data from backend server..." : "No stations match this filter."}
              </div>
            )}
          </div>
        </div>
      </div>


      {/* ── Collapsible alerts panel (right side) ── */}
      <AlertsPanel alerts={alerts} open={alertsOpen} downCount={downCount} />

      {/* ── Right alerts toggle tab ── */}
      <AlertsToggle open={alertsOpen} count={downCount} onClick={() => setAlertsOpen((o) => !o)} />

      {/* Modal */}
      {modal && <Modal target={modal} onClose={() => { setModal(null); setActiveCard(null) }} />}

      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </div>
  )
}