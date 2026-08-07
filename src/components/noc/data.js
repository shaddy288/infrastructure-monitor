// ── Static UI Configuration & Design Tokens ─────────────────────────────────

export const LINK_META = {
  broadband: { label: "Office Broadband", short: "Office Broadband", color: "#2563EB", bg: "#EFF6FF", pill: "#BFDBFE" },
  leaseline: { label: "Lease Line", short: "Lease Line", color: "#7C3AED", bg: "#F5F3FF", pill: "#DDD6FE" },
  mpls: { label: "MPLS", short: "MPLS", color: "#D97706", bg: "#FFFBEB", pill: "#FDE68A" },
  cti: { label: "CTI Internet", short: "CTI Internet", color: "#0D9488", bg: "#F0FDFA", pill: "#99F6E4" },
};

export const LINK_KEYS = Object.keys(LINK_META);

export const S_COLOR = { up: "#10B981", down: "#EF4444", latency: "#F59E0B", degraded: "#F97316" };
export const S_BG = { up: "#ECFDF5", down: "#FEF2F2", latency: "#FFFBEB", degraded: "#FFF7ED" };
export const S_RING = { up: "#A7F3D0", down: "#FECACA", latency: "#FDE68A", degraded: "#FFEDD5" };
export const S_TEXT = { up: "Active", down: "Down", latency: "Latency", degraded: "Degraded" };

// ── Indian zone & status filter dropdown options ──────────────────────────────

export const REGIONS = ["All Regions", "North", "South", "East", "West", "Central", "Northeast"];
export const STATUS_FILTERS = ["All Status", "Up", "Down", "Degraded", "Latency"];

// ── Per-city severity helpers (null-safe) ────────────────────────────────────

export function getLinkStatus(link) {
  if (!link) return null;
  if (link.providers && link.providers.length > 0) {
    const total = link.providers.length;
    const downCount = link.providers.filter((p) => p.status === "down").length;
    const latencyCount = link.providers.filter((p) => p.status === "latency").length;
    const upCount = link.providers.filter((p) => p.status === "up").length;

    // Total outage: ALL providers are down
    if (downCount === total) return "down";

    // Fully operational: ALL providers are up
    if (upCount === total) return "up";

    // Partial failure / Degraded redundancy: At least 1 provider is down
    if (downCount > 0) return "degraded";

    // High latency: 0 down, but at least 1 provider has high latency
    if (latencyCount > 0) return "latency";

    return "up";
  }
  return link.status || "up";
}

export function cityDownCount(city) {
  return LINK_KEYS.filter((k) => city.links?.[k] && getLinkStatus(city.links[k]) === "down").length;
}

export function cityDegradedCount(city) {
  return LINK_KEYS.filter((k) => city.links?.[k] && getLinkStatus(city.links[k]) === "degraded").length;
}

export function cityLatencyCount(city) {
  return LINK_KEYS.filter((k) => city.links?.[k] && getLinkStatus(city.links[k]) === "latency").length;
}

// Sort worst-first: most "down" links at the top, then most "degraded" links, then "latency" links,
// fully healthy stations sink to the bottom.
export function sortCitiesBySeverity(cities = []) {
  return [...cities].sort((a, b) => {
    const dd = cityDownCount(b) - cityDownCount(a);
    if (dd !== 0) return dd;
    const dg = cityDegradedCount(b) - cityDegradedCount(a);
    if (dg !== 0) return dg;
    const ld = cityLatencyCount(b) - cityLatencyCount(a);
    if (ld !== 0) return ld;
    return (a.name || "").localeCompare(b.name || "");
  });
}