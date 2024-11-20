import { Module } from '@nestjs/common';
import { HttpModule as AxiosHttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        AxiosHttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                baseURL: configService.get('app.apiBaseUrl'),
                httpsAgent: new (require('https').Agent)({
                    rejectUnauthorized: false,
                }),
            }),
            inject: [ConfigService],
        }),
    ],
    exports: [AxiosHttpModule],
})
export class HttpModule { }