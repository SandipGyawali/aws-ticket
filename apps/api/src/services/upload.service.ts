import { Injectable, Inject } from "../helpers/helpers.di";
import { Database } from "../lib/database";
import { CsvToJsonService } from "./csv2json.service";
import { attendees, type AttendeesSchema } from "../models/attendees";

@Injectable()
export class UploadService {
  static NAME = "UploadService";

  constructor(
    @Inject(Database.NAME) private readonly database: Database,
    @Inject(CsvToJsonService.NAME)
    private readonly csvJsonService: CsvToJsonService
  ) {}

  /**
   * Process and seed CSV data into the attendees table
   * @param fileBuffer - The uploaded CSV file buffer
   * @returns Promise with the result of the operation
   */
  async processAndSeedCSV(fileBuffer: Buffer): Promise<{
    success: boolean;
    message: string;
    inserted: number;
    errors?: any[];
  }> {
    try {
      // Parse CSV to JSON
      const parsedData = await this.csvJsonService.parseBuffer(fileBuffer);

      if (!parsedData || parsedData.length === 0) {
        return {
          success: false,
          message: "No data found in CSV file",
          inserted: 0,
        };
      }

      // Transform and validate data
      const validRecords: any[] = [];
      const errors: any[] = [];

      for (let i = 0; i < parsedData.length; i++) {
        const row = parsedData[i];
        try {
          // Map CSV columns to database schema
          const record = {
            first_name: row.first_name || row.firstName || row.FirstName,
            last_name: row.last_name || row.lastName || row.LastName,
            email: row.email || row.Email,
            phone: row.phone || row.Phone || null,
            food_preference: row.food_preference || row.foodPreference || null,
            session_choice: row.session_choice || row.sessionChoice || null,
            checked_in: row.checked_in || row.checkedIn || false,
            check_in_time: row.check_in_time || row.checkInTime || null,
            lunch: row.lunch || false,
            lunch2: row.lunch2 || false,
          };

          // Basic validation
          if (!record.first_name || !record.last_name || !record.email) {
            errors.push({
              row: i + 1,
              data: row,
              error: "Missing required fields: first_name, last_name, or email",
            });
            continue;
          }

          validRecords.push(record);
        } catch (error) {
          errors.push({
            row: i + 1,
            data: row,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      // Insert valid records into database
      
      const db = this.database.getClient();
      let insertedCount = 0;

      if (validRecords.length > 0) {
        try {
          // Batch insert with conflict handling
          const result = await db
            .insert(attendees)
            .values(validRecords)
            .onConflictDoNothing({ target: attendees.email })
            .returning();

          insertedCount = result.length;
        } catch (dbError) {
          console.error("Database insertion error:", dbError);
          return {
            success: false,
            message: "Failed to insert data into database",
            inserted: 0,
            errors: [
              {
                error:
                  dbError instanceof Error
                    ? dbError.message
                    : "Database error",
              },
            ],
          };
        }
      }

      return {
        success: true,
        message: `Successfully processed ${insertedCount} records out of ${parsedData.length}`,
        inserted: insertedCount,
        errors: errors.length > 0 ? errors : undefined,
      };
    } catch (error) {
      console.error("CSV processing error:", error);
      return {
        success: false,
        message: "Failed to process CSV file",
        inserted: 0,
        errors: [
          {
            error: error instanceof Error ? error.message : "Unknown error",
          },
        ],
      };
    }
  }
}
