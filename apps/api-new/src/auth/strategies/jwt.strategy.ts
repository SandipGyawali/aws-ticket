import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../auth.service';
import { ROLE } from 'src/users/entities/user.entity';

export interface AuthUser {
  username: string;
  role: ROLE;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET") || "",
    });
  }

  async validate(payload: JwtPayload): Promise<AuthUser> {
    return {
      username: payload.sub,
      role: payload.role
    };
  }
}


