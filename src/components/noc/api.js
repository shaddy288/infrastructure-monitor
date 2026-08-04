const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
const WS_BASE = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000/api/v1/alerts/stream";

export async function fetchTelemetrySummary() {
  const res = await fetch(`${API_BASE}/telemetry/summary`);
  if (!res.ok) throw new Error(`Server API error (${res.status}): Failed to fetch telemetry summary`);
  return await res.json();
}

export async function fetchCategoryMetrics() {
  const res = await fetch(`${API_BASE}/telemetry/category-metrics`);
  if (!res.ok) throw new Error(`Server API error (${res.status}): Failed to fetch category metrics`);
  const data = await res.json();
  return data.categories;
}

export async function fetchStations(region = "All Regions", status = "All Status") {
  const params = new URLSearchParams({ region, status });
  const res = await fetch(`${API_BASE}/stations?${params}`);
  if (!res.ok) throw new Error(`Server API error (${res.status}): Failed to fetch stations`);
  const data = await res.json();
  return data.stations;
}

export async function fetchLiveAlerts() {
  const res = await fetch(`${API_BASE}/alerts/live`);
  if (!res.ok) throw new Error(`Server API error (${res.status}): Failed to fetch live alerts`);
  const data = await res.json();
  return data.alerts;
}

export async function fetchStationLinkDetails(stationName, linkKey) {
  const res = await fetch(`${API_BASE}/stations/${encodeURIComponent(stationName)}/links/${linkKey}`);
  if (!res.ok) {
    if (res.status === 404) {
      return { stationName, region: "Zone", linkKey, providers: [] };
    }
    throw new Error(`Server API error (${res.status}): Failed to fetch station link details`);
  }
  return await res.json();
}


export async function fetchCategoryReport(linkKey, status) {
  const params = new URLSearchParams({ linkKey, status });
  const res = await fetch(`${API_BASE}/reports/links?${params}`);
  if (!res.ok) throw new Error(`Server API error (${res.status}): Failed to fetch category report`);
  const data = await res.json();
  return data.records;
}

export function subscribeToAlertStream(onAlertReceived, onError) {
  let ws = null;
  let reconnectTimer = null;
  let isUnmounted = false;

  function connect() {
    if (isUnmounted) return;

    try {
      ws = new WebSocket(WS_BASE);

      ws.onopen = () => {
        console.log('[WebSocket] Connected to alert stream');
      };

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

      ws.onerror = (err) => {
        if (onError) onError(err);
      };

      ws.onclose = () => {
        if (!isUnmounted) {
          reconnectTimer = setTimeout(connect, 3000);
        }
      };
    } catch (err) {
      if (!isUnmounted) {
        reconnectTimer = setTimeout(connect, 5000);
      }
    }
  }

  connect();

  return () => {
    isUnmounted = true;
    if (reconnectTimer) clearTimeout(reconnectTimer);
    if (ws) {
      ws.onclose = null;
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    }
  };
}
