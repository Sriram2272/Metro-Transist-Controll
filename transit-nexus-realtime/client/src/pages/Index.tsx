import { useState, useMemo } from 'react';
import { useTransitData } from '@/hooks/useTransitData';
import { TransitMap } from '@/components/transit/TransitMap';
import { VehicleDetails } from '@/components/transit/VehicleDetails';
import { AlertsPanel } from '@/components/transit/AlertsPanel';
import { TelemetryFeed } from '@/components/transit/TelemetryFeed';
import { SearchPanel } from '@/components/transit/SearchPanel';
import { StatsBar } from '@/components/transit/StatsBar';
import { Vehicle, Stop } from '@/types/transit';
import { stops, routes } from '@/data/transitData';
import { 
  Train,
  Bell,
  Search,
  Radio,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Index = () => {
  const { 
    vehicles, 
    alerts, 
    telemetryLog, 
    isLoading,
    isLive,
    lastUpdated,
    dismissAlert 
  } = useTransitData();
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedStop, setSelectedStop] = useState<Stop | null>(null);
  const [rightPanelTab, setRightPanelTab] = useState<'details' | 'alerts' | 'telemetry'>('details');
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);

  const vehiclesAtSelectedStop = useMemo(() => {
    if (!selectedStop) return [];
    return vehicles.filter(v => selectedStop.lines.includes(v.lineColor));
  }, [selectedStop, vehicles]);

  const handleStopSelect = (stopId: string) => {
    const stop = stops.find(s => s.id === stopId);
    if (stop) {
      setSelectedStop(stop);
      setSelectedVehicle(null);
      setRightPanelTab('details');
    }
  };

  const handleVehicleSelect = (vehicle: Vehicle | null) => {
    setSelectedVehicle(vehicle);
    setSelectedStop(null);
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading transit data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-3 bg-card border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Train className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gradient">Metro Transit Control</h1>
            <p className="text-xs text-muted-foreground">Real-Time Vehicle Tracking & ETA Service</p>
          </div>
        </div>
        
      </header>

      {/* Stats Bar */}
      <StatsBar 
        vehicles={vehicles} 
        alertCount={alerts.length}
        isLive={isLive}
        lastUpdated={lastUpdated}
      />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Search */}
        <div className={cn(
          "bg-card border-r border-border transition-all duration-300 flex flex-col",
          leftPanelOpen ? "w-72" : "w-0"
        )}>
          {leftPanelOpen && (
            <div className="p-4 flex-1 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-4 h-4 text-primary" />
                <h2 className="font-semibold">Search</h2>
              </div>
              <SearchPanel 
                onStopSelect={handleStopSelect} 
                selectedStopId={selectedStop?.id || null}
              />
            </div>
          )}
        </div>

        {/* Toggle Left Panel */}
        <button
          onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          className="w-6 bg-card border-r border-border flex items-center justify-center hover:bg-muted transition-colors"
        >
          {leftPanelOpen ? (
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Map */}
        <div className="flex-1 p-4">
          <TransitMap 
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            selectedStop={selectedStop}
            vehiclesAtSelectedStop={vehiclesAtSelectedStop}
            onVehicleSelect={handleVehicleSelect}
            onStopSelect={handleStopSelect}
          />
        </div>

        {/* Right Panel */}
        <div className="w-80 bg-card border-l border-border flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setRightPanelTab('details')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                rightPanelTab === 'details' 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Train className="w-4 h-4" />
              Vehicle
            </button>
            <button
              onClick={() => setRightPanelTab('alerts')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 relative",
                rightPanelTab === 'alerts' 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Bell className="w-4 h-4" />
              Alerts
              {alerts.length > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setRightPanelTab('telemetry')}
              className={cn(
                "flex-1 py-3 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2",
                rightPanelTab === 'telemetry' 
                  ? "text-primary border-b-2 border-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Radio className="w-4 h-4" />
              Feed
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 p-4 overflow-hidden">
            {rightPanelTab === 'details' && (
              <VehicleDetails 
                vehicle={selectedVehicle} 
                selectedStop={selectedStop}
                vehiclesAtStop={vehiclesAtSelectedStop}
                onVehicleSelect={handleVehicleSelect}
              />
            )}
            {rightPanelTab === 'alerts' && (
              <AlertsPanel alerts={alerts} onDismiss={dismissAlert} />
            )}
            {rightPanelTab === 'telemetry' && (
              <TelemetryFeed messages={telemetryLog} isLive={isLive} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
