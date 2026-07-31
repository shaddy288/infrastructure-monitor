import { CITIES, CARD_STATS, T_UP, T_DOWN, SEED, filterAndSortCities } from "./data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const WS_BASE = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000/api/v1/alerts/stream";

export async function fetchTelemetrySummary() {
  try {
    const res = await fetch(`${API_BASE}/telemetry/summary`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    const totalAll = T_UP + T_DOWN;
    return {
      totalStations: CITIES.length,
      totalLinks: totalAll,
      upLinks: T_UP,
      downLinks: T_DOWN,
      healthPercentage: Math.round((T_UP / totalAll) * 100),
      isFallback: true,
    };
  }
}

export async function fetchCategoryMetrics() {
  try {
    const res = await fetch(`${API_BASE}/telemetry/category-metrics`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.categories;
  } catch (err) {
    return CARD_STATS;
  }
}

export async function fetchStations(region = "All Regions", status = "All Status") {
  try {
    const params = new URLSearchParams({ region, status });
    const res = await fetch(`${API_BASE}/stations?${params}`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.stations;
  } catch (err) {
    return filterAndSortCities(CITIES, region, status);
  }
}

export async function fetchLiveAlerts() {
  try {
    const res = await fetch(`${API_BASE}/alerts/live`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.alerts;
  } catch (err) {
    return SEED;
  }
}

export async function fetchStationLinkDetails(stationName, linkKey) {
  try {
    const res = await fetch(`${API_BASE}/stations/${encodeURIComponent(stationName)}/links/${linkKey}`);
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    const city = CITIES.find((c) => c.name === stationName);
    const link = city?.links[linkKey];
    return {
      stationName,
      region: city?.region || "",
      linkKey,
      providers: link?.providers || [],
    };
  }
}

export async function fetchCategoryReport(linkKey, status) {
  try {
    const params = new URLSearchParams({ linkKey, status });
    const res = await fetch(`${API_BASE}/reports/links?${params}`);
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.records;
  } catch (err) {
    const rows = [];
    for (const city of CITIES) {
      const link = city.links[linkKey];
      if (!link) continue;
      for (const p of link.providers) {
        if (p.status === status) {
          rows.push({
            location: city.name,
            operator: p.operator,
            ip: p.ip,
            bandwidth: p.bandwidth,
            status: p.status,
            latencyMs: p.latencyMs,
            lastChecked: p.lastChecked,
          });
        }
      }
    }
    return rows;
  }
}

export function subscribeToAlertStream(onAlertReceived) {
  let ws;
  try {
    ws = new WebSocket(WS_BASE);

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.event === "alert_event" && payload.data) {
          onAlertReceived(payload.data);
        }
      } catch (e) {
        // ignore parse error
      }
    };

    ws.onerror = () => {
      ws?.close();
    };
  } catch (err) {
    // WebSocket connection failed
  }

  return () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  };
}
