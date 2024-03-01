import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'error' | 'warn' | 'query'>
  implements OnModuleInit
{
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });

    this.$on('error', (event) => {
      console.error('Prisma Error:', event);
    });

    this.$on('warn', (event) => {
      console.warn('Prisma Warn:', event);
    });

    this.$on('query', (event) => {
      if (!event.query.includes('SELECT')) {
        console.info('Prisma Query:', event);
      }
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
