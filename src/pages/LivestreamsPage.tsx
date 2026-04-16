import { Radio, Users, Eye, Clock } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const streamsByLevel = [
  { level: "National", active: 12, viewers: 45000, total: 89 },
  { level: "County", active: 34, viewers: 23400, total: 245 },
  { level: "Constituency", active: 28, viewers: 12100, total: 167 },
  { level: "Ward", active: 45, viewers: 8900, total: 312 },
];

const weeklyStreams = [
  { day: "Mon", streams: 45, viewers: 12000 },
  { day: "Tue", streams: 52, viewers: 15000 },
  { day: "Wed", streams: 68, viewers: 19000 },
  { day: "Thu", streams: 41, viewers: 11000 },
  { day: "Fri", streams: 73, viewers: 22000 },
  { day: "Sat", streams: 38, viewers: 9000 },
  { day: "Sun", streams: 29, viewers: 7000 },
];

const liveNow = [
  { id: 1, title: "National Assembly Budget Session", host: "Parliament TV", level: "National", viewers: 12400, duration: "2h 15m" },
  { id: 2, title: "Nairobi County Assembly Meeting", host: "NCA Media", level: "County", viewers: 3200, duration: "1h 42m" },
  { id: 3, title: "Youth Town Hall - Westlands", host: "Community FM", level: "Constituency", viewers: 890, duration: "45m" },
  { id: 4, title: "Ward Development Committee", host: "Ward Admin", level: "Ward", viewers: 234, duration: "30m" },
];

const levelBadge: Record<string, string> = {
  National: "badge-national",
  County: "badge-county",
  Constituency: "badge-constituency",
  Ward: "badge-ward",
};

export default function LivestreamsPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Livestreams</h1>
        <p className="page-description">Monitor live broadcasts across all political levels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Live Now" value="119" change="Across all levels" changeType="neutral" icon={Radio} />
        <StatCard title="Total Viewers" value="89.4K" change="+18% vs yesterday" changeType="positive" icon={Eye} />
        <StatCard title="Total Streams" value="813" change="This month" changeType="neutral" icon={Users} />
        <StatCard title="Avg Duration" value="1h 23m" change="+8 min vs last week" changeType="positive" icon={Clock} />
      </div>

      {/* Streams by level */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {streamsByLevel.map((s) => (
          <div key={s.level} className="stat-card">
            <span className={levelBadge[s.level]}>{s.level}</span>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Active</span><span className="font-semibold">{s.active}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Viewers</span><span className="font-semibold">{s.viewers.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total</span><span className="font-semibold">{s.total}</span></div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border p-5 mb-6">
        <h3 className="font-semibold font-display mb-4">Weekly Stream Activity</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weeklyStreams}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,16%,90%)", borderRadius: "8px", fontSize: "13px" }} />
            <Bar dataKey="streams" fill="hsl(222, 60%, 18%)" radius={[4, 4, 0, 0]} name="Streams" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Live Now */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="px-5 py-3 border-b flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive animate-pulse" />
          <h3 className="font-semibold font-display text-sm">Live Now</h3>
        </div>
        {liveNow.map((stream) => (
          <div key={stream.id} className="flex items-center justify-between px-5 py-4 border-b last:border-0 hover:bg-secondary/30 transition-colors">
            <div>
              <p className="text-sm font-semibold">{stream.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{stream.host} · {stream.duration}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-sm">
                <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="font-medium">{stream.viewers.toLocaleString()}</span>
              </div>
              <span className={levelBadge[stream.level]}>{stream.level}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
