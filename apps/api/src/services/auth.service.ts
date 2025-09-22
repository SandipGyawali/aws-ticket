import { Inject, Service } from "../helpers/helpers.di";
import { Database } from "../lib/database";
import type { PgDatabase } from "../../@types/db.type";
import { JwtService } from "./jwt.service";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

@Service()
export class AuthService {
  static NAME = "AuthService";

  constructor(
    @Inject(Database.NAME) private readonly db: PgDatabase,
    @Inject(JwtService.NAME) private readonly jwtService: JwtService
  ) {}

  public async login(input: { email: string; password: string }) {
    // check if user-exists
    const userExists = await this.db.query.user.findFirst({
      where: (user) => eq(user.email, input.email),
    });

    if (!userExists) {
      throw new Error("User Not found with the provided email");
    }

    // check if the user account exists
    const userAccount = await this.db.query.account.findFirst({
      where: (account) => eq(account.user_id, userExists.user_id),
    });

    if (!userAccount || !userAccount.password) {
      throw new Error("Account not found or missing password");
    }

    const isPasswordValid = await bcrypt.compare(
      input.password,
      userAccount.password
    );

    if (!isPasswordValid) {
      throw new Error("Password not matched");
    }

    const accessToken = this.jwtService.signAccessToken({});
    const refreshToken = this.jwtService.signRefreshToken({});

    return {};
  }

  public async me(userId: string) {
    const user = await this.db.query.user.findFirst({
      where: (user) => eq(user.user_id, userId),
    });

    if (!user) {
      throw new Error("User Not Found");
    }

    return user;
  }
}
