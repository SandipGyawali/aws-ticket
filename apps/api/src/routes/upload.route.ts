import { UploadController } from "../controllers/upload.controller";
import { Inject, Route, Router } from "../helpers/helpers.di";
import multer from "multer";

@Route()
export class UploadRoute {
  static NAME = "UploadRoute";
  public router: Router;
  private upload: multer.Multer;

  constructor(
    @Inject(UploadController.NAME) private controller: UploadController
  ) {
    this.router = Router({
      strict: true,
      caseSensitive: true,
    });

    // Configure multer for memory storage
    this.upload = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
      // fileFilter: (req, file, cb) => {
      //   // Only accept CSV files
      //   console.log(file.originalname.endsWith((".csv")))
      //   if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      //     cb(null, true);
      //   } else {
      //     cb(new Error("Only CSV files are allowed"));
      //   }
      // },
    });
  }

  routes(): void {
    // POST /upload - Upload CSV file
    this.router.post("/upload", this.upload.single("file"), this.controller.upload);
  }

  configure(): Router {
    this.routes();
    return this.router;
  }
}
