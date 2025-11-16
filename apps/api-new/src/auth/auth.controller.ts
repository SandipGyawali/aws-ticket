import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public-auth.decorator';
import { AuthInputDto } from './dto/auth.dto';
import { GetUser } from './decorators/get-user.decorator';
import type { AuthUser } from './strategies/jwt.strategy';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post("login")
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginInfo: AuthInputDto, @Request() req) {
    return this.authService.signIn(req.user)
  }

  @Get("me")
  @ApiBearerAuth('jwt')
  me(@GetUser() user: AuthUser) {
    return {
      userId: user.username,
      roles: user.role
    };
  }

}
