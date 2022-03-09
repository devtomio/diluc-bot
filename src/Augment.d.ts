import type Redis from 'ioredis';
import type { REST } from '@discordjs/rest';

declare module '@sapphire/pieces' {
	interface Container {
		redis: Redis.Redis;
		rest: REST;
	}
}

declare module '@sapphire/framework' {
	interface ScheduledTasks {
		remind: never;
	}
}

declare module 'ioredis' {
	interface Redis {
		fuzzySearch: (name: string, search: string) => Promise<string>;
	}
}
