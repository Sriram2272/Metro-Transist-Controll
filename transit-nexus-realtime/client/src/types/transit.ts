export type LineColor = 'red' | 'blue' | 'green' | 'orange' | 'purple' | 'yellow';

export interface Vehicle {
  id: string;
  routeId: string;
  lineName: string;
  lineColor: LineColor;
  position: { x: number; y: number };
  heading: number;
  speed: number;
  crowding: 'low' | 'medium' | 'high';
  nextStop: string;
  eta: number; // minutes
  status: 'on-time' | 'delayed' | 'early';
  passengerCount: number;
  capacity: number;
}

export interface Stop {
  id: string;
  name: string;
  position: { x: number; y: number };
  lines: LineColor[];
  type: 'station' | 'stop';
}

export interface Route {
  id: string;
  name: string;
  lineColor: LineColor;
  stops: string[];
  path: { x: number; y: number }[];
}

export interface Alert {
  id: string;
  type: 'delay' | 'disruption' | 'maintenance' | 'weather' | 'crowding';
  severity: 'info' | 'warning' | 'critical';
  title: string;
  description: string;
  affectedLines: LineColor[];
  timestamp: Date;
  active: boolean;
}

export interface TelemetryMessage {
  vehicleId: string;
  timestamp: Date;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
  occupancyStatus: 'EMPTY' | 'MANY_SEATS_AVAILABLE' | 'FEW_SEATS_AVAILABLE' | 'STANDING_ROOM_ONLY' | 'CRUSHED_STANDING_ROOM_ONLY' | 'FULL';
}
