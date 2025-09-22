import { Injectable, Module } from "../helpers/helpers.di";
import { CsvToJsonService } from "../services/csv2json.service";
import { JwtService } from "../services/jwt.service";

@Module([
  {
    token: JwtService.NAME,
    useClass: JwtService,
  },
])
@Injectable()
export class JwtModule {
  static NAME = "JwtModule";
  constructor() {}
}
