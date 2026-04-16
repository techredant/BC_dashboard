import { TrendingUp, TrendingDown, Hash, MessageCircle } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const trendData = [
  { hour: "6am", mentions: 120 },
  { hour: "9am", mentions: 450 },
  { hour: "12pm", mentions: 890 },
  { hour: "3pm", mentions: 670 },
  { hour: "6pm", mentions: 1200 },
  { hour: "9pm", mentions: 980 },
  { hour: "12am", mentions: 340 },
];

const trends = [
  { id: 1, tag: "#BudgetDebate", level: "National", mentions: 12400, sentiment: "mixed", trend: "up" },
  { id: 2, tag: "#NairobiRoads", level: "County", mentions: 8900, sentiment: "negative", trend: "up" },
  { id: 3, tag: "#HealthcareReform", level: "National", mentions: 7600, sentiment: "positive", trend: "up" },
  { id: 4, tag: "#WaterCrisis", level: "County", mentions: 5400, sentiment: "negative", trend: "down" },
  { id: 5, tag: "#YouthEmployment", level: "National", mentions: 4200, sentiment: "positive", trend: "up" },
  { id: 6, tag: "#WardDevelopment", level: "Ward", mentions: 2100, sentiment: "positive", trend: "up" },
  { id: 7, tag: "#ElectionPrep", level: "Constituency", mentions: 3800, sentiment: "mixed", trend: "down" },
];

const sentimentColor: Record<string, string> = {
  positive: "text-success",
  negative: "text-destructive",
  mixed: "text-warning",
};

export default function TrendsPage() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Trends</h1>
        <p className="page-description">Track trending topics across all political levels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-primary/10"><Hash className="h-5 w-5 text-primary" /></div>
          <div><p className="text-2xl font-bold font-display">1,247</p><p className="text-sm text-muted-foreground">Active Trends</p></div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-accent/10"><MessageCircle className="h-5 w-5 text-accent" /></div>
          <div><p className="text-2xl font-bold font-display">89.4K</p><p className="text-sm text-muted-foreground">Total Mentions Today</p></div>
        </div>
        <div className="stat-card flex items-center gap-4">
          <div className="p-3 rounded-lg bg-success/10"><TrendingUp className="h-5 w-5 text-success" /></div>
          <div><p className="text-2xl font-bold font-display">+23%</p><p className="text-sm text-muted-foreground">Engagement Growth</p></div>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-5 mb-6">
        <h3 className="font-semibold font-display mb-4">Mentions Timeline (Today)</h3>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="mentionGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(42, 92%, 55%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(42, 92%, 55%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 90%)" />
            <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
            <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,16%,90%)", borderRadius: "8px", fontSize: "13px" }} />
            <Area type="monotone" dataKey="mentions" stroke="hsl(42, 92%, 55%)" fill="url(#mentionGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="px-5 py-3 border-b"><h3 className="font-semibold font-display text-sm">Trending Topics</h3></div>
        {trends.map((t, i) => (
          <div key={t.id} className="flex items-center justify-between px-5 py-3.5 border-b last:border-0 hover:bg-secondary/30 transition-colors">
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-muted-foreground/50 w-6 font-display">{i + 1}</span>
              <div>
                <p className="text-sm font-semibold">{t.tag}</p>
                <p className="text-xs text-muted-foreground">{t.mentions.toLocaleString()} mentions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-xs font-medium capitalize ${sentimentColor[t.sentiment]}`}>{t.sentiment}</span>
              <span className={`badge-${t.level.toLowerCase()}`}>{t.level}</span>
              {t.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
