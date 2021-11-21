import { SlashCommand } from '#structures/SlashCommandPiece';
import { Store } from '@sapphire/framework';

export class SlashCommandStore extends Store<SlashCommand> {
	public constructor() {
		super(SlashCommand as any, { name: 'slashCommands' });
	}

	public async registerCommands(): Promise<void> {
		const { client, stores } = this.container;
		const slashCommands = stores.get('slashCommands');
		const [, globalCmds] = slashCommands.partition((c) => c.guildOnly);

		const testGuild = await client.guilds.fetch('790439279952003123');

		await testGuild.commands.set(globalCmds.map((c) => c.commandData));
		await client.application?.commands.set(globalCmds.map((c) => c.commandData));
	}
}
