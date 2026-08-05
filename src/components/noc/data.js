// ── Static UI Configuration & Design Tokens ─────────────────────────────────

export const LINK_META = {
  broadband: { label: "Office Broadband", short: "Office Broadband", color: "#2563EB", bg: "#EFF6FF", pill: "#BFDBFE" },
  leaseline: { label: "Lease Line", short: "Lease Line", color: "#7C3AED", bg: "#F5F3FF", pill: "#DDD6FE" },
  mpls: { label: "MPLS", short: "MPLS", color: "#D97706", bg: "#FFFBEB", pill: "#FDE68A" },
  cti: { label: "CTI Internet", short: "CTI Internet", color: "#0D9488", bg: "#F0FDFA", pill: "#99F6E4" },
};

export const LINK_KEYS = Object.keys(LINK_META);

export const S_COLOR = { up: "#10B981", down: "#EF4444", latency: "#F59E0B" };
export const S_BG = { up: "#ECFDF5", down: "#FEF2F2", latency: "#FFFBEB" };
export const S_RING = { up: "#A7F3D0", down: "#FECACA", latency: "#FDE68A" };
export const S_TEXT = { up: "Active", down: "Down", latency: "Latency" };

// ── Indian zone & status filter dropdown options ──────────────────────────────

export const REGIONS = ["All Regions", "North", "South", "East", "West", "Central", "Northeast"];
export const STATUS_FILTERS = ["All Status", "Up", "Down", "Latency"];

// ── Per-city severity helpers (null-safe) ────────────────────────────────────

export function getLinkStatus(link) {
  if (!link) return null;
  if (link.providers && link.providers.length > 0) {
    if (link.providers.some((p) => p.status === "down")) return "down";
    if (link.providers.some((p) => p.status === "latency")) return "latency";
    return "up";
  }
  return link.status || "up";
}




export function cityDownCount(city) {
  return LINK_KEYS.filter((k) => city.links?.[k] && getLinkStatus(city.links[k]) === "down").length;
}

export function cityLatencyCount(city) {
  return LINK_KEYS.filter((k) => city.links?.[k] && getLinkStatus(city.links[k]) === "latency").length;
}

// Sort worst-first: most "down" links at the top, then most "latency" links,
// fully healthy stations sink to the bottom.
export function sortCitiesBySeverity(cities = []) {
  return [...cities].sort((a, b) => {
    const dd = cityDownCount(b) - cityDownCount(a);
    if (dd !== 0) return dd;
    const ld = cityLatencyCount(b) - cityLatencyCount(a);
    if (ld !== 0) return ld;
    return (a.name || "").localeCompare(b.name || "");
  });
}