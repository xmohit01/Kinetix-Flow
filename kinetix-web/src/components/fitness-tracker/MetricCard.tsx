import { Target, Activity, Zap, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  subValue?: string;
  icon: 'target' | 'activity' | 'zap' | 'trending';
}

const iconMap = {
  target: Target,
  activity: Activity,
  zap: Zap,
  trending: TrendingUp,
};

// Map to warm/premium colors instead of cyan/blue/purple
const iconColorMap = {
  target: 'text-primary',
  activity: 'text-orange-500',
  zap: 'text-amber-500',
  trending: 'text-rose-500',
};

const bgColorMap = {
  target: 'bg-primary/10',
  activity: 'bg-orange-500/10',
  zap: 'bg-amber-500/10',
  trending: 'bg-rose-500/10',
};

export function MetricCard({ label, value, unit, subValue, icon }: MetricCardProps) {
  const Icon = iconMap[icon];
  const iconColor = iconColorMap[icon];
  const bgColor = bgColorMap[icon];

  return (
    <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
      <div className={`${bgColor} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
      </div>
      {subValue && <p className="text-xs text-muted-foreground mt-1">{subValue}</p>}
    </div>
  );
}
