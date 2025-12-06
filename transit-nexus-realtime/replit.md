# Metro Transit Control

A real-time transit tracking dashboard with live vehicle positions, ETA predictions, crowding indicators, and service alerts.

## Overview

This application provides a city-scale transit monitoring system featuring:
- Real-time vehicle tracking on an interactive map
- Multiple transit lines (Red, Blue, Green, Orange)
- Live vehicle position updates with smooth interpolation
- Passenger counting and crowding indicators
- Service alerts and delay tracking
- Telemetry feed for vehicle data

## Project Structure

```
├── client/src/           # Frontend React application
│   ├── components/       # UI components
│   │   ├── transit/      # Transit-specific components
│   │   └── ui/           # Shadcn UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── data/             # Static transit data
│   ├── types/            # TypeScript types
│   └── lib/              # Utilities
├── server/               # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   ├── db.ts             # Database connection
│   ├── vite.ts           # Vite middleware
│   └── seed.ts           # Database seeding
└── shared/               # Shared code between frontend/backend
    └── schema.ts         # Drizzle database schema
```

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Express.js, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter (client-side)
- **State Management**: TanStack Query

## API Endpoints

- `GET /api/routes` - Get all transit routes
- `GET /api/vehicles` - Get all vehicles with positions
- `GET /api/alerts` - Get active alerts
- `GET /api/telemetry` - Get recent telemetry data
- `PATCH /api/vehicles/:id` - Update vehicle data
- `PATCH /api/alerts/:id` - Update alert (e.g., dismiss)

## Development

The application runs on port 5000 in development mode with:
- Hot module reloading via Vite
- TypeScript compilation via tsx
- Database migrations via Drizzle Kit

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run db:push` - Push schema changes to database

## Recent Changes

- **December 5, 2025**: UI refinements for professional appearance
  - Removed development controls from header
  - Added "Live" status indicator with last updated timestamp
  - Replaced favicon with professional transit icon
  - Cleaned up UI text and labels

- **December 5, 2025**: Migrated from Lovable/Supabase to Replit environment
  - Replaced Supabase client with Drizzle ORM + PostgreSQL
  - Restructured project for Replit fullstack template
  - Updated frontend to use REST API instead of Supabase realtime
  - Added client-side live feed for smooth vehicle movements
