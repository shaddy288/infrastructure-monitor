// ── Static config ─────────────────────────────────────────────────────────────

export const LINK_META = {
  broadband: { label: "Office Broadband", short: "BB",  color: "#2563EB", bg: "#EFF6FF", pill: "#BFDBFE" },
  leaseline: { label: "Lease Line",       short: "LL",  color: "#7C3AED", bg: "#F5F3FF", pill: "#DDD6FE" },
  mpls:      { label: "MPLS",             short: "MP",  color: "#D97706", bg: "#FFFBEB", pill: "#FDE68A" },
  cti:       { label: "CTI Internet",     short: "CTI", color: "#0D9488", bg: "#F0FDFA", pill: "#99F6E4" },
}

export const LINK_KEYS = Object.keys(LINK_META)

export const S_COLOR = { up: "#10B981", down: "#EF4444", latency: "#F59E0B" }
export const S_BG    = { up: "#ECFDF5", down: "#FEF2F2", latency: "#FFFBEB" }
export const S_RING  = { up: "#A7F3D0", down: "#FECACA", latency: "#FDE68A" }
export const S_TEXT  = { up: "Active",  down: "Down",   latency: "Latency" }

// ── Real PAN-India station dataset ──────────────────────────────────────────
// Sourced from PAN_India_IP_Details_for_Vikram.xlsx — Location / Operator / IP /
// Bandwidth are the real values from that file. Status, latency (ms), and
// "last checked" are SIMULATED placeholders (the sheet has no live monitoring
// column) — swap in a real health-check feed before using this in production.

export const CITIES = [
  {
    "name": "Agra",
    "region": "Central",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "Airtel",
            "ip": "122.176.113.185",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 13,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "Jupiter",
            "ip": "165.99.23.146",
            "bandwidth": "50 MBPS",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "4 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Ahmedabad",
    "region": "West",
    "links": {
      "broadband": {
        "status": "latency",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "61.2.103.67",
            "bandwidth": "300 MBPS",
            "status": "latency",
            "latencyMs": 212,
            "lastChecked": "3 min ago"
          },
          {
            "operator": "GTPL",
            "ip": "103.241.45.168",
            "bandwidth": "N/A",
            "status": "up",
            "latencyMs": 7,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.110",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 2,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.6",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 9,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Ahmednagar",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "Airtel",
            "ip": "122.179.136.6",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 13,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "BSNL",
            "ip": "117.247.51.13",
            "bandwidth": "300 MBPS",
            "status": "up",
            "latencyMs": 5,
            "lastChecked": "2 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Ahmednagar - HUB",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "N/A",
            "bandwidth": "N/A",
            "status": "up",
            "latencyMs": 13,
            "lastChecked": "3 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.10",
            "bandwidth": "6 MBPS",
            "status": "up",
            "latencyMs": 2,
            "lastChecked": "2 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Ajmer",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "latency",
        "providers": [
          {
            "operator": "Ncore",
            "ip": "103.159.183.35",
            "bandwidth": "100 MBPS",
            "status": "latency",
            "latencyMs": 195,
            "lastChecked": "6 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Ajmer - STL",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "N/A",
            "bandwidth": "N/A",
            "status": "up",
            "latencyMs": 10,
            "lastChecked": "6 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Akola",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.217.124.176",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 7,
            "lastChecked": "2 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Akola - STL",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "latency",
        "providers": [
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "172.20.20.217",
            "bandwidth": "2 MBPS",
            "status": "latency",
            "latencyMs": 240,
            "lastChecked": "6 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Bangalore",
    "region": "South",
    "links": {
      "broadband": {
        "status": "latency",
        "providers": [
          {
            "operator": "ACT",
            "ip": "106.51.64.169",
            "bandwidth": "500 Mbps",
            "status": "down",
            "latencyMs": 999,
            "lastChecked": "6 min ago"
          },
          {
            "operator": "ACT",
            "ip": "106.51.37.32",
            "bandwidth": "500 Mbps",
            "status": "up",
            "latencyMs": 3,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "leaseline": {
        "status": "down",
        "providers": [
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "49.249.54.254",
            "bandwidth": "200 Mbps",
            "status": "down",
            "latencyMs": 999,
            "lastChecked": "2 min ago"
          }
        ]
      },
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.86",
            "bandwidth": "6 Mbps",
            "status": "up",
            "latencyMs": 10,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.13",
            "bandwidth": "6 Mbps",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "1 min ago"
          }
        ]
      },
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "59.92.230.60",
            "bandwidth": "200 Mbps",
            "status": "up",
            "latencyMs": 8,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "ACT",
            "ip": "106.51.243.203",
            "bandwidth": "400 Mbps",
            "status": "up",
            "latencyMs": 9,
            "lastChecked": "2 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Bareilly",
    "region": "Central",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.241.149.106",
            "bandwidth": "100 MBPS",
            "status": "up",
            "latencyMs": 12,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "Kataria",
            "ip": "103.145.54.231",
            "bandwidth": "100 MBPS",
            "status": "up",
            "latencyMs": 2,
            "lastChecked": "6 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Baroda",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "GTPL",
            "ip": "182.237.12.118",
            "bandwidth": "300 MBPS",
            "status": "up",
            "latencyMs": 12,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "BSNL",
            "ip": "117.248.251.125",
            "bandwidth": "300 MBPS",
            "status": "up",
            "latencyMs": 12,
            "lastChecked": "6 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Bikaner",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "59.90.68.59",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 2,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "RADINET",
            "ip": "103.176.137.14",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 10,
            "lastChecked": "1 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Chennai",
    "region": "South",
    "links": {
      "broadband": {
        "status": "up",
        "providers": [
          {
            "operator": "ACT",
            "ip": "183.82.35.63",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 7,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "JIO",
            "ip": "115.245.219.234",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 9,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "leaseline": null,
      "mpls": {
        "status": "latency",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.82",
            "bandwidth": "2 MBPS",
            "status": "latency",
            "latencyMs": 188,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.26",
            "bandwidth": "2 MBPS",
            "status": "latency",
            "latencyMs": 189,
            "lastChecked": "2 min ago"
          }
        ]
      },
      "cti": {
        "status": "latency",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.202.8.239",
            "bandwidth": "200 MBPS",
            "status": "down",
            "latencyMs": 999,
            "lastChecked": "6 min ago"
          },
          {
            "operator": "Railtel",
            "ip": "112.133.196.167",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 5,
            "lastChecked": "2 min ago"
          },
          {
            "operator": "ACT -ILL",
            "ip": "106.51.233.78",
            "bandwidth": "10 MBPS",
            "status": "up",
            "latencyMs": 9,
            "lastChecked": "6 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Coimbatore",
    "region": "South",
    "links": {
      "broadband": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.218.245.107",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "2 min ago"
          },
          {
            "operator": "ACT",
            "ip": "106.51.152.249",
            "bandwidth": "300 MBPS",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "1 min ago"
          }
        ]
      },
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.93",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 9,
            "lastChecked": "2 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.30",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "59.90.30.206",
            "bandwidth": "200 Mbps",
            "status": "up",
            "latencyMs": 5,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "Railtel",
            "ip": "112.133.219.208",
            "bandwidth": "200 Mbps",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "6 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Delhi",
    "region": "North",
    "links": {
      "broadband": {
        "status": "up",
        "providers": [
          {
            "operator": "Spectra",
            "ip": "203.122.34.182",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 8,
            "lastChecked": "6 min ago"
          },
          {
            "operator": "Airtel",
            "ip": "122.180.251.107",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 4,
            "lastChecked": "6 min ago"
          }
        ]
      },
      "leaseline": {
        "status": "latency",
        "providers": [
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "14.195.111.19",
            "bandwidth": "200 MBPS",
            "status": "latency",
            "latencyMs": 235,
            "lastChecked": "2 min ago"
          }
        ]
      },
      "mpls": {
        "status": "latency",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.114",
            "bandwidth": "10 MBPS",
            "status": "up",
            "latencyMs": 5,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.33",
            "bandwidth": "10 MBPS",
            "status": "latency",
            "latencyMs": 225,
            "lastChecked": "4 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Gorakhpur",
    "region": "Central",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.220.12.183",
            "bandwidth": "60 MBPS",
            "status": "up",
            "latencyMs": 8,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "RAILWIRE",
            "ip": "103.95.166.215",
            "bandwidth": "300 MBPS",
            "status": "up",
            "latencyMs": 6,
            "lastChecked": "5 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Hisar",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.242.47.95",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 12,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "AIRTEL",
            "ip": "27.56.144.108",
            "bandwidth": "300 MBPS",
            "status": "up",
            "latencyMs": 13,
            "lastChecked": "6 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Hissar - STL",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "down",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "N/A",
            "bandwidth": "N/A",
            "status": "down",
            "latencyMs": 999,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Hyderabad",
    "region": "South",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "latency",
        "providers": [
          {
            "operator": "Airtel -ILL",
            "ip": "182.73.85.218",
            "bandwidth": "10 Mbps",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "ACT - ILL",
            "ip": "124.123.102.2",
            "bandwidth": "10 Mbps",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "ACT",
            "ip": "49.207.8.37",
            "bandwidth": "300 MBPS",
            "status": "down",
            "latencyMs": 999,
            "lastChecked": "1 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Jaipur",
    "region": "North",
    "links": {
      "broadband": {
        "status": "latency",
        "providers": [
          {
            "operator": "ACT",
            "ip": "183.83.176.251",
            "bandwidth": "1 GBPs",
            "status": "down",
            "latencyMs": 999,
            "lastChecked": "3 min ago"
          },
          {
            "operator": "Airtel",
            "ip": "122.176.218.58",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "2 min ago"
          }
        ]
      },
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.21",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 10,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.45",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 12,
            "lastChecked": "3 min ago"
          }
        ]
      },
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.242.40.41",
            "bandwidth": "200 Mbps",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "5 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Jalandhar",
    "region": "North",
    "links": {
      "broadband": {
        "status": "up",
        "providers": [
          {
            "operator": "Airtel",
            "ip": "122.180.31.239",
            "bandwidth": "300 MBPS",
            "status": "up",
            "latencyMs": 13,
            "lastChecked": "6 min ago"
          },
          {
            "operator": "Quardent connect",
            "ip": "192.168.31.174",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "3 min ago"
          }
        ]
      },
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.45",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 9,
            "lastChecked": "2 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.49",
            "bandwidth": "2MBPS",
            "status": "up",
            "latencyMs": 3,
            "lastChecked": "3 min ago"
          }
        ]
      },
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "192.168.1.1",
            "bandwidth": "150 MBPS",
            "status": "up",
            "latencyMs": 4,
            "lastChecked": "1 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Jalgaon",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "59.94.39.156",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 13,
            "lastChecked": "3 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Jalgaon - STL",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "N/A",
            "bandwidth": "N/A",
            "status": "up",
            "latencyMs": 10,
            "lastChecked": "6 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "172.20.20.213",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Jamshedpur",
    "region": "East",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "latency",
        "providers": [
          {
            "operator": "GTPL",
            "ip": "43.251.74.36",
            "bandwidth": "100 Mbps",
            "status": "up",
            "latencyMs": 2,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "RAILWIRE",
            "ip": "N/A",
            "bandwidth": "100 Mbps",
            "status": "latency",
            "latencyMs": 190,
            "lastChecked": "6 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Kanpur",
    "region": "Central",
    "links": {
      "broadband": {
        "status": "latency",
        "providers": [
          {
            "operator": "Airtel",
            "ip": "182.69.119.125",
            "bandwidth": "200Mbps",
            "status": "up",
            "latencyMs": 3,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "Renu",
            "ip": "103.210.30.109",
            "bandwidth": "200Mbps",
            "status": "down",
            "latencyMs": 999,
            "lastChecked": "4 min ago"
          }
        ]
      },
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.13",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 12,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.53",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 12,
            "lastChecked": "1 min ago"
          }
        ]
      },
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "Exitel",
            "ip": "103.108.7.36",
            "bandwidth": "200 Mbps",
            "status": "up",
            "latencyMs": 4,
            "lastChecked": "1 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Karnal",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.220.14.88",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 12,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "AIRTEL",
            "ip": "27.56.144.142",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "2 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Karnal - STL",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "N/A",
            "bandwidth": "N/A",
            "status": "up",
            "latencyMs": 10,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Kolhapur",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "latency",
        "providers": [
          {
            "operator": "Riddhi Infotech",
            "ip": "203.194.100.254",
            "bandwidth": "200 Mbps",
            "status": "latency",
            "latencyMs": 236,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "BSNL",
            "ip": "59.97.238.110",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 15,
            "lastChecked": "3 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Kota",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "latency",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "59.89.150.142",
            "bandwidth": "200 MBPS",
            "status": "latency",
            "latencyMs": 181,
            "lastChecked": "5 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Lucknow",
    "region": "Central",
    "links": {
      "broadband": {
        "status": "up",
        "providers": [
          {
            "operator": "Jolly",
            "ip": "103.80.63.26",
            "bandwidth": "250 MBPS",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "Airtel",
            "ip": "122.173.133.195",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 7,
            "lastChecked": "2 min ago"
          }
        ]
      },
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.6",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "Jio",
            "ip": "N/A",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 7,
            "lastChecked": "3 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Madurai",
    "region": "South",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "ACT",
            "ip": "106.51.22.222",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 15,
            "lastChecked": "3 min ago"
          },
          {
            "operator": "Airtel",
            "ip": "122.165.184.33",
            "bandwidth": "100 MBPS",
            "status": "up",
            "latencyMs": 3,
            "lastChecked": "2 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Mumbai",
    "region": "West",
    "links": {
      "broadband": {
        "status": "up",
        "providers": [
          {
            "operator": "Jio",
            "ip": "192.168.13.1",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 7,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "Jeebr",
            "ip": "192.168.12.103",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 5,
            "lastChecked": "4 min ago"
          }
        ]
      },
      "leaseline": {
        "status": "up",
        "providers": [
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "27.107.167.42",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "Tata Communications Ltd",
            "ip": "219.65.90.122",
            "bandwidth": "15 MBPS",
            "status": "up",
            "latencyMs": 2,
            "lastChecked": "3 min ago"
          },
          {
            "operator": "Blazenet limited",
            "ip": "45.64.193.26",
            "bandwidth": "45 MBPS",
            "status": "up",
            "latencyMs": 3,
            "lastChecked": "2 min ago"
          }
        ]
      },
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.190",
            "bandwidth": "15 MBPS",
            "status": "up",
            "latencyMs": 5,
            "lastChecked": "6 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.73",
            "bandwidth": "16 MBPS",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "3 min ago"
          }
        ]
      },
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "N/A",
            "bandwidth": "100MBPS",
            "status": "up",
            "latencyMs": 5,
            "lastChecked": "5 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Nagpur",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "Airtel",
            "ip": "122.169.100.112",
            "bandwidth": "300 MBPS",
            "status": "up",
            "latencyMs": 9,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "BSNL",
            "ip": "59.95.101.78",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 9,
            "lastChecked": "4 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Nanded",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "Airtel",
            "ip": "223.185.143.109",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "2 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Nanded - STL",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "N/A",
            "bandwidth": "N/A",
            "status": "up",
            "latencyMs": 15,
            "lastChecked": "4 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "172.20.20.221",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 8,
            "lastChecked": "3 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Nashik",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "latency",
        "providers": [
          {
            "operator": "Trunet",
            "ip": "103.170.214.178",
            "bandwidth": "100 Mbps",
            "status": "up",
            "latencyMs": 14,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "Airtel",
            "ip": "122.169.41.166",
            "bandwidth": "200 Mbps",
            "status": "latency",
            "latencyMs": 148,
            "lastChecked": "5 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Patiala",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "192.168.1.2",
            "bandwidth": "N/A",
            "status": "up",
            "latencyMs": 4,
            "lastChecked": "5 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Patna",
    "region": "East",
    "links": {
      "broadband": {
        "status": "up",
        "providers": [
          {
            "operator": "Airtel",
            "ip": "223.235.71.101",
            "bandwidth": "300 MBPS",
            "status": "up",
            "latencyMs": 6,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "Shikhar",
            "ip": "103.97.213.200",
            "bandwidth": "120 MBPS",
            "status": "up",
            "latencyMs": 4,
            "lastChecked": "1 min ago"
          }
        ]
      },
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "10.10.10.74",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 4,
            "lastChecked": "3 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.43.66.85",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 7,
            "lastChecked": "6 min ago"
          }
        ]
      },
      "cti": {
        "status": "down",
        "providers": [
          {
            "operator": "Hostaxis",
            "ip": "N/A",
            "bandwidth": "50mbps",
            "status": "down",
            "latencyMs": 999,
            "lastChecked": "5 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Pune",
    "region": "West",
    "links": {
      "broadband": {
        "status": "latency",
        "providers": [
          {
            "operator": "Airtel",
            "ip": "106.201.224.165",
            "bandwidth": "1024 Mbps",
            "status": "latency",
            "latencyMs": 175,
            "lastChecked": "3 min ago"
          }
        ]
      },
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "Limerick - IIL",
            "ip": "103.160.175.22",
            "bandwidth": "10 Mbps",
            "status": "up",
            "latencyMs": 10,
            "lastChecked": "2 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Pune - STL",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "172.52.85.102",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 12,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "10.98.88.149",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "6 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Ranchi",
    "region": "East",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "latency",
        "providers": [
          {
            "operator": "Reliance JIO",
            "ip": "115.246.184.82",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 15,
            "lastChecked": "2 min ago"
          },
          {
            "operator": "Protoact",
            "ip": "103.117.203.135",
            "bandwidth": "200 MBPS",
            "status": "latency",
            "latencyMs": 131,
            "lastChecked": "3 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Sangli",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "61.0.40.117",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 15,
            "lastChecked": "4 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Sangli - STL",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "172.20.20.205",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 9,
            "lastChecked": "5 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Solapur",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "59.94.35.75",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 13,
            "lastChecked": "4 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Solapur - STL",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "up",
        "providers": [
          {
            "operator": "Tata Teleservices Ltd",
            "ip": "172.20.20.209",
            "bandwidth": "2 MBPS",
            "status": "up",
            "latencyMs": 11,
            "lastChecked": "6 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Surat",
    "region": "West",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "HATHWAY",
            "ip": "116.72.2.70",
            "bandwidth": "100 MBPS",
            "status": "up",
            "latencyMs": 2,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "BSNL",
            "ip": "117.247.53.7",
            "bandwidth": "100 MBPS",
            "status": "up",
            "latencyMs": 7,
            "lastChecked": "6 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Udaipur",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.218.46.33",
            "bandwidth": "200 MBPS",
            "status": "up",
            "latencyMs": 15,
            "lastChecked": "3 min ago"
          },
          {
            "operator": "Weeboo",
            "ip": "103.3.205.92",
            "bandwidth": "400 MBPS",
            "status": "up",
            "latencyMs": 4,
            "lastChecked": "5 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Udaipur - HUB",
    "region": "North",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": {
        "status": "down",
        "providers": [
          {
            "operator": "Bharti Airtel Ltd",
            "ip": "N/A",
            "bandwidth": "N/A",
            "status": "down",
            "latencyMs": 999,
            "lastChecked": "2 min ago"
          }
        ]
      },
      "cti": null
    }
  },
  {
    "name": "Varanasi",
    "region": "Central",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "BSNL",
            "ip": "117.241.151.69",
            "bandwidth": "200 Mbps",
            "status": "up",
            "latencyMs": 6,
            "lastChecked": "1 min ago"
          },
          {
            "operator": "JIO",
            "ip": "115.246.102.186",
            "bandwidth": "1 GBPS",
            "status": "up",
            "latencyMs": 5,
            "lastChecked": "6 min ago"
          }
        ]
      }
    }
  },
  {
    "name": "Vizag",
    "region": "South",
    "links": {
      "broadband": null,
      "leaseline": null,
      "mpls": null,
      "cti": {
        "status": "up",
        "providers": [
          {
            "operator": "You BrodBand",
            "ip": "219.91.253.214",
            "bandwidth": "200 Mbps",
            "status": "up",
            "latencyMs": 13,
            "lastChecked": "5 min ago"
          },
          {
            "operator": "ACT",
            "ip": "49.205.93.54",
            "bandwidth": "100 Mbps",
            "status": "up",
            "latencyMs": 5,
            "lastChecked": "4 min ago"
          }
        ]
      }
    }
  }
]

// ── Derived totals (only counts link types that are actually provisioned) ────

export function cardStats(key) {
  const rows = CITIES.map((c) => c.links[key]).filter(Boolean)
  return {
    key,
    total:   rows.length,
    up:      rows.filter((r) => r.status === "up").length,
    down:    rows.filter((r) => r.status === "down").length,
    latency: rows.filter((r) => r.status === "latency").length,
  }
}

export const CARD_STATS = LINK_KEYS.map(cardStats)

const ALL_LINK_ENTRIES = CITIES.flatMap((c) => LINK_KEYS.map((k) => c.links[k]).filter(Boolean))
export const T_ALL  = ALL_LINK_ENTRIES.length
export const T_UP   = ALL_LINK_ENTRIES.filter((l) => l.status === "up").length
export const T_DOWN = ALL_LINK_ENTRIES.filter((l) => l.status === "down").length

// ── Alert seed (built from real down/latency stations found in the sheet) ────

let _aid = 11
export function nextAlertId() { return _aid++ }

export function mkAlert(city, link, status, ago) {
  const d = new Date(); d.setMinutes(d.getMinutes() - ago)
  const ts = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`
  return {
    id: nextAlertId(), city, link, status, ts,
    detail: status === "down" ? `${LINK_META[link].label} lost`
          : status === "latency" ? `${LINK_META[link].label} high latency`
          : `${LINK_META[link].label} recovered`,
  }
}

export const SEED = [
  { id: 1, city: "Bangalore", link: "leaseline", status: "down", ts: "14:29", detail: "Lease Line lost" },
  { id: 2, city: "Hissar - STL", link: "mpls", status: "down", ts: "14:27", detail: "MPLS lost" },
  { id: 3, city: "Patna", link: "cti", status: "down", ts: "14:25", detail: "CTI Internet lost" },
  { id: 4, city: "Udaipur - HUB", link: "mpls", status: "down", ts: "14:23", detail: "MPLS lost" },
  { id: 5, city: "Ahmedabad", link: "broadband", status: "latency", ts: "14:21", detail: "Office Broadband high latency" },
  { id: 6, city: "Ajmer", link: "cti", status: "latency", ts: "14:19", detail: "CTI Internet high latency" },
  { id: 7, city: "Akola - STL", link: "mpls", status: "latency", ts: "14:17", detail: "MPLS high latency" },
  { id: 8, city: "Bangalore", link: "broadband", status: "latency", ts: "14:15", detail: "Office Broadband high latency" },
  { id: 9, city: "Chennai", link: "mpls", status: "latency", ts: "14:13", detail: "MPLS high latency" },
  { id: 10, city: "Chennai", link: "cti", status: "latency", ts: "14:11", detail: "CTI Internet high latency" },
]

export const LIVE_POOL = [
  { city: "Delhi", link: "leaseline", status: "latency" },
  { city: "Delhi", link: "mpls", status: "latency" },
  { city: "Hyderabad", link: "cti", status: "latency" },
  { city: "Jaipur", link: "broadband", status: "latency" },
  { city: "Agra", link: "cti", status: "up" },
  { city: "Ahmedabad", link: "mpls", status: "up" },
  { city: "Ahmednagar", link: "cti", status: "up" },
  { city: "Ahmednagar - HUB", link: "mpls", status: "up" },
]

// ── Indian zone filter (Region dropdown) ─────────────────────────────────────

export const REGIONS = ["All Regions", "North", "South", "East", "West", "Central", "Northeast"]
export const STATUS_FILTERS = ["All Status", "Up", "Down", "Latency"]

// ── Per-city severity helpers (null-safe — not every location has every link) ─

export function cityDownCount(city) {
  return LINK_KEYS.filter((k) => city.links[k] && city.links[k].status === "down").length
}

export function cityLatencyCount(city) {
  return LINK_KEYS.filter((k) => city.links[k] && city.links[k].status === "latency").length
}

// Sort worst-first: most "down" links at the top, then most "latency" links,
// fully healthy stations sink to the bottom.
export function sortCitiesBySeverity(cities) {
  return [...cities].sort((a, b) => {
    const dd = cityDownCount(b) - cityDownCount(a)
    if (dd !== 0) return dd
    const ld = cityLatencyCount(b) - cityLatencyCount(a)
    if (ld !== 0) return ld
    return a.name.localeCompare(b.name)
  })
}

// Filters CITIES by Indian zone + status, then sorts worst-first.
export function filterAndSortCities(cities, region, status) {
  let rows = cities

  if (region !== "All Regions") {
    rows = rows.filter((c) => c.region === region)
  }

  if (status === "Down") {
    rows = rows.filter((c) => cityDownCount(c) > 0)
  } else if (status === "Latency") {
    rows = rows.filter((c) => cityLatencyCount(c) > 0)
  } else if (status === "Up") {
    rows = rows.filter((c) => cityDownCount(c) === 0 && cityLatencyCount(c) === 0)
  }

  return sortCitiesBySeverity(rows)
}