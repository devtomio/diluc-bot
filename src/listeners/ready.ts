import { Listener, Events } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { blue, gray, green, white } from 'colorette';
import { readFile } from 'node:fs/promises';

@ApplyOptions<Listener.Options>({ once: true, event: Events.ClientReady })
export class ReadyListener extends Listener {
	public async run() {
		// @ts-ignore As you'd expect
		const { version } = (await import('../../package.json', { assert: { type: 'json' } })).default;

		await this.setRedisCommands();
		this.printBanner(version);
		this.printStoreDebugInformation();
	}

	private printBanner(version: string) {
		const success = green('+');
		const line01 = white(' ____  _ _            ');
		const line02 = white('|  _ \\(_) |_   _  ___ ');
		const line03 = white('| | | | | | | | |/ __|');
		const line04 = white('| |_| | | | |_| | (__ ');
		const line05 = white('|____/|_|_|\\__,_|\\___|');
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01}
${line02}
${line03}${pad}${white(version)}
${line04}${pad}[${success}] Gateway
${line05}
			`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop();

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: any, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${blue(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}

	private async setRedisCommands() {
		const script = await readFile('./scripts/fuzzySearch.lua', { encoding: 'utf-8' });

		this.container.redis.defineCommand('fuzzySearch', {
			numberOfKeys: 1,
			lua: script
		});
	}
}
