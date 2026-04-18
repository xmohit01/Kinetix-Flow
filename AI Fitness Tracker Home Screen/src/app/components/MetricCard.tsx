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

const iconColorMap = {
  target: 'text-blue-400',
  activity: 'text-cyan-400',
  zap: 'text-orange-400',
  trending: 'text-purple-400',
};

const bgColorMap = {
  target: 'bg-blue-500/10',
  activity: 'bg-cyan-500/10',
  zap: 'bg-orange-500/10',
  trending: 'bg-purple-500/10',
};

export function MetricCard({ label, value, unit, subValue, icon }: MetricCardProps) {
  const Icon = iconMap[icon];
  const iconColor = iconColorMap[icon];
  const bgColor = bgColorMap[icon];

  return (
    <div className="bg-gradient-to-br from-[#1a1f35] to-[#141826] rounded-2xl p-4 border border-gray-800/50 shadow-xl">
      <div className={`${bgColor} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <p className="text-2xl">{value}</p>
        {unit && <span className="text-xs text-gray-500">{unit}</span>}
      </div>
      {subValue && <p className="text-xs text-gray-500 mt-1">{subValue}</p>}
    </div>
  );
}
