import { Vehicle, Stop, Route, LineColor } from '@/types/transit';
import { routes, stops, lineColors, lineTextColors } from '@/data/transitData';
import { cn } from '@/lib/utils';
import { Train, Bus } from 'lucide-react';

interface TransitMapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  selectedStop: Stop | null;
  vehiclesAtSelectedStop: Vehicle[];
  onVehicleSelect: (vehicle: Vehicle) => void;
  onStopSelect: (stopId: string) => void;
}

const lineStrokeColors: Record<LineColor, string> = {
  red: '#ef4444',
  blue: '#3b82f6',
  green: '#22c55e',
  orange: '#f97316',
  purple: '#a855f7',
  yellow: '#eab308'
};

export function TransitMap({ vehicles, selectedVehicle, selectedStop, vehiclesAtSelectedStop, onVehicleSelect, onStopSelect }: TransitMapProps) {
  const isVehicleAtSelectedStop = (vehicleId: string) => {
    if (!selectedStop) return false;
    return vehiclesAtSelectedStop.some(v => v.id === vehicleId);
  };
  return (
    <div className="relative w-full h-full bg-map-bg map-grid rounded-lg overflow-hidden">
      {/* SVG Routes */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          {routes.map(route => (
            <filter key={`glow-${route.id}`} id={`glow-${route.lineColor}`}>
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          ))}
        </defs>
        
        {/* Route paths */}
        {routes.map(route => (
          <polyline
            key={route.id}
            points={route.path.map(p => `${p.x},${p.y}`).join(' ')}
            fill="none"
            stroke={lineStrokeColors[route.lineColor]}
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.6"
            filter={`url(#glow-${route.lineColor})`}
          />
        ))}
      </svg>

      {/* Stops */}
      {stops.map(stop => (
        <button
          key={stop.id}
          onClick={() => onStopSelect(stop.id)}
          data-testid={`map-stop-${stop.id}`}
          className={cn(
            "absolute transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer transition-transform hover:scale-125",
            stop.type === 'station' ? 'w-5 h-5' : 'w-3 h-3'
          )}
          style={{ left: `${stop.position.x}%`, top: `${stop.position.y}%` }}
        >
          <div
            className={cn(
              "w-full h-full rounded-full bg-background border-2 transition-all",
              selectedStop?.id === stop.id 
                ? "border-primary ring-2 ring-primary ring-offset-1 ring-offset-background" 
                : stop.type === 'station' 
                  ? 'border-foreground' 
                  : 'border-muted-foreground'
            )}
          />
          {stop.type === 'station' && (
            <span className={cn(
              "absolute left-6 top-1/2 -translate-y-1/2 text-[10px] font-medium whitespace-nowrap",
              selectedStop?.id === stop.id ? "text-primary font-semibold" : "text-foreground"
            )}>
              {stop.name}
            </span>
          )}
        </button>
      ))}

      {/* Vehicles */}
      {vehicles.map(vehicle => {
        const isHighlighted = isVehicleAtSelectedStop(vehicle.id);
        const isSelected = selectedVehicle?.id === vehicle.id;
        const isDimmed = selectedStop && !isHighlighted;
        
        return (
          <button
            key={vehicle.id}
            onClick={() => onVehicleSelect(vehicle)}
            data-testid={`map-vehicle-${vehicle.id}`}
            className={cn(
              "absolute transform -translate-x-1/2 -translate-y-1/2 z-20 vehicle-marker",
              "rounded-full flex items-center justify-center",
              "transition-all duration-300 hover:scale-125",
              isSelected && "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-125",
              isHighlighted && !isSelected && "ring-2 ring-primary ring-offset-1 ring-offset-background scale-110",
              isDimmed ? "w-5 h-5 opacity-40" : "w-6 h-6"
            )}
            style={{
              left: `${vehicle.position.x}%`,
              top: `${vehicle.position.y}%`,
              backgroundColor: lineStrokeColors[vehicle.lineColor],
              boxShadow: isDimmed ? 'none' : `0 0 12px ${lineStrokeColors[vehicle.lineColor]}80`
            }}
          >
            <Train className={cn("text-white", isDimmed ? "w-2.5 h-2.5" : "w-3 h-3")} />
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-muted-foreground mb-2">Transit Lines</p>
        <div className="flex flex-wrap gap-2">
          {routes.map(route => (
            <div key={route.id} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: lineStrokeColors[route.lineColor] }}
              />
              <span className="text-xs text-foreground">{route.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-muted-foreground mb-1">
          {selectedStop ? `Vehicles at ${selectedStop.name}` : 'Active Vehicles'}
        </p>
        <p className="text-2xl font-bold font-mono text-primary">
          {selectedStop ? vehiclesAtSelectedStop.length : vehicles.length}
        </p>
      </div>
    </div>
  );
}
