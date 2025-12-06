import { Vehicle, Stop } from '@/types/transit';
import { lineTextColors, lineColors } from '@/data/transitData';
import { cn } from '@/lib/utils';
import { 
  Train, 
  Users, 
  Clock, 
  Gauge, 
  MapPin, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Timer,
  ChevronRight
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

interface VehicleDetailsProps {
  vehicle: Vehicle | null;
  selectedStop?: Stop | null;
  vehiclesAtStop?: Vehicle[];
  onVehicleSelect?: (vehicle: Vehicle) => void;
}

export function VehicleDetails({ vehicle, selectedStop, vehiclesAtStop = [], onVehicleSelect }: VehicleDetailsProps) {
  if (selectedStop && vehiclesAtStop.length > 0) {
    return (
      <div className="h-full flex flex-col animate-fade-in">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-semibold">{selectedStop.name}</span>
          </div>
          <p className="text-xs text-muted-foreground capitalize">{selectedStop.type}</p>
          <div className="flex gap-1 mt-2">
            {selectedStop.lines.map(line => (
              <div
                key={line}
                className={cn("w-4 h-4 rounded-full", lineColors[line])}
              />
            ))}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">
          {vehiclesAtStop.length} vehicle{vehiclesAtStop.length !== 1 ? 's' : ''} on routes serving this stop
        </p>
        
        <ScrollArea className="flex-1">
          <div className="space-y-2 pr-2">
            {vehiclesAtStop.map(v => (
              <button
                key={v.id}
                onClick={() => onVehicleSelect?.(v)}
                data-testid={`button-vehicle-${v.id}`}
                className="w-full transit-card hover:border-primary/50 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className={cn("w-8 h-8 rounded-full flex items-center justify-center")}
                      style={{ backgroundColor: `var(--line-${v.lineColor})` }}
                    >
                      <Train className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className={cn("font-medium text-sm", lineTextColors[v.lineColor])}>
                        {v.lineName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Next: {v.nextStop} ({v.eta} min)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      v.status === 'on-time' && "bg-success/20 text-success",
                      v.status === 'delayed' && "bg-destructive/20 text-destructive",
                      v.status === 'early' && "bg-primary/20 text-primary"
                    )}>
                      {v.status}
                    </span>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {v.passengerCount}/{v.capacity}
                  </span>
                  <span className="flex items-center gap-1">
                    <Gauge className="w-3 h-3" />
                    {Math.round(v.speed)} km/h
                  </span>
                  <span className={cn(
                    "capitalize",
                    v.crowding === 'low' && "text-success",
                    v.crowding === 'medium' && "text-warning",
                    v.crowding === 'high' && "text-destructive"
                  )}>
                    {v.crowding} crowding
                  </span>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  }

  if (selectedStop && vehiclesAtStop.length === 0) {
    return (
      <div className="h-full flex flex-col animate-fade-in">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-semibold">{selectedStop.name}</span>
          </div>
          <p className="text-xs text-muted-foreground capitalize">{selectedStop.type}</p>
          <div className="flex gap-1 mt-2">
            {selectedStop.lines.map(line => (
              <div
                key={line}
                className={cn("w-4 h-4 rounded-full", lineColors[line])}
              />
            ))}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          <div className="text-center">
            <Train className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No active vehicles</p>
            <p className="text-xs mt-1">on routes serving this stop</p>
          </div>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <Train className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">Select a vehicle on the map</p>
          <p className="text-xs mt-1">to view real-time details</p>
        </div>
      </div>
    );
  }

  const crowdingPercent = (vehicle.passengerCount / vehicle.capacity) * 100;
  const crowdingColor = vehicle.crowding === 'low' 
    ? 'text-success' 
    : vehicle.crowding === 'medium' 
    ? 'text-warning' 
    : 'text-destructive';

  const statusIcon = vehicle.status === 'on-time' 
    ? <CheckCircle2 className="w-4 h-4 text-success" />
    : vehicle.status === 'delayed'
    ? <AlertTriangle className="w-4 h-4 text-destructive" />
    : <Timer className="w-4 h-4 text-primary" />;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className={cn("text-lg font-bold", lineTextColors[vehicle.lineColor])}>
              {vehicle.lineName}
            </span>
            {statusIcon}
          </div>
          <p className="text-xs text-muted-foreground font-mono">{vehicle.id}</p>
        </div>
        <div className={cn(
          "transit-badge",
          vehicle.status === 'on-time' && "bg-success/20 text-success",
          vehicle.status === 'delayed' && "bg-destructive/20 text-destructive",
          vehicle.status === 'early' && "bg-primary/20 text-primary"
        )}>
          {vehicle.status.toUpperCase()}
        </div>
      </div>

      {/* ETA */}
      <div className="transit-card">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Next Stop</p>
            <p className="font-semibold">{vehicle.nextStop}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-mono text-primary">{vehicle.eta}</p>
            <p className="text-xs text-muted-foreground">min</p>
          </div>
        </div>
      </div>

      {/* Crowding */}
      <div className="transit-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm">Crowding</span>
          </div>
          <span className={cn("text-sm font-medium capitalize", crowdingColor)}>
            {vehicle.crowding}
          </span>
        </div>
        <Progress 
          value={crowdingPercent} 
          className="h-2"
        />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground font-mono">
            {vehicle.passengerCount} passengers
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            {vehicle.capacity} capacity
          </span>
        </div>
      </div>

      {/* Speed & Position */}
      <div className="grid grid-cols-2 gap-3">
        <div className="transit-card">
          <div className="flex items-center gap-2 mb-1">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Speed</span>
          </div>
          <p className="text-xl font-bold font-mono">{Math.round(vehicle.speed)}</p>
          <p className="text-xs text-muted-foreground">km/h</p>
        </div>
        <div className="transit-card">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Heading</span>
          </div>
          <p className="text-xl font-bold font-mono">{vehicle.heading}°</p>
          <p className="text-xs text-muted-foreground">bearing</p>
        </div>
      </div>

      {/* Position */}
      <div className="transit-card">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">Position</span>
        </div>
        <div className="grid grid-cols-2 gap-2 font-mono text-xs">
          <div>
            <span className="text-muted-foreground">X: </span>
            <span className="text-foreground">{vehicle.position.x.toFixed(2)}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Y: </span>
            <span className="text-foreground">{vehicle.position.y.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
