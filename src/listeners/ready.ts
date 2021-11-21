import { Listener, ListenerOptions } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { blue, gray, green, white, red } from 'colorette';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../../package');

@ApplyOptions<ListenerOptions>({ once: true })
export class Ready extends Listener<'ready'> {
	public async run() {
		await this.createSlashCommands();

		this.printBanner();
		this.printStoreDebugInformation();
	}

	private async createSlashCommands() {
		const store = this.container.stores.get('slashCommands')!;

		try {
			console.log(blue('Started refreshing application (/) commands.'));
			await store.registerCommands();
			console.log(green('Successfully reloaded application (/) commands.'));
		} catch (err: any) {
			console.error(red(err));
		}
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
