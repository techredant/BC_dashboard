import { useState } from "react";
import { Search, Crown, Building2, Users2, Scale, MapPin } from "lucide-react";

/* ================= POSITIONS ================= */
const positions = [
  { key: "all", label: "All", icon: Users2 },
  { key: "president", label: "President", icon: Crown },
  { key: "governor", label: "Governors", icon: Building2 },
  { key: "senator", label: "Senators", icon: Scale },
  { key: "mp", label: "MPs", icon: Users2 },
  { key: "mca", label: "MCAs", icon: MapPin },
];

/* ================= SAMPLE DATA ================= */
const politicians = [
  {
    id: 1,
    name: "William Ruto",
    position: "president",
    county: "National",
    constituency: null,
    ward: null,
    party: "UDA",
    followers: 2400000,
    verified: true,
  },
  {
    id: 2,
    name: "Johnson Sakaja",
    position: "governor",
    county: "Nairobi",
    constituency: null,
    ward: null,
    party: "UDA",
    followers: 520000,
    verified: true,
  },
  {
    id: 3,
    name: "Edwin Sifuna",
    position: "senator",
    county: "Nairobi",
    constituency: null,
    ward: null,
    party: "ODM",
    followers: 190000,
    verified: true,
  },
  {
    id: 4,
    name: "Kimani Ichung'wah",
    position: "mp",
    county: "Kiambu",
    constituency: "Kikuyu",
    ward: null,
    party: "UDA",
    followers: 310000,
    verified: true,
  },
  {
    id: 5,
    name: "Jane Njeri",
    position: "mca",
    county: "Nairobi",
    constituency: "Dagoretti North",
    ward: "Kilimani Ward",
    party: "UDA",
    followers: 12000,
    verified: false,
  },
];

/* ================= COMPONENT ================= */
export default function PoliticiansPage() {
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("all");
  const [countyFilter, setCountyFilter] = useState("all");
  const [constituencyFilter, setConstituencyFilter] = useState("all");
  const [wardFilter, setWardFilter] = useState("all");

  /* ==== UNIQUE LOCATION LISTS ==== */
  const counties = ["all", ...new Set(politicians.map((p) => p.county))];

  const constituencies = [
    "all",
    ...new Set(
      politicians
        .filter((p) => countyFilter === "all" || p.county === countyFilter)
        .map((p) => p.constituency)
        .filter(Boolean)
    ),
  ];

  const wards = [
    "all",
    ...new Set(
      politicians
        .filter(
          (p) =>
            (countyFilter === "all" || p.county === countyFilter) &&
            (constituencyFilter === "all" ||
              p.constituency === constituencyFilter)
        )
        .map((p) => p.ward)
        .filter(Boolean)
    ),
  ];

  /* ==== FILTER LOGIC ==== */
  const filtered = politicians.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase());

    const matchPos =
      posFilter === "all" || p.position === posFilter;

    const matchCounty =
      countyFilter === "all" || p.county === countyFilter;

    const matchConstituency =
      constituencyFilter === "all" ||
      p.constituency === constituencyFilter;

    const matchWard =
      wardFilter === "all" || p.ward === wardFilter;

    return (
      matchSearch &&
      matchPos &&
      matchCounty &&
      matchConstituency &&
      matchWard
    );
  });

  const formatFollowers = (n: number) =>
    n >= 1000000
      ? `${(n / 1000000).toFixed(1)}M`
      : n >= 1000
      ? `${(n / 1000).toFixed(0)}K`
      : n.toString();

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">
        Political Leaders
      </h1>

      {/* SEARCH */}
      <div className="flex items-center gap-2 mb-4 border rounded-lg px-3 py-2 max-w-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none flex-1 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* POSITION FILTER */}
      <div className="flex gap-2 flex-wrap mb-4">
        {positions.map((p) => (
          <button
            key={p.key}
            onClick={() => setPosFilter(p.key)}
            className={`px-3 py-1 text-xs rounded ${
              posFilter === p.key
                ? "bg-primary text-white"
                : "bg-muted"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* LOCATION FILTERS */}
      <div className="flex gap-3 flex-wrap mb-6">
        <select
          value={countyFilter}
          onChange={(e) => {
            setCountyFilter(e.target.value);
            setConstituencyFilter("all");
            setWardFilter("all");
          }}
        >
          {counties.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={constituencyFilter}
          onChange={(e) => {
            setConstituencyFilter(e.target.value);
            setWardFilter("all");
          }}
        >
          {constituencies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          value={wardFilter}
          onChange={(e) => setWardFilter(e.target.value)}
        >
          {wards.map((w) => (
            <option key={w}>{w}</option>
          ))}
        </select>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((pol) => (
          <div key={pol.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{pol.name}</h3>
            <p className="text-xs capitalize">
              {pol.position}
            </p>
            <p className="text-xs text-muted-foreground">
              {pol.county}
              {pol.constituency && ` • ${pol.constituency}`}
              {pol.ward && ` • ${pol.ward}`}
            </p>
            <div className="flex justify-between mt-3 text-xs">
              <span>{pol.party}</span>
              <span>{formatFollowers(pol.followers)} followers</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}