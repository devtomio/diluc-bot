import { Listener, Events } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { blue, gray, green, white } from 'colorette';

// @ts-ignore What you'd expect
import { version } from '../../package.json' assert { type: 'json' };

@ApplyOptions<Listener.Options>({ once: true, event: Events.ClientReady })
export class ReadyListener extends Listener {
	public run() {
		this.printBanner();
		this.printStoreDebugInformation();
	}

	private printBanner() {
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
}
