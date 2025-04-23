import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { NATS_SERVERS } from 'src/config/service';
import { LoginUserDto } from './dto/login.user.dto';
import { RegisterUserDto } from './dto/register.user.dto';

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

    @Get('verify')
    async verify() {
        const response = await firstValueFrom(
            this.client.send('auth.verify.user', {})
        )
        return {
            response
        }
    }

}
