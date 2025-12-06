import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { vehicles, routes, alerts, telemetry, insertVehicleSchema, insertAlertSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  app.get("/api/routes", async (_req, res) => {
    try {
      const allRoutes = await db.select().from(routes);
      res.json(allRoutes);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/vehicles", async (_req, res) => {
    try {
      const allVehicles = await db.select().from(vehicles);
      res.json(allVehicles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/alerts", async (_req, res) => {
    try {
      const activeAlerts = await db.select().from(alerts).where(eq(alerts.active, true));
      res.json(activeAlerts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/telemetry", async (_req, res) => {
    try {
      const recentTelemetry = await db
        .select()
        .from(telemetry)
        .orderBy(desc(telemetry.recordedAt))
        .limit(50);
      res.json(recentTelemetry);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.patch("/api/vehicles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertVehicleSchema.partial().parse(req.body);
      
      const [updated] = await db
        .update(vehicles)
        .set(validatedData)
        .where(eq(vehicles.id, id))
        .returning();
      
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/alerts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const validatedData = insertAlertSchema.partial().parse(req.body);
      
      const [updated] = await db
        .update(alerts)
        .set(validatedData)
        .where(eq(alerts.id, id))
        .returning();
      
      res.json(updated);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
