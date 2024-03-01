import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import configuration from 'config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ApiModule,
    PrismaModule,
  ],
})
export class AppModule {}
