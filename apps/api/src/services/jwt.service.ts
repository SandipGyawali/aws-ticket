import { ENVIRONMENT } from "@aws-ticket/env/server";
import { Service } from "../helpers/helpers.di";
import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { RedisClient } from "bun";
import { redis as libRedis } from "../lib/redis";
import { randomBytes } from "crypto"

@Service()
export class JwtService {
  static NAME = "JwtService";
   
  private redis: Bun.RedisClient;

  constructor(redis: RedisClient) {
    this.redis = libRedis;
  }

  signAccessToken(payload: JwtPayload) {
    const accessToken = this.sign(
      { type: "access_token", ...payload },
      ENVIRONMENT.JWT_SECRET,
      { expiresIn: "15m" }
    );
    return accessToken;
  }

  async signRefreshToken(payload: JwtPayload) {
    const refreshToken = this.sign(
      { type: "refresh_token", ...payload },
      ENVIRONMENT.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    await this.redis.set(`refresh_tokens:${refreshToken}`, refreshToken, "EX", ENVIRONMENT.EXPIRY_MS);
    return refreshToken;
  }

  sign(payload: JwtPayload, secret: string, options?: SignOptions) {
    const issuedAtTime = this.getIssuedAtTime();
    const token = jwt.sign({ ...payload, iat: issuedAtTime }, secret, options);
    return token;
  }

  verify(token: string, type: "access" | "refresh"): JwtPayload | null {
    try {
      const secret =
        type == "access"
          ? ENVIRONMENT.JWT_SECRET
          : ENVIRONMENT.JWT_REFRESH_SECRET;
      return jwt.verify(token, secret) as JwtPayload;
    } catch (err) {
      return null;
    }
  }

  // returns the current issued at time in seconds format
  getIssuedAtTime() {
    return Math.floor(Date.now() / 1000);
  }
}
