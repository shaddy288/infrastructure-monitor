// ── Static UI Configuration & Design Tokens ─────────────────────────────────

export const LINK_META = {
  broadband: { label: "Office Broadband", short: "Office Broadband", color: "#2563EB", bg: "#EFF6FF", pill: "#BFDBFE" },
  leaseline: { label: "Lease Line", short: "Lease Line", color: "#7C3AED", bg: "#F5F3FF", pill: "#DDD6FE" },
  mpls: { label: "MPLS", short: "MPLS", color: "#D97706", bg: "#FFFBEB", pill: "#FDE68A" },
  cti: { label: "CTI Internet", short: "CTI Internet", color: "#0D9488", bg: "#F0FDFA", pill: "#99F6E4" },
};

export const LINK_KEYS = Object.keys(LINK_META);

export const S_COLOR = { up: "#10B981", down: "#EF4444", latency: "#F59E0B", degraded: "#F97316", unmonitored: "#64748B" };
export const S_BG = { up: "#ECFDF5", down: "#FEF2F2", latency: "#FFFBEB", degraded: "#FFF7ED", unmonitored: "#F1F5F9" };
export const S_RING = { up: "#A7F3D0", down: "#FECACA", latency: "#FDE68A", degraded: "#FFEDD5", unmonitored: "#E2E8F0" };
export const S_TEXT = { up: "Active", down: "Down", latency: "Latency", degraded: "Degraded", unmonitored: "Unmonitored" };

// ── Indian zone & status filter dropdown options ──────────────────────────────

export const REGIONS = ["All Regions", "North", "South", "East", "West", "Central", "Northeast"];
export const STATUS_FILTERS = ["All Status", "Up", "Down", "Degraded", "Latency", "Unmonitored"];

// ── Per-city severity helpers (null-safe) ────────────────────────────────────

export function getLinkStatus(link) {
  if (!link) return null;
  if (link.status === "unmonitored") return "unmonitored";

  if (link.providers && link.providers.length > 0) {
    const total = link.providers.length;
    const unmonitoredCount = link.providers.filter((p) => p.status === "unmonitored").length;
    const downCount = link.providers.filter((p) => p.status === "down").length;
    const latencyCount = link.providers.filter((p) => p.status === "latency").length;
    const upCount = link.providers.filter((p) => p.status === "up").length;

    // All unmonitored
    if (unmonitoredCount === total) return "unmonitored";

    // Total outage: ALL providers are down
    if (downCount === total) return "down";

    // Fully operational: ALL providers are up
    if (upCount === total) return "up";

    // Partial failure / Degraded redundancy: At least 1 provider is down
    if (downCount > 0) return "degraded";

    // High latency: 0 down, but at least 1 provider has high latency
    if (latencyCount > 0) return "latency";

    if (unmonitoredCount > 0 && upCount === 0) return "unmonitored";

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

export function cityUnmonitoredCount(city) {
  return LINK_KEYS.filter((k) => city.links?.[k] && getLinkStatus(city.links[k]) === "unmonitored").length;
}

export function isCityUnmonitored(city) {
  const present = LINK_KEYS.map((k) => city.links?.[k]).filter(Boolean);
  return present.length > 0 && present.every((l) => getLinkStatus(l) === "unmonitored");
}

// Sort worst-first: most "down" links at the top, then most "degraded" links, then "latency" links,
// healthy active stations next, fully unmonitored stations sink to the bottom.
export function sortCitiesBySeverity(cities = []) {
  return [...cities].sort((a, b) => {
    const dd = cityDownCount(b) - cityDownCount(a);
    if (dd !== 0) return dd;
    const dg = cityDegradedCount(b) - cityDegradedCount(a);
    if (dg !== 0) return dg;
    const ld = cityLatencyCount(b) - cityLatencyCount(a);
    if (ld !== 0) return ld;

    const umA = isCityUnmonitored(a) ? 1 : 0;
    const umB = isCityUnmonitored(b) ? 1 : 0;
    if (umA !== umB) return umA - umB;

    return (a.name || "").localeCompare(b.name || "");
  });
}