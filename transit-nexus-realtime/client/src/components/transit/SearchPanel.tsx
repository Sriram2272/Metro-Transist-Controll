import { useState, useMemo } from 'react';
import { stops, routes } from '@/data/transitData';
import { lineColors } from '@/data/transitData';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Route } from 'lucide-react';

interface SearchPanelProps {
  onStopSelect: (stopId: string) => void;
  selectedStopId: string | null;
}

export function SearchPanel({ onStopSelect, selectedStopId }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'stops' | 'routes'>('stops');

  const filteredStops = useMemo(() => {
    if (!query) return stops.slice(0, 6);
    return stops.filter(stop => 
      stop.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const filteredRoutes = useMemo(() => {
    if (!query) return routes;
    return routes.filter(route => 
      route.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <div className="space-y-3">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search stops or routes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-muted border-border"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        <button
          onClick={() => setActiveTab('stops')}
          className={cn(
            "flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors",
            activeTab === 'stops' 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <MapPin className="w-3 h-3 inline mr-1.5" />
          Stops
        </button>
        <button
          onClick={() => setActiveTab('routes')}
          className={cn(
            "flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-colors",
            activeTab === 'routes' 
              ? "bg-background text-foreground shadow-sm" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Route className="w-3 h-3 inline mr-1.5" />
          Routes
        </button>
      </div>

      {/* Results */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-thin">
        {activeTab === 'stops' ? (
          filteredStops.map(stop => (
            <button
              key={stop.id}
              onClick={() => onStopSelect(stop.id)}
              data-testid={`button-stop-${stop.id}`}
              className={cn(
                "w-full transit-card transition-colors text-left",
                selectedStopId === stop.id 
                  ? "border-primary bg-primary/10" 
                  : "hover:border-primary/50"
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{stop.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{stop.type}</p>
                </div>
                <div className="flex gap-1">
                  {stop.lines.map(line => (
                    <div
                      key={line}
                      className={cn("w-3 h-3 rounded-full", lineColors[line])}
                    />
                  ))}
                </div>
              </div>
            </button>
          ))
        ) : (
          filteredRoutes.map(route => (
            <div
              key={route.id}
              className="transit-card"
            >
              <div className="flex items-center gap-3">
                <div className={cn("w-4 h-4 rounded-full", lineColors[route.lineColor])} />
                <div>
                  <p className="font-medium text-sm">{route.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {route.stops.length} stops
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
