import { ShoppingBag, TrendingUp, Package, DollarSign } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const marketData = [
  { week: "W1", national: 45, county: 120, constituency: 89, ward: 210 },
  { week: "W2", national: 52, county: 145, constituency: 95, ward: 230 },
  { week: "W3", national: 61, county: 130, constituency: 110, ward: 260 },
  { week: "W4", national: 48, county: 160, constituency: 102, ward: 245 },
];

const topMarkets = [
  { name: "Nairobi Market Hub", level: "County", listings: 1240, revenue: "KES 2.4M", growth: "+12%" },
  { name: "National Trade Center", level: "National", listings: 340, revenue: "KES 8.1M", growth: "+8%" },
  { name: "Kisumu Lakeside Market", level: "County", listings: 890, revenue: "KES 1.1M", growth: "+15%" },
  { name: "Westlands Marketplace", level: "Constituency", listings: 456, revenue: "KES 780K", growth: "+6%" },
  { name: "Kibera Community Shop", level: "Ward", listings: 234, revenue: "KES 320K", growth: "+22%" },
];

export default function MarketsPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Markets</h1>
        <p className="page-description">Monitor marketplace activity across all levels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Listings" value="4,530" change="+8.1% this month" changeType="positive" icon={Package} />
        <StatCard title="Active Sellers" value="1,892" change="+3.2% this month" changeType="positive" icon={ShoppingBag} />
        <StatCard title="Total Revenue" value="KES 12.6M" change="+11% this month" changeType="positive" icon={DollarSign} />
        <StatCard title="Avg Growth" value="+14.2%" change="Across all levels" changeType="neutral" icon={TrendingUp} />
      </div>

      <div className="bg-card rounded-xl border p-5 mb-6">
        <h3 className="font-semibold font-display mb-4">Market Listings by Level (Weekly)</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,16%,90%)", borderRadius: "8px", fontSize: "13px" }} />
            <Line type="monotone" dataKey="national" stroke="hsl(222, 60%, 18%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="county" stroke="hsl(42, 92%, 55%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="constituency" stroke="hsl(210, 100%, 52%)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="ward" stroke="hsl(152, 60%, 42%)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="px-5 py-3 border-b"><h3 className="font-semibold font-display text-sm">Top Markets</h3></div>
        <table className="w-full">
          <thead>
            <tr className="border-b bg-secondary/50">
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Market</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Level</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Listings</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Revenue</th>
              <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Growth</th>
            </tr>
          </thead>
          <tbody>
            {topMarkets.map((m, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-secondary/30 transition-colors">
                <td className="px-5 py-3.5 text-sm font-medium">{m.name}</td>
                <td className="px-5 py-3.5"><span className={`badge-${m.level.toLowerCase()}`}>{m.level}</span></td>
                <td className="px-5 py-3.5 text-sm">{m.listings.toLocaleString()}</td>
                <td className="px-5 py-3.5 text-sm font-medium">{m.revenue}</td>
                <td className="px-5 py-3.5 text-sm text-success font-medium">{m.growth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
