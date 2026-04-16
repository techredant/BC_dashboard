import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: LucideIcon;
}

export function StatCard({ title, value, change, changeType, icon: Icon }: StatCardProps) {
  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1 font-display">{value}</p>
        </div>
        <div className="p-2.5 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
      <p
        className={`text-xs mt-3 font-medium ${
          changeType === "positive"
            ? "text-success"
            : changeType === "negative"
            ? "text-destructive"
            : "text-muted-foreground"
        }`}
      >
        {change}
      </p>
    </div>
  );
}
