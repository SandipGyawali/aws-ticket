import { Container, Injectable, Module } from "./helpers/helpers.di";
import { Database } from "./lib/database";
import { CsvToJsonModule } from "./modules/csv2json.module";
import { JwtModule } from "./modules/jwt.module";
import { SessionModule } from "./modules/session.module";
import { UploadModule } from "./modules/upload.module";

@Module([
  {
    token: CsvToJsonModule.NAME,
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
      return Container.resolve(Database);
    },
  },
  {
    token: SessionModule.NAME,
    useFactory: () => Container.resolve(SessionModule).route.configure(),
  },
  {
    token: UploadModule.NAME,
    useFactory: () => Container.resolve(UploadModule).route.configure(),
  },
])
@Injectable()
export class AppModule {
  constructor(){
    
  }
}
