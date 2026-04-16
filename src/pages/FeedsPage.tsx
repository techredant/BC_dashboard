"use client";

import { useMemo, useState } from "react";
import kenyaData from "@/assets/data/iebc.json";
import { Globe, MapPin, Building, Map } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ============================
   TYPES
============================ */

type Ward = {
  name: string;
  code: number;
};

type Constituency = {
  name: string;
  code: number;
  wards: Ward[];
};

type County = {
  name: string;
  countyCode: number;
  constituencies: Constituency[];
};

type KenyaData = {
  counties: County[];
};

const data = kenyaData as KenyaData;

/* ============================
   SAMPLE FEEDS (Replace with DB later)
============================ */

const allFeeds = [
  {
    id: 1,
    title: "Presidential Address Summary",
    level: "national",
    county: "",
    constituency: "",
    ward: "",
    author: "Admin",
    time: "1h ago",
  },
  {
    id: 2,
    title: "Nairobi County Budget Update",
    level: "county",
    county: "Nairobi",
    constituency: "",
    ward: "",
    author: "County Editor",
    time: "2h ago",
  },
  {
    id: 3,
    title: "Westlands Road Construction",
    level: "constituency",
    county: "Nairobi",
    constituency: "Westlands",
    ward: "",
    author: "Local Admin",
    time: "3h ago",
  },
  {
    id: 4,
    title: "Kitisuru Ward Meeting",
    level: "ward",
    county: "Nairobi",
    constituency: "Westlands",
    ward: "Kitisuru",
    author: "Ward Rep",
    time: "4h ago",
  },
];

/* ============================
   COMPONENT
============================ */

export default function FeedsPage() {
  const [activeLevel, setActiveLevel] = useState("all");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  /* ============================
     Dynamic Counts
  ============================ */

  const countyCount = data.counties.length;

  const constituencyCount = useMemo(
    () =>
      data.counties.reduce(
        (total, county) => total + county.constituencies.length,
        0
      ),
    []
  );

  const wardCount = useMemo(
    () =>
      data.counties.reduce(
        (total, county) =>
          total +
          county.constituencies.reduce(
            (sub, c) => sub + c.wards.length,
            0
          ),
        0
      ),
    []
  );

  const levels = [
    { key: "national", label: "National", icon: Globe, count: 1 },
    { key: "county", label: "County", icon: Building, count: countyCount },
    { key: "constituency", label: "Constituency", icon: Map, count: constituencyCount },
    { key: "ward", label: "Ward", icon: MapPin, count: wardCount },
  ];

  /* ============================
     Drill Down Logic
  ============================ */

  const counties = data.counties;

  const constituencies =
    counties.find((c) => c.name === selectedCounty)?.constituencies || [];

  const wards =
    constituencies.find((c) => c.name === selectedConstituency)?.wards || [];

  /* ============================
     Feed Filtering
  ============================ */

  const filteredFeeds = allFeeds.filter((feed) => {
    if (activeLevel !== "all" && feed.level !== activeLevel) return false;
    if (selectedCounty && feed.county !== selectedCounty) return false;
    if (selectedConstituency && feed.constituency !== selectedConstituency)
      return false;
    if (selectedWard && feed.ward !== selectedWard) return false;
    return true;
  });

  /* ============================
     CHART DATA (Demo)
  ============================ */

  const feedData = [
    { day: "Mon", national: 5, county: 20, constituency: 15, ward: 40 },
    { day: "Tue", national: 8, county: 25, constituency: 18, ward: 35 },
    { day: "Wed", national: 6, county: 30, constituency: 12, ward: 50 },
    { day: "Thu", national: 4, county: 28, constituency: 20, ward: 33 },
    { day: "Fri", national: 9, county: 35, constituency: 25, ward: 60 },
  ];

  /* ============================
     UI
  ============================ */

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Feed Management</h1>

      {/* LEVEL CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {levels.map((l) => (
          <button
            key={l.key}
            onClick={() =>
              setActiveLevel(activeLevel === l.key ? "all" : l.key)
            }
            className="border rounded-lg p-4 text-left hover:shadow"
          >
            <p className="text-sm">{l.label}</p>
            <p className="text-xl font-bold">{l.count}</p>
          </button>
        ))}
      </div>

      {/* LOCATION FILTERS */}
      <div className="grid md:grid-cols-3 gap-4">
        <select
          className="border p-2 rounded"
          value={selectedCounty}
          onChange={(e) => {
            setSelectedCounty(e.target.value);
            setSelectedConstituency("");
            setSelectedWard("");
          }}
        >
          <option value="">All Counties</option>
          {counties.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedConstituency}
          onChange={(e) => {
            setSelectedConstituency(e.target.value);
            setSelectedWard("");
          }}
          disabled={!selectedCounty}
        >
          <option value="">All Constituencies</option>
          {constituencies.map((c) => (
            <option key={c.name}>{c.name}</option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={selectedWard}
          onChange={(e) => setSelectedWard(e.target.value)}
          disabled={!selectedConstituency}
        >
          <option value="">All Wards</option>
          {wards.map((w) => (
            <option key={w.name}>{w.name}</option>
          ))}
        </select>
      </div>

      {/* CHART */}
      <div className="bg-white border rounded-lg p-4">
        <h3 className="font-semibold mb-4">
          Weekly Feed Posts by Level
        </h3>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={feedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="national" stackId="a" fill="#1e3a8a" />
            <Bar dataKey="county" stackId="a" fill="#f59e0b" />
            <Bar dataKey="constituency" stackId="a" fill="#2563eb" />
            <Bar dataKey="ward" stackId="a" fill="#059669" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* FEED LIST */}
      <div className="border rounded-lg divide-y">
        {filteredFeeds.length === 0 && (
          <p className="p-4 text-sm text-gray-500">No feeds found</p>
        )}

        {filteredFeeds.map((feed) => (
          <div key={feed.id} className="p-4">
            <p className="font-medium">{feed.title}</p>
            <p className="text-xs text-gray-500 mt-1">
              {feed.author} · {feed.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}