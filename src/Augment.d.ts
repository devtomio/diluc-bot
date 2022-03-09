import type Redis from 'ioredis';
import type { REST } from '@discordjs/rest';
import type { PrismaClient } from '@prisma/client';

declare module '@sapphire/pieces' {
	interface Container {
		redis: Redis.Redis;
		rest: REST;
		db: PrismaClient;
	}
}

declare module '@sapphire/framework' {
	interface ScheduledTasks {
		remind: never;
	}
}
