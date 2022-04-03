import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework';
import type { AutocompleteInteraction } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { list } from '#data/character';
import Fuse from 'fuse.js';
import { cast } from '#util/cast';

@ApplyOptions<InteractionHandler.Options>({
	interactionHandlerType: InteractionHandlerTypes.Autocomplete
})
export class AutocompleteHandler extends InteractionHandler {
	public override async run(interaction: AutocompleteInteraction, result: InteractionHandler.ParseResult<this>) {
		return interaction.respond(result);
	}

	public override async parse(interaction: AutocompleteInteraction) {
		if (interaction.commandName === 'character') {
			const focused = interaction.options.getFocused(true);
			const fuse = new Fuse(list);

			if (typeof focused.value !== 'string' || focused.value === '') return this.some(list.map((item) => ({ name: item, value: item })));

			const matched = fuse.search(focused.value);
			const arr = matched.map((mt) => mt.item);

			return this.some(arr.map((item) => ({ name: item, value: item })));
		} else if (
			interaction.commandName === 'tag' &&
			(interaction.options.getSubcommand(true) === 'show' ||
				interaction.options.getSubcommand(true) === 'delete' ||
				interaction.options.getSubcommand(true) === 'edit' ||
				interaction.options.getSubcommand(true) === 'info')
		) {
			const focused = interaction.options.getFocused(true);

			if (typeof focused.value !== 'string' || focused.value === '') return this.some([]);

			const matched = await this.container.redis.fuzzySearch(`tags:${interaction.guildId}`, focused.value);
			const processed = cast<{ haystack: string; match: number }[] | Record<string, never>>(JSON.parse(matched));

			// eslint-disable-next-line no-implicit-coercion
			if (!!processed && processed.constructor === Object && Object.keys(processed).length === 0) return this.some([]);

			const arr = processed.map((mt) => mt.haystack);

			return this.some(arr.map((item) => ({ name: item, value: item })));
		}

		return this.none();
	}
}
