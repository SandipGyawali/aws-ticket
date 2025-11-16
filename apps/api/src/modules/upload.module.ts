import { UploadController } from "../controllers/upload.controller";
import { Inject, Injectable, Module } from "../helpers/helpers.di";
import { UploadRoute } from "../routes/upload.route";
import { UploadService } from "../services/upload.service";

@Module([
  {
    token: UploadService.NAME,
    useClass: UploadService,
  },
  {
    token: UploadController.NAME,
    useClass: UploadController,
  },
  {
    token: UploadRoute.NAME,
    useClass: UploadRoute,
  },
])
@Injectable()
export class UploadModule {
  static NAME = "UploadModule";
  constructor(@Inject(UploadRoute.NAME) public route: UploadRoute) {}
}
