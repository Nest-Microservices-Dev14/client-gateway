import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthCheckController {

    @Get()
    HealthCheck(){
        return 'Client GateWay is up and running!!';
    }

}