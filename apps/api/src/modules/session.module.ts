import { SessionController } from "../controllers/session.controller";
import { Inject, Injectable, Module } from "../helpers/helpers.di";
import { SessionRoute } from "../routes/session.route";
import { SessionService } from "../services/session.service";

@Module([
  {
    token: SessionService.NAME,
    useClass: SessionService,
  },
  {
    token: SessionController.NAME,
    useClass: SessionController,
  },
  {
    token: SessionRoute.NAME,
    useClass: SessionRoute,
  },
])
@Injectable()
export class SessionModule {
  static NAME = "SessionModule";
  constructor(@Inject(SessionRoute.NAME) public route: SessionRoute) {}
}
