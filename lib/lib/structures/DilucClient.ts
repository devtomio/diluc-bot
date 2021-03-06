import { SapphireClient, container, LogLevel } from '@sapphire/framework';
import Redis from 'ioredis';
import { Options } from 'discord.js';
import { ScheduledTaskRedisStrategy } from '@sapphire/plugin-scheduled-tasks/register-redis';
import { GatewayIntentBits } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';

export class DilucClient extends SapphireClient {
	public constructor() {
		super({
			defaultPrefix: null,
			intents: [GatewayIntentBits.Guilds],
			partials: ['CHANNEL'],
			makeCache: Options.cacheWithLimits({
				MessageManager: 50
			}),
			logger: {
				level: LogLevel.Debug
			},
			sweepers: {
				...Options.defaultSweeperSettings,
				messages: {
					interval: 180,
					lifetime: 900
				}
			},
			tasks: {
				strategy: new ScheduledTaskRedisStrategy({
					bull: {
						redis: {
							port: parseInt(process.env.REDISPORT!, 10),
							password: process.env.REDISPASSWORD,
							host: process.env.REDISHOST,
							username: process.env.REDISUSER
						}
					}
				})
			}
		});

		container.redis = new Redis(process.env.REDIS_URL, { enableAutoPipelining: true });
		container.rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN!);
	}
}
