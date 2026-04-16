import { Users, ShoppingBag, Radio, TrendingUp, Landmark, Eye } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const loginData = [
  { month: "Jan", logins: 4200 },
  { month: "Feb", logins: 5100 },
  { month: "Mar", logins: 6800 },
  { month: "Apr", logins: 5900 },
  { month: "May", logins: 7200 },
  { month: "Jun", logins: 8400 },
  { month: "Jul", logins: 9100 },
];

const levelData = [
  { level: "National", users: 12400, markets: 340, livestreams: 89 },
  { level: "County", users: 34200, markets: 1200, livestreams: 245 },
  { level: "Constituency", users: 21800, markets: 890, livestreams: 167 },
  { level: "Ward", users: 15600, markets: 2100, livestreams: 312 },
];

const userSegments = [
  { name: "Verified", value: 62400, color: "hsl(152, 60%, 42%)" },
  { name: "Pending", value: 14200, color: "hsl(38, 92%, 50%)" },
  { name: "Unverified", value: 7400, color: "hsl(0, 72%, 51%)" },
];

const recentActivity = [
  { user: "John Kamau", action: "Verified", level: "County", time: "2 min ago" },
  { user: "Mary Wanjiku", action: "New Livestream", level: "National", time: "5 min ago" },
  { user: "Peter Odhiambo", action: "Market Post", level: "Ward", time: "8 min ago" },
  { user: "Grace Muthoni", action: "Registered", level: "Constituency", time: "12 min ago" },
  { user: "David Kipchoge", action: "Feed Post", level: "National", time: "15 min ago" },
];

export default function Overview() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard Overview</h1>
        <p className="page-description">Monitor BroadCast platform activity and key metrics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <StatCard title="Total Users" value="84,012" change="+12.3% from last month" changeType="positive" icon={Users} />
        <StatCard title="Active Markets" value="4,530" change="+8.1% from last month" changeType="positive" icon={ShoppingBag} />
        <StatCard title="Live Streams" value="813" change="+23.5% from last month" changeType="positive" icon={Radio} />
        <StatCard title="Trends Today" value="1,247" change="-2.1% from yesterday" changeType="negative" icon={TrendingUp} />
        <StatCard title="Politicians" value="2,148" change="+45 new this week" changeType="positive" icon={Landmark} />
        <StatCard title="Daily Logins" value="9,102" change="+5.7% from yesterday" changeType="positive" icon={Eye} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card rounded-xl border p-5">
          <h3 className="font-semibold font-display mb-4">User Logins Over Time</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={loginData}>
              <defs>
                <linearGradient id="loginGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(222, 60%, 18%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(222, 60%, 18%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 16%, 90%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Area type="monotone" dataKey="logins" stroke="hsl(222, 60%, 18%)" fill="url(#loginGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-semibold font-display mb-4">User Verification</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={userSegments} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={3}>
                {userSegments.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => v.toLocaleString()} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {userSegments.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border p-5">
          <h3 className="font-semibold font-display mb-4">Activity by Level</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={levelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
              <XAxis dataKey="level" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 16%, 90%)",
                  borderRadius: "8px",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="users" fill="hsl(222, 60%, 18%)" radius={[4, 4, 0, 0]} name="Users" />
              <Bar dataKey="markets" fill="hsl(42, 92%, 55%)" radius={[4, 4, 0, 0]} name="Markets" />
              <Bar dataKey="livestreams" fill="hsl(152, 60%, 42%)" radius={[4, 4, 0, 0]} name="Livestreams" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border p-5">
          <h3 className="font-semibold font-display mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{item.user}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.action} · {item.level}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
