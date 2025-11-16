import { Inject, Service } from "../helpers/helpers.di";
import { JwtService } from "./jwt.service";
import { Database } from "../lib/database";
import type { PgDatabase } from "../../@types/db.type";

import { ENVIRONMENT } from "@aws-ticket/env/server";
import { eq } from "drizzle-orm";

type UserBasicInfo = {
  first_name: string,
  last_name: string,
  email: string
}

@Service()
export class Attendees {

  constructor(
    @Inject(JwtService.NAME) private readonly jwt: JwtService,
    @Inject(Database.NAME) private readonly db: PgDatabase
  ) { }

  private generate_onboard_token(user_info: UserBasicInfo) {
    const token = this.jwt.sign(user_info, ENVIRONMENT.JWT_SECRET)
    return token
  }

  verify_onboard_token(token: string): UserBasicInfo | null {
    const result = this.jwt.verify(token, "access")

    if (result == null) return result;
    const basic_info = result as UserBasicInfo

    if (!(basic_info.email && basic_info.last_name && basic_info.first_name)) return null;

    return basic_info
  }

  async check_onboard_status(token: string) {
    const basic_info = this.verify_onboard_token(token)

    if (basic_info == null) return null;


    const attendeeResult = this.db.query.attendees.findFirst({
      where: (attendee) => eq(attendee.email, basic_info.email)
    })

  }

  public register() { }

  // process the csv data to object to insert into the database
  public migrate() { }
}





