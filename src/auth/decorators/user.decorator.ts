
import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
  
    const request = ctx.switchToHttp().getRequest();
    
    if ( !request.user ) {
        throw new InternalServerErrorException(`user not found in request (authGuard called?)`)
    }
		
    return request.user;
  },
);

