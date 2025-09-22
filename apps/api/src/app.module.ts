import { Container, Injectable, Module } from "./helpers/helpers.di";
import { Database } from "./lib/database";
import { CsvToJsonModule } from "./modules/csv2json.module";
import { JwtModule } from "./modules/jwt.module";

@Module([
  {
    token: JwtModule.NAME,
    useFactory: () => {
      return Container.resolve(CsvToJsonModule);
    },
  },
  {
    token: JwtModule.NAME,
    useFactory: () => {
      return Container.resolve(JwtModule);
    },
  },
  {
    token: Database.NAME,
    useFactory: () => {
      return Container.resolve(Database).getClient();
    },
  },
])
@Injectable()
export class AppModule {}
