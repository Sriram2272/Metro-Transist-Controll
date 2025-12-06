import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Vehicle, Alert, TelemetryMessage, Route, Stop, LineColor } from '@/types/transit';
import { routes as staticRoutes } from '@/data/transitData';

// Map database route colors to LineColor type
const colorMap: Record<string, LineColor> = {
  '#EF4444': 'red',
  '#3B82F6': 'blue',
  '#22C55E': 'green',
  '#F97316': 'orange',
  '#8B5CF6': 'purple',
  '#EAB308': 'yellow'
};

// Map database severity to frontend severity
const severityMap: Record<string, Alert['severity']> = {
  'low': 'info',
  'medium': 'warning',
  'high': 'critical'
};

// Map database alert type to frontend type
const alertTypeMap: Record<string, Alert['type']> = {
  'delay': 'delay',
  'service-change': 'disruption',
  'emergency': 'disruption',
  'info': 'crowding'
};

export function useTransitData() {
  const [telemetryLog, setTelemetryLog] = useState<TelemetryMessage[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const isLive = true;

  const { data: routesData = [] } = useQuery({
    queryKey: ['/api/routes'],
  });

  const { data: vehiclesData = [], isLoading: vehiclesLoading } = useQuery({
    queryKey: ['/api/vehicles'],
    refetchInterval: 2000,
  });

  const { data: alertsData = [] } = useQuery({
    queryKey: ['/api/alerts'],
    refetchInterval: 5000,
  });

  const { data: telemetryData = [] } = useQuery({
    queryKey: ['/api/telemetry'],
  });

  const dismissAlertMutation = useMutation({
    mutationFn: (alertId: string) =>
      apiRequest.patch(`/api/alerts/${alertId}`, { active: false }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/alerts'] });
    },
  });

  // Transform routes
  const routes: Route[] = routesData.map((r: any) => {
    const staticRoute = staticRoutes.find(sr => sr.id === r.id);
    return {
      id: r.id,
      name: r.name,
      lineColor: colorMap[r.color] || 'blue',
      stops: staticRoute?.stops || [],
      path: staticRoute?.path || []
    };
  });

  // Transform vehicles with local state for live updates
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    if (vehiclesData.length > 0) {
      const transformed: Vehicle[] = vehiclesData.map((v: any) => {
        const route = routesData.find((r: any) => r.id === v.routeId);
        const lineColor = (v.routeId as LineColor) || 'blue';
        return {
          id: v.id,
          routeId: v.routeId || '',
          lineName: route?.name || `${lineColor.charAt(0).toUpperCase() + lineColor.slice(1)} Line`,
          lineColor: lineColor,
          position: { x: Number(v.positionX), y: Number(v.positionY) },
          heading: Number(v.heading),
          speed: Number(v.speed),
          crowding: v.crowding as Vehicle['crowding'],
          nextStop: v.nextStop || '',
          eta: v.eta,
          status: v.status as Vehicle['status'],
          passengerCount: v.passengerCount,
          capacity: 150
        };
      });
      setVehicles(transformed);
      setLastUpdated(new Date());
    }
  }, [vehiclesData, routesData]);

  // Transform alerts
  const alerts: Alert[] = alertsData.map((a: any) => ({
    id: a.id,
    type: alertTypeMap[a.type] || 'delay',
    severity: severityMap[a.severity] || 'info',
    title: a.title,
    description: a.message,
    affectedLines: (a.affectedRoutes || []).map((r: string) => {
      const route = routesData.find((rt: any) => rt.id === r);
      return colorMap[route?.color || '#3B82F6'] || 'blue';
    }),
    timestamp: new Date(a.createdAt),
    active: a.active
  }));

  // Transform telemetry
  useEffect(() => {
    if (telemetryData.length > 0) {
      const transformed: TelemetryMessage[] = telemetryData.map((t: any) => ({
        vehicleId: t.vehicleId || '',
        timestamp: new Date(t.recordedAt),
        latitude: Number(t.latitude),
        longitude: Number(t.longitude),
        speed: Number(t.speed),
        heading: Number(t.heading),
        occupancyStatus: t.occupancyStatus as TelemetryMessage['occupancyStatus']
      }));
      setTelemetryLog(transformed);
    }
  }, [telemetryData]);

  // Client-side live feed updates for smooth UI
  useEffect(() => {
    if (vehicles.length === 0) return;

    const interval = setInterval(() => {
      setVehicles(prev => prev.map(vehicle => {
        // Smooth position interpolation
        const newX = vehicle.position.x + (Math.random() - 0.5) * 1.5;
        const newY = vehicle.position.y + (Math.random() - 0.5) * 1.5;
        
        return {
          ...vehicle,
          position: {
            x: Math.max(5, Math.min(95, newX)),
            y: Math.max(10, Math.min(95, newY))
          },
          speed: Math.max(20, Math.min(60, vehicle.speed + (Math.random() - 0.5) * 5)),
          eta: Math.max(1, vehicle.eta - (Math.random() > 0.9 ? 1 : 0))
        };
      }));
      
      setLastUpdated(new Date());

      // Generate telemetry for random vehicle
      if (vehicles.length > 0) {
        const randomVehicle = vehicles[Math.floor(Math.random() * vehicles.length)];
        const occupancyMap: Record<Vehicle['crowding'], TelemetryMessage['occupancyStatus']> = {
          low: 'MANY_SEATS_AVAILABLE',
          medium: 'FEW_SEATS_AVAILABLE',
          high: 'STANDING_ROOM_ONLY'
        };

        const telemetry: TelemetryMessage = {
          vehicleId: randomVehicle.id,
          timestamp: new Date(),
          latitude: 40.7128 + (randomVehicle.position.y - 50) / 1000,
          longitude: -74.0060 + (randomVehicle.position.x - 50) / 1000,
          speed: randomVehicle.speed,
          heading: randomVehicle.heading,
          occupancyStatus: occupancyMap[randomVehicle.crowding]
        };

        setTelemetryLog(prev => [telemetry, ...prev.slice(0, 49)]);
      }
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, [vehicles.length]);

  const dismissAlert = useCallback(async (alertId: string) => {
    await dismissAlertMutation.mutateAsync(alertId);
  }, [dismissAlertMutation]);

  return {
    vehicles,
    alerts: alerts.filter(a => a.active),
    telemetryLog,
    routes,
    isLoading: vehiclesLoading,
    isLive,
    lastUpdated,
    dismissAlert
  };
}
