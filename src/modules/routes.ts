import { Express } from "express";
import { default as CustomerRoutes } from "./customer/routes";
import { default as SeedRoutes } from "./seed/routes";

export default function (app: Express) {
  app.get("/", (req, res) => res.status(200).send({ message: "App Initiated" }));
  CustomerRoutes(app);
  SeedRoutes(app);
}
