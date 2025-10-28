import type { Application, Router } from "express";
import { Container } from "./helpers/helpers.di";
import { SessionModule } from "./modules/session.module";

export function appRoutes(app: Application): void {
  app.use("/api/session", Container.resolve<Router>(SessionModule.NAME));
}
