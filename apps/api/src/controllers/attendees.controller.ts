import { Controller, Inject } from "../helpers/helpers.di";
import { CsvToJsonService } from "../services/csv2json.service";

@Controller()
export class AttendeesController {
  constructor(
    @Inject(CsvToJsonService.name)
    private readonly csvJsonService: CsvToJsonService
  ) {}
}
