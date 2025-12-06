import { Vehicle, Stop, Route, Alert, LineColor } from '@/types/transit';

export const routes: Route[] = [
  {
    id: 'route-red',
    name: 'Red Line',
    lineColor: 'red',
    stops: ['central', 'downtown', 'midtown', 'uptown', 'northgate'],
    path: [
      { x: 15, y: 85 }, { x: 25, y: 70 }, { x: 40, y: 55 }, { x: 55, y: 40 }, { x: 70, y: 20 }
    ]
  },
  {
    id: 'route-blue',
    name: 'Blue Line',
    lineColor: 'blue',
    stops: ['westend', 'parkside', 'downtown', 'eastside', 'harbor'],
    path: [
      { x: 10, y: 50 }, { x: 25, y: 55 }, { x: 40, y: 55 }, { x: 60, y: 55 }, { x: 85, y: 50 }
    ]
  },
  {
    id: 'route-green',
    name: 'Green Line',
    lineColor: 'green',
    stops: ['southgate', 'riverside', 'downtown', 'financial', 'airport'],
    path: [
      { x: 30, y: 90 }, { x: 35, y: 75 }, { x: 40, y: 55 }, { x: 50, y: 40 }, { x: 80, y: 25 }
    ]
  },
  {
    id: 'route-orange',
    name: 'Orange Line',
    lineColor: 'orange',
    stops: ['industrial', 'central', 'civic', 'university', 'research'],
    path: [
      { x: 5, y: 70 }, { x: 15, y: 85 }, { x: 30, y: 65 }, { x: 50, y: 70 }, { x: 75, y: 75 }
    ]
  }
];

export const stops: Stop[] = [
  { id: 'central', name: 'Central Station', position: { x: 15, y: 85 }, lines: ['red', 'orange'], type: 'station' },
  { id: 'downtown', name: 'Downtown', position: { x: 40, y: 55 }, lines: ['red', 'blue', 'green'], type: 'station' },
  { id: 'midtown', name: 'Midtown', position: { x: 55, y: 40 }, lines: ['red'], type: 'stop' },
  { id: 'uptown', name: 'Uptown', position: { x: 70, y: 20 }, lines: ['red'], type: 'stop' },
  { id: 'northgate', name: 'Northgate', position: { x: 70, y: 20 }, lines: ['red'], type: 'station' },
  { id: 'westend', name: 'West End', position: { x: 10, y: 50 }, lines: ['blue'], type: 'stop' },
  { id: 'parkside', name: 'Parkside', position: { x: 25, y: 55 }, lines: ['blue'], type: 'stop' },
  { id: 'eastside', name: 'Eastside', position: { x: 60, y: 55 }, lines: ['blue'], type: 'stop' },
  { id: 'harbor', name: 'Harbor Terminal', position: { x: 85, y: 50 }, lines: ['blue'], type: 'station' },
  { id: 'southgate', name: 'Southgate', position: { x: 30, y: 90 }, lines: ['green'], type: 'station' },
  { id: 'riverside', name: 'Riverside', position: { x: 35, y: 75 }, lines: ['green'], type: 'stop' },
  { id: 'financial', name: 'Financial District', position: { x: 50, y: 40 }, lines: ['green'], type: 'stop' },
  { id: 'airport', name: 'Airport', position: { x: 80, y: 25 }, lines: ['green'], type: 'station' },
  { id: 'industrial', name: 'Industrial Park', position: { x: 5, y: 70 }, lines: ['orange'], type: 'stop' },
  { id: 'civic', name: 'Civic Center', position: { x: 30, y: 65 }, lines: ['orange'], type: 'stop' },
  { id: 'university', name: 'University', position: { x: 50, y: 70 }, lines: ['orange'], type: 'station' },
  { id: 'research', name: 'Research Campus', position: { x: 75, y: 75 }, lines: ['orange'], type: 'stop' },
];

export const initialVehicles: Vehicle[] = [
  {
    id: 'v-red-001',
    routeId: 'route-red',
    lineName: 'Red Line',
    lineColor: 'red',
    position: { x: 20, y: 77 },
    heading: 45,
    speed: 35,
    crowding: 'medium',
    nextStop: 'Downtown',
    eta: 3,
    status: 'on-time',
    passengerCount: 89,
    capacity: 150
  },
  {
    id: 'v-red-002',
    routeId: 'route-red',
    lineName: 'Red Line',
    lineColor: 'red',
    position: { x: 62, y: 32 },
    heading: 45,
    speed: 28,
    crowding: 'low',
    nextStop: 'Northgate',
    eta: 5,
    status: 'early',
    passengerCount: 42,
    capacity: 150
  },
  {
    id: 'v-blue-001',
    routeId: 'route-blue',
    lineName: 'Blue Line',
    lineColor: 'blue',
    position: { x: 18, y: 52 },
    heading: 90,
    speed: 42,
    crowding: 'high',
    nextStop: 'Parkside',
    eta: 2,
    status: 'delayed',
    passengerCount: 145,
    capacity: 150
  },
  {
    id: 'v-blue-002',
    routeId: 'route-blue',
    lineName: 'Blue Line',
    lineColor: 'blue',
    position: { x: 72, y: 53 },
    heading: 90,
    speed: 38,
    crowding: 'low',
    nextStop: 'Harbor Terminal',
    eta: 4,
    status: 'on-time',
    passengerCount: 56,
    capacity: 150
  },
  {
    id: 'v-green-001',
    routeId: 'route-green',
    lineName: 'Green Line',
    lineColor: 'green',
    position: { x: 32, y: 82 },
    heading: 30,
    speed: 45,
    crowding: 'medium',
    nextStop: 'Riverside',
    eta: 1,
    status: 'on-time',
    passengerCount: 78,
    capacity: 150
  },
  {
    id: 'v-green-002',
    routeId: 'route-green',
    lineName: 'Green Line',
    lineColor: 'green',
    position: { x: 65, y: 32 },
    heading: 30,
    speed: 52,
    crowding: 'low',
    nextStop: 'Airport',
    eta: 6,
    status: 'on-time',
    passengerCount: 34,
    capacity: 150
  },
  {
    id: 'v-orange-001',
    routeId: 'route-orange',
    lineName: 'Orange Line',
    lineColor: 'orange',
    position: { x: 22, y: 75 },
    heading: 120,
    speed: 30,
    crowding: 'high',
    nextStop: 'Civic Center',
    eta: 3,
    status: 'delayed',
    passengerCount: 138,
    capacity: 150
  },
  {
    id: 'v-orange-002',
    routeId: 'route-orange',
    lineName: 'Orange Line',
    lineColor: 'orange',
    position: { x: 62, y: 72 },
    heading: 90,
    speed: 35,
    crowding: 'medium',
    nextStop: 'Research Campus',
    eta: 5,
    status: 'on-time',
    passengerCount: 95,
    capacity: 150
  }
];

export const initialAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'delay',
    severity: 'warning',
    title: 'Blue Line Delays',
    description: 'Signal issues at Downtown causing 5-10 minute delays on Blue Line service.',
    affectedLines: ['blue'],
    timestamp: new Date(Date.now() - 15 * 60000),
    active: true
  },
  {
    id: 'alert-2',
    type: 'crowding',
    severity: 'info',
    title: 'High Crowding Expected',
    description: 'Rush hour traffic expected. Consider alternative routes via Green Line.',
    affectedLines: ['red', 'blue'],
    timestamp: new Date(Date.now() - 30 * 60000),
    active: true
  },
  {
    id: 'alert-3',
    type: 'maintenance',
    severity: 'info',
    title: 'Weekend Maintenance',
    description: 'Orange Line will run reduced service this weekend for track maintenance.',
    affectedLines: ['orange'],
    timestamp: new Date(Date.now() - 120 * 60000),
    active: true
  },
  {
    id: 'alert-4',
    type: 'disruption',
    severity: 'critical',
    title: 'Service Suspension',
    description: 'Green Line service suspended between Airport and Financial due to power outage.',
    affectedLines: ['green'],
    timestamp: new Date(Date.now() - 5 * 60000),
    active: true
  }
];

export const lineColors: Record<LineColor, string> = {
  red: 'bg-line-red',
  blue: 'bg-line-blue',
  green: 'bg-line-green',
  orange: 'bg-line-orange',
  purple: 'bg-line-purple',
  yellow: 'bg-line-yellow'
};

export const lineTextColors: Record<LineColor, string> = {
  red: 'text-line-red',
  blue: 'text-line-blue',
  green: 'text-line-green',
  orange: 'text-line-orange',
  purple: 'text-line-purple',
  yellow: 'text-line-yellow'
};
