import { db } from "./db";
import { routes, vehicles, stops } from "@shared/schema";

const seedData = {
  routes: [
    { id: "red", name: "Red Line", shortName: "R", color: "#EF4444", type: "subway" },
    { id: "blue", name: "Blue Line", shortName: "B", color: "#3B82F6", type: "subway" },
    { id: "green", name: "Green Line", shortName: "G", color: "#22C55E", type: "bus" },
  ],
  vehicles: [
    { id: "V001", routeId: "red", positionX: "25", positionY: "30", heading: "90", speed: "45", status: "on-time", crowding: "medium", passengerCount: 75, nextStop: "Central Station", eta: 3 },
    { id: "V002", routeId: "red", positionX: "65", positionY: "70", heading: "270", speed: "38", status: "on-time", crowding: "low", passengerCount: 32, nextStop: "North Plaza", eta: 5 },
    { id: "V003", routeId: "blue", positionX: "40", positionY: "55", heading: "180", speed: "42", status: "delayed", crowding: "high", passengerCount: 120, nextStop: "East Terminal", eta: 7 },
    { id: "V004", routeId: "blue", positionX: "80", positionY: "25", heading: "0", speed: "50", status: "early", crowding: "low", passengerCount: 28, nextStop: "West End", eta: 2 },
    { id: "V005", routeId: "green", positionX: "50", positionY: "45", heading: "45", speed: "35", status: "on-time", crowding: "medium", passengerCount: 60, nextStop: "Main Street", eta: 4 },
    { id: "V006", routeId: "green", positionX: "15", positionY: "85", heading: "225", speed: "40", status: "on-time", crowding: "low", passengerCount: 25, nextStop: "South Bay", eta: 6 },
  ],
  stops: [
    { id: "S001", name: "Central Station", positionX: "50", positionY: "50", routeIds: ["red", "blue", "green"] },
    { id: "S002", name: "North Plaza", positionX: "50", positionY: "20", routeIds: ["red"] },
    { id: "S003", name: "East Terminal", positionX: "80", positionY: "50", routeIds: ["blue"] },
    { id: "S004", name: "West End", positionX: "20", positionY: "50", routeIds: ["blue"] },
    { id: "S005", name: "Main Street", positionX: "65", positionY: "35", routeIds: ["green"] },
    { id: "S006", name: "South Bay", positionX: "50", positionY: "80", routeIds: ["green"] },
  ],
};

async function seed() {
  console.log("Seeding database...");
  
  try {
    await db.insert(routes).values(seedData.routes).onConflictDoNothing();
    console.log("✓ Routes seeded");
    
    await db.insert(stops).values(seedData.stops).onConflictDoNothing();
    console.log("✓ Stops seeded");
    
    await db.insert(vehicles).values(seedData.vehicles).onConflictDoNothing();
    console.log("✓ Vehicles seeded");
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
  
  process.exit(0);
}

seed();
