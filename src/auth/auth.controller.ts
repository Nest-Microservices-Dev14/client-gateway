import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVERS } from 'src/config/service';
import { LoginUserDto } from './dto/login.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators/user.decorator';
import { CurrentUser } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        @Inject(NATS_SERVERS) private readonly client: ClientProxy
    ) { }

    @Post('register')
    async register(@Body() registerUserDto: RegisterUserDto) {
        return this.client.send('auth.register.user', registerUserDto).pipe(
            catchError( (error) => {
                throw new RpcException(error);
            })
        );
    }

    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
        return this.client.send('auth.login.user', loginUserDto).pipe(
            catchError( (error) => {
                throw new RpcException(error);
            })
        );
    }

    @UseGuards(AuthGuard)
    @Get('verify')
    async verify(@User() user: CurrentUser, @Token() token: string) {
        return {
            user,
            token
        };
    }

}
