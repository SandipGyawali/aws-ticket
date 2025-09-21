import { Controller, Inject } from "../helpers/helpers.di";
import type { CsvToJsonService } from "../services/csv2json.service";

@Controller()
export class AttendeesController {
  constructor(
    @Inject("CsvToJsonService")
    private readonly csvJsonService: CsvToJsonService
  ) {}
}
