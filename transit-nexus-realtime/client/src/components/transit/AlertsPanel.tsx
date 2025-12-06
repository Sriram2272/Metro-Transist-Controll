import { Alert } from '@/types/transit';
import { lineColors } from '@/data/transitData';
import { cn } from '@/lib/utils';
import { 
  AlertTriangle, 
  Clock, 
  Wrench, 
  CloudRain, 
  Users,
  X,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

interface AlertsPanelProps {
  alerts: Alert[];
  onDismiss: (alertId: string) => void;
}

const alertIcons = {
  delay: Clock,
  disruption: AlertTriangle,
  maintenance: Wrench,
  weather: CloudRain,
  crowding: Users
};

const severityStyles = {
  info: 'border-l-primary bg-primary/5',
  warning: 'border-l-warning bg-warning/5',
  critical: 'border-l-destructive bg-destructive/5'
};

export function AlertsPanel({ alerts, onDismiss }: AlertsPanelProps) {
  if (alerts.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No active alerts</p>
          <p className="text-xs mt-1">System operating normally</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 overflow-y-auto scrollbar-thin max-h-[400px]">
      {alerts.map((alert, index) => {
        const Icon = alertIcons[alert.type];
        
        return (
          <div
            key={alert.id}
            className={cn(
              "transit-card border-l-4 animate-slide-in",
              severityStyles[alert.severity]
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  alert.severity === 'info' && "bg-primary/20 text-primary",
                  alert.severity === 'warning' && "bg-warning/20 text-warning",
                  alert.severity === 'critical' && "bg-destructive/20 text-destructive"
                )}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-sm">{alert.title}</h4>
                    {alert.severity === 'critical' && (
                      <span className="transit-badge bg-destructive text-destructive-foreground animate-pulse">
                        CRITICAL
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex gap-1">
                      {alert.affectedLines.map(line => (
                        <div
                          key={line}
                          className={cn("w-3 h-3 rounded-full", lineColors[line])}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 flex-shrink-0"
                onClick={() => onDismiss(alert.id)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
