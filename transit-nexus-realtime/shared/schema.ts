import { pgTable, text, numeric, timestamp, boolean, integer, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const routes = pgTable("routes", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  color: text("color").notNull().default("#3B82F6"),
  type: text("type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const stops = pgTable("stops", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  positionX: numeric("position_x").notNull(),
  positionY: numeric("position_y").notNull(),
  routeIds: text("route_ids").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const vehicles = pgTable("vehicles", {
  id: text("id").primaryKey(),
  routeId: text("route_id").references(() => routes.id),
  positionX: numeric("position_x").notNull(),
  positionY: numeric("position_y").notNull(),
  heading: numeric("heading").notNull().default("0"),
  speed: numeric("speed").notNull().default("0"),
  status: text("status").notNull().default("on-time"),
  crowding: text("crowding").notNull().default("low"),
  passengerCount: integer("passenger_count").notNull().default(0),
  nextStop: text("next_stop"),
  eta: integer("eta").notNull().default(0),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const alerts = pgTable("alerts", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: text("type").notNull(),
  severity: text("severity").notNull(),
  title: text("title").notNull(),
  message: text("message").notNull(),
  affectedRoutes: text("affected_routes").array().notNull().default([]),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const telemetry = pgTable("telemetry", {
  id: uuid("id").primaryKey().defaultRandom(),
  vehicleId: text("vehicle_id").references(() => vehicles.id),
  latitude: numeric("latitude").notNull(),
  longitude: numeric("longitude").notNull(),
  speed: numeric("speed").notNull(),
  heading: numeric("heading").notNull(),
  occupancyStatus: text("occupancy_status").notNull(),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertRouteSchema = createInsertSchema(routes).omit({
  createdAt: true,
});
export const insertStopSchema = createInsertSchema(stops).omit({
  createdAt: true,
});
export const insertVehicleSchema = createInsertSchema(vehicles).omit({
  updatedAt: true,
});
export const insertAlertSchema = createInsertSchema(alerts).omit({
  id: true,
  createdAt: true,
});
export const insertTelemetrySchema = createInsertSchema(telemetry).omit({
  id: true,
  recordedAt: true,
});

export type Route = typeof routes.$inferSelect;
export type InsertRoute = z.infer<typeof insertRouteSchema>;
export type Stop = typeof stops.$inferSelect;
export type InsertStop = z.infer<typeof insertStopSchema>;
export type Vehicle = typeof vehicles.$inferSelect;
export type InsertVehicle = z.infer<typeof insertVehicleSchema>;
export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = z.infer<typeof insertAlertSchema>;
export type Telemetry = typeof telemetry.$inferSelect;
export type InsertTelemetry = z.infer<typeof insertTelemetrySchema>;
