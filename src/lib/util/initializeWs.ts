import uWebSockets from 'uWebSockets.js';
import { setTimeout } from 'timers/promises';
import { container } from '@sapphire/framework';
import { blue } from 'colorette';
import dayjs from 'dayjs';
import { parse } from 'redis-info';

export const initializeWs = async () => {
	await setTimeout(5000);

	const app = uWebSockets.App();
	let interval: NodeJS.Timer;

	app.ws('/*', {
		idleTimeout: 300,
		maxBackpressure: 1024,
		maxPayloadLength: 512,
		compression: uWebSockets.DEDICATED_COMPRESSOR_3KB,
		open: (ws) => {
			container.logger.debug(`WebSocket[connect] ${Buffer.from(ws.getRemoteAddressAsText()).toString()} connected`);
			interval = setInterval(() => {
				if (ws.isClosed) return;

				ws.send(JSON.stringify({ ping: container.client.ws.ping, timestamp: dayjs().format('MM/DD/YY HH:mm:ss') }), undefined, true);
			}, 1_000);
		},
		close: (ws) => {
			ws.isClosed = true;
			clearInterval(interval);
		}
	});

	app.get('/stats', async (res) => {
		const mem = process.memoryUsage();
		const info = await container.redis.info();
		const dbEntries = await container.redis.dbsize();
		const { redis_version } = parse(info);
		const stats = JSON.stringify({
			ping: container.client.ws.ping,
			users: container.client.guilds.cache.reduce((acc, guild) => acc + (guild.memberCount ?? 0), 0),
			servers: container.client.guilds.cache.size,
			ram: `${Math.round((mem.heapUsed / 1024 / 1024) * 100) / 100} MB`,
			redisVersion: redis_version,
			dbEntries
		});

		res.writeHeader('Content-Type', 'application/json');
		res.end(stats);
	});

	app.listen(Number(process.env.PORT), () => container.logger.info(`${blue('WS')} - Initialized WebSocket server.`));
};
