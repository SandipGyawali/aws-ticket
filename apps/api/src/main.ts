import "reflect-metadata";
import "dotenv/config";
import express, { type Application } from "express";
import { ENVIRONMENT } from "@aws-ticket/env/server";
import { Container, Injectable } from "./helpers/helpers.di.ts";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { AppModule } from "./app.module.ts";
import { appRoutes } from "./app.routes.ts";

@Injectable()
class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.main();
  }

  private async main() {
    this.middlewares();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.disable("x-powered-by");
    Container.resolve<AppModule>(AppModule);
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    // shows the real origin IP
    this.app.enable("trust proxy");
    this.app.use(hpp({ checkBody: true, checkQuery: true }));
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: true,
      })
    );

    if (ENVIRONMENT["NODE_ENV"] === "development") {
      this.app.use(morgan("dev"));
    }
  }

  private routes(): void {
    appRoutes(this.app);
  }

  public listen() {
    this.app.listen(ENVIRONMENT.PORT, (err) => {
      if (err) {
        process.exit(1);
      }
      console.log(`Listening to the server ${ENVIRONMENT.PORT}`);
    });
  }
}

(function () {
  Container.resolve<App>(App).listen();
})();
