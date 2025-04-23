import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVERS } from 'src/config/service';

@Controller('auth')
export class AuthController {

    constructor(
        @Inject(NATS_SERVERS) private readonly client: ClientProxy
    ) { }

    @Post('register')
    async register() {
        const response = await firstValueFrom(
            this.client.send('auth.register.user', {})
        )
        return {
            response
        }
    }

    @Post('login')
    async login() {
        const response = await firstValueFrom(
            this.client.send('auth.login.user', {})
        )
        return {
            response
        }
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
