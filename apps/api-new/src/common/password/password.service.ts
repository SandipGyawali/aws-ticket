import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  saltRounds: number

  constructor(private configService: ConfigService){
    const salt = this.configService.get<string>("SALT_ROUNDS")
    if(!salt){
      throw new Error("Salt not defined in .env")
    }
    this.saltRounds = parseInt(salt)
    console.log("Salt: ", this.saltRounds)
    console.log("Type: ", typeof(this.saltRounds))
  }

  /**
   * Hash a plain text password
   * @param password - Plain text password to hash
   * @returns Hashed password
   */
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  /**
   * Compare a plain text password with a hashed password
   * @param password - Plain text password
   * @param hashedPassword - Hashed password to compare against
   * @returns True if passwords match, false otherwise
   */
  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}

