import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  badge?: {
    text: string;
    variant: "success" | "warning" | "default";
  };
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const MetricCard = ({ title, value, icon: Icon, badge, trend }: MetricCardProps) => {
  const badgeStyles = {
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    default: "bg-muted text-muted-foreground",
  };

  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {badge && (
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badgeStyles[badge.variant]}`}>
            {badge.text}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-3xl font-bold text-foreground">{value}</span>
          {trend && (
            <span className={`text-sm font-medium ${trend.isPositive ? "text-success" : "text-destructive"}`}>
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
