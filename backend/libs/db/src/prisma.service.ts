import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv';
import { join } from 'path';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy, OnModuleInit {
    constructor() {
        dotenv.config({ path: join(process.cwd(), '.env') });
        super()
    }
    async onModuleInit() {
        await this.$connect
    }
    async onModuleDestroy() {
        await this.$disconnect
    }
}