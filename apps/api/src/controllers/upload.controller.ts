import { Controller, Inject } from "../helpers/helpers.di";
import { UploadService } from "../services/upload.service";
import type { Request, Response } from "express";
import { HttpStatusCode } from "../../config/http-status-code";

@Controller()
export class UploadController {
  static NAME = "UploadController";

  constructor(
    @Inject(UploadService.NAME)
    private readonly uploadService: UploadService
  ) {}

  upload = async (req: Request, res: Response): Promise<void> => {
    try {
      // Check if file was uploaded
      if (!req.file) {
        res.status(HttpStatusCode.BAD_REQUEST_400).json({
          success: false,
          message: "No file uploaded",
        });
        return;
      }

      // Validate file type
      // if (req.file.mimetype !== "text/csv") {
      //   res.status(HttpStatusCode.BAD_REQUEST_400).json({
      //     success: false,
      //     message: "Invalid file type. Only CSV files are allowed",
      //   });
      //   return;
      // }

      // Process the CSV file
      const result = await this.uploadService.processAndSeedCSV(req.file.buffer);

      if (result.success) {
        res.status(HttpStatusCode.OK_200).json(result);
      } else {
        res.status(HttpStatusCode.BAD_REQUEST_400).json(result);
      }
    } catch (error) {
      console.error("Upload error:", error);
      res.status(HttpStatusCode.INTERNAL_SERVER_ERROR_500).json({
        success: false,
        message: "Internal server error while processing upload",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
}
