import 'dotenv/config';
import * as joi from "joi";

interface EnvVars {
    PORT: number,
    NATS_SERVERS: string[],
    ordersMicroserviceHost: string,
    ordersMicroservicePort: number,
}

const envsSchema = joi.object({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.array().items( joi.string() ).required(),
    ordersMicroserviceHost: joi.string().required(),
    ordersMicroservicePort: joi.number().required(),
})
.unknown(true);

const { error, value } = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if ( error ) throw new Error(`Config validation error: ${ error.message }`);

const envVars: EnvVars = value;

export const envs = {
    PORT: envVars.PORT,
    natsServer: envVars.NATS_SERVERS,
    ordersMicroserviceHost: envVars.ordersMicroserviceHost,
    ordersMicroservicePort: envVars.ordersMicroservicePort
}