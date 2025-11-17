import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthInputDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/common/password/password.service';
import { ROLE, User } from 'src/users/entities/user.entity';


type AuthResult = {
  accessToken: string,
  username: string,
}

export type JwtPayload = {
  sub: string,
  role: ROLE
}

@Injectable()
export class AuthService {

  constructor(private userService: UsersService, private jwtService: JwtService, private passwordService: PasswordService) {
  }

  async signIn(user: User): Promise<AuthResult> {

    const tokenPayload: JwtPayload = {
      sub: user.username,
      role: user.role
    }
    const accessToken = await this.jwtService.signAsync(tokenPayload)

    return {
      accessToken: accessToken,
      username: user.username
    }
  }

  async validateUser(input: AuthInputDto): Promise<User | null> {
    const user = await this.userService.findByUsername(input.username)

    if (!user) {
      return null
    }

    const isValid = await this.passwordService.comparePasswords(input.password, user.password)

    if (!isValid) {
      return null;
    }

    return user;
  }

}
