# 🚇 Metro Transit Control — City-Scale Real-Time Transit Tracking & ETA System

A high-availability, low-latency transit intelligence platform designed to monitor real-time vehicle movements, predict ETAs, analyze crowding, and manage service alerts across a metropolitan transit network.

---

## 🔍 Overview

Metro Transit Control simulates a production-style transit operations dashboard that supports:

- Real-time vehicle tracking  
- Accurate ETA predictions  
- Crowding indicators  
- Service alert broadcasting  
- Telemetry ingest and smoothing  

Although running as a simplified fullstack app, the architecture reflects real-world city-scale distributed transit systems.

---

## 🎯 Problem Statement

Modern transit agencies require:

- City-wide real-time visibility of buses/trains  
- Low-latency ETA predictions (<200ms)  
- Crowding analysis  
- Route health monitoring  
- Fault-tolerant telemetry pipelines  
- Scalable, multi-tenant architecture  

Legacy systems often break during peak hours.  
Metro Transit Control models a **microservices + event-driven + geo-indexed** architecture capable of handling these needs.

---

# 🚀 Key Features

### 🛰 Real-Time Vehicle Tracking
- Smooth position interpolation  
- Multiple lines (Red, Blue, Green, Orange)  
- Geo-indexed stop lookup  

### ⏱ ETA Prediction Engine
- Strategy Pattern for pluggable ETA algorithms  
- Distance, congestion, speed model support  

### 👥 Passenger Load & Crowding
- Real-time passenger counts  
- Crowding badges (Low / Medium / High)  

### ⚠ Alerts & Incident Management
- Operator-triggered alerts  
- Auto-broadcast via Observer Pattern  
- Delay, congestion, closure, reroute alerts  

### 📡 Telemetry Engine
- Simulated GTFS-Realtime feed  
- Time-series storage  
- Jitter smoothing + debouncing  

### 🌍 City-Scale Architectural Modeling
- High availability concepts  
- Caching layer (Redis conceptual)  
- Multi-city deployments  

---

# 🏛 Architecture (Conceptual)

```text
                    +-------------------------+
                    |       API Gateway       |
                    +-----------+-------------+
                                |
          ---------------------------------------------------
          |                         |                         |
+---------+---------+   +-----------+-----------+   +---------+---------+
|  Route Service    |   | Telemetry Ingest Svc  |   | Alerts Service     |
|  (PostGIS / ORM)  |   |  (GTFS-RT/Kafka Sim)  |   | (Doc Store + CQRS) |
+---------+---------+   +-----------+-----------+   +---------+---------+
          |                         |                         |
          ---------------------------                         |
                       |                                      |
               +-------+-------+                              |
               |  Redis Cache  |   <-- read-optimized         |
               +-------+-------+                              |
                       |                                      |
                +------+--------+                             |
                |  Frontend UI  | <----------------------------
                +---------------+
```

---

# 🧠 Design Patterns Used

- **Strategy Pattern** — for ETA models  
- **Observer Pattern** — for alerts broadcasting  
- **CQRS** — separating telemetry writes + read queries  
- **Circuit Breaker** — prevents overload spikes  
- **Bulkhead Isolation** — isolates services  

---

# 🛠 Tech Stack

### **Frontend**
- React + TypeScript  
- Tailwind CSS + Shadcn UI  
- Wouter  
- TanStack Query  

### **Backend**
- Express.js + TypeScript  
- PostgreSQL + Drizzle ORM  
- Vite middleware  
- Custom GTFS-like telemetry simulator  

### **Data Layer**
- Relational tables (routes, stops, vehicles)  
- JSONB alert documents  
- Time-series telemetry tables  

---

# 📁 Project Structure

```
├── client/
│   └── src/
│       ├── components/
│       │   ├── transit/
│       │   └── ui/
│       ├── hooks/
│       ├── pages/
│       ├── data/
│       ├── types/
│       └── lib/
│
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── db.ts
│   ├── seed.ts
│   ├── vite.ts
│
└── shared/
    └── schema.ts
```

---

# 🔗 API Endpoints

### **Routes**
`GET /api/routes` — fetch all transit routes  

### **Vehicle Data**
`GET /api/vehicles` — live vehicle positions  
`PATCH /api/vehicles/:id` — update vehicle  

### **Telemetry**
`GET /api/telemetry` — recent telemetry  

### **Alerts**
`GET /api/alerts` — active alerts  
`PATCH /api/alerts/:id` — update/dismiss  

---

# 🧪 Development Commands

| Command | Description |
|--------|-------------|
| `npm run dev` | Start fullstack dev mode |
| `npm run build` | Build production bundle |
| `npm run start` | Run in production |
| `npm run db:push` | Push schema to DB |

---

# ⭐ Recent Improvements (Dec 2025)

### UI Updates
- Removed dev-only controls  
- Added professional "LIVE" indicator  
- Updated favicon  
- Cleaned labels and top-bar  

### Backend Updates
- Migrated from Supabase → Replit Stack  
- Drizzle ORM integration  
- Improved smoothing on vehicle motion  

---

# 🚧 Future Enhancements

- ML-based predictive ETA  
- Peak-hour congestion modeling  
- Route deviation detection  
- Admin dashboard for multi-city ops  
- Kafka-based ingest pipeline  
- Fleet health analytics  

---

# 🏁 Conclusion

Metro Transit Control blends real-time telemetry, distributed-systems design principles, and UI engineering to simulate a modern city-scale transit intelligence system.  
It demonstrates scalable architecture, efficient data handling, and production-style design approaches suitable for academic evaluation and real-world inspiration.
