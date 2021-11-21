import { Listener } from '@sapphire/framework';
import type { Interaction } from 'discord.js';
import { list } from '#data/characters';
import fuzzy from 'fuzzy';

export class InteractionCreate extends Listener<'interactionCreate'> {
	public async run(interaction: Interaction) {
		if (interaction.isCommand()) {
			const cmd = this.container.stores.get('slashCommands').get(interaction.commandName)!;

			try {
				await cmd.run(interaction);
			} catch (e: any) {
				this.container.logger.fatal(e);

				if (interaction.replied)
					await interaction.followUp({
						content: `An error occured, please try again.\n\`\`\`${e.message}\`\`\``,
						ephemeral: true
					});

				if (interaction.deferred) await interaction.editReply(`An error occured, please try again.\n\`\`\`${e.message}\`\`\``);

				await interaction.reply({
					content: `An error occured, please try again.\n\`\`\`${e.message}\`\`\``,
					ephemeral: true
				});
			}
		} else if (interaction.isAutocomplete()) {
			if (interaction.commandName === 'character') {
				const focused = <string>interaction.options.getFocused();

				if (focused === '') {
					await interaction.respond([]);
					return;
				}

				const matched = fuzzy.filter(focused, list);
				const arr = matched.map((res) => res.string);

				await interaction.respond(arr.map((choice: string) => ({ name: choice, value: choice })));
			}
		}
	}
}
