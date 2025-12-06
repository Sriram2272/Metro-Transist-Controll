import { TelemetryMessage } from '@/types/transit';
import { cn } from '@/lib/utils';
import { Radio, Activity } from 'lucide-react';
import { format } from 'date-fns';

interface TelemetryFeedProps {
  messages: TelemetryMessage[];
  isLive: boolean;
}

export function TelemetryFeed({ messages, isLive }: TelemetryFeedProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Telemetry Feed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            isLive ? "bg-success animate-pulse" : "bg-muted-foreground"
          )} />
          <span className="text-xs text-muted-foreground">
            {isLive ? 'LIVE' : 'OFFLINE'}
          </span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-thin space-y-1 font-mono text-xs">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>Waiting for telemetry...</p>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={`${msg.vehicleId}-${msg.timestamp.getTime()}`}
              className={cn(
                "p-2 rounded bg-muted/50 border border-border/50",
                idx === 0 && "border-primary/30 bg-primary/5"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-primary font-semibold">{msg.vehicleId}</span>
                <span className="text-muted-foreground">
                  {format(msg.timestamp, 'HH:mm:ss.SSS')}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 text-muted-foreground">
                <span>lat: <span className="text-foreground">{msg.latitude.toFixed(6)}</span></span>
                <span>lon: <span className="text-foreground">{msg.longitude.toFixed(6)}</span></span>
                <span>spd: <span className="text-foreground">{msg.speed.toFixed(1)} km/h</span></span>
                <span>hdg: <span className="text-foreground">{msg.heading}°</span></span>
              </div>
              <div className="mt-1">
                <span className={cn(
                  "transit-badge",
                  msg.occupancyStatus === 'MANY_SEATS_AVAILABLE' && "bg-success/20 text-success",
                  msg.occupancyStatus === 'FEW_SEATS_AVAILABLE' && "bg-warning/20 text-warning",
                  (msg.occupancyStatus === 'STANDING_ROOM_ONLY' || msg.occupancyStatus === 'CRUSHED_STANDING_ROOM_ONLY') && "bg-destructive/20 text-destructive"
                )}>
                  {msg.occupancyStatus.replace(/_/g, ' ')}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
