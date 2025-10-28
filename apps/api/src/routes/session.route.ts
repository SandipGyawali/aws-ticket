import { SessionController } from "../controllers/session.controller";
import { Inject, Route, Router } from "../helpers/helpers.di";

@Route()
export class SessionRoute {
  static NAME = "SessionRoute";
  public router: Router;

  constructor(
    @Inject(SessionController.NAME) private controller: SessionController
  ) {
    this.router = Router({
      strict: true,
      caseSensitive: true,
    });
  }

  routes(): void {
    this.router.get("/", this.controller.get);
    this.router.post("/add", this.controller.add);
    this.router.put("/update", this.controller.update);
    this.router.delete("/delete", this.controller.delete);
  }

  configure(): Router {
    this.routes();
    return this.router;
  }
}
