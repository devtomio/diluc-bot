import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { AutocompleteInteraction } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { list } from '#data/character';
import Fuse from 'fuse.js';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.Autocomplete
})
export class AutocompleteHandler extends InteractionHandler {
	public override async run(interaction: AutocompleteInteraction, result: InteractionHandler.ParseResult<this>) {
		return interaction.respond(result);
	}

	public override parse(interaction: AutocompleteInteraction) {
		if (interaction.commandName !== 'character') return this.none();

		const focused = interaction.options.getFocused(true);
		const fuse = new Fuse(list);

		if (typeof focused.value !== 'string' || focused.value === '') return this.some(list.map((item) => ({ name: item, value: item })));

		const matched = fuse.search(focused.value);
		const arr = matched.map((mt) => mt.item);

		return this.some(arr.map((item) => ({ name: item, value: item })));
	}
}
