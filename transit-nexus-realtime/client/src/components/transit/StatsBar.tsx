import { Vehicle } from '@/types/transit';
import { cn } from '@/lib/utils';
import { 
  Train, 
  Users, 
  Clock, 
  AlertTriangle,
  Activity,
  Wifi
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface StatsBarProps {
  vehicles: Vehicle[];
  alertCount: number;
  isLive: boolean;
  lastUpdated: Date | null;
}

export function StatsBar({ vehicles, alertCount, isLive, lastUpdated }: StatsBarProps) {
  const totalPassengers = vehicles.reduce((sum, v) => sum + v.passengerCount, 0);
  const delayedCount = vehicles.filter(v => v.status === 'delayed').length;
  const avgSpeed = vehicles.reduce((sum, v) => sum + v.speed, 0) / vehicles.length;

  const stats = [
    {
      icon: Train,
      label: 'Active Vehicles',
      value: vehicles.length,
      color: 'text-primary'
    },
    {
      icon: Users,
      label: 'Total Passengers',
      value: totalPassengers.toLocaleString(),
      color: 'text-accent'
    },
    {
      icon: Activity,
      label: 'Avg Speed',
      value: `${avgSpeed.toFixed(1)} km/h`,
      color: 'text-success'
    },
    {
      icon: Clock,
      label: 'Delayed',
      value: delayedCount,
      color: delayedCount > 0 ? 'text-warning' : 'text-muted-foreground'
    },
    {
      icon: AlertTriangle,
      label: 'Active Alerts',
      value: alertCount,
      color: alertCount > 0 ? 'text-destructive' : 'text-muted-foreground'
    }
  ];

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-2 bg-card border-b border-border">
      <div className="flex items-center gap-6">
        {stats.map((stat, idx) => (
          <div key={stat.label} className="flex items-center gap-2">
            <stat.icon className={cn("w-4 h-4", stat.color)} />
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className={cn("text-sm font-bold font-mono", stat.color)}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Wifi className={cn(
            "w-3.5 h-3.5",
            isLive ? "text-success" : "text-muted-foreground"
          )} />
          <div className={cn(
            "w-2 h-2 rounded-full",
            isLive ? "bg-success animate-pulse" : "bg-muted-foreground"
          )} />
          <span className="text-xs font-mono text-muted-foreground">
            {isLive ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
        {lastUpdated && (
          <span className="text-xs text-muted-foreground">
            Updated {formatDistanceToNow(lastUpdated, { addSuffix: true, includeSeconds: true })}
          </span>
        )}
      </div>
    </div>
  );
}
