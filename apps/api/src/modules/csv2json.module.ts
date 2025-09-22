import { Injectable, Module } from "../helpers/helpers.di";
import { CsvToJsonService } from "../services/csv2json.service";

@Module([
  {
    token: CsvToJsonService.NAME,
    useClass: CsvToJsonService,
  },
])
@Injectable()
export class CsvToJsonModule {
  static NAME = "CsvToJsonModule";
  constructor() {}
}
