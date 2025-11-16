import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUser } from '../strategies/jwt.strategy';

export const GetUser = createParamDecorator(
  (data: keyof AuthUser | undefined, ctx: ExecutionContext): AuthUser | any => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
