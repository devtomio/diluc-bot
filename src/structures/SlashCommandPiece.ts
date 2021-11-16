import { Piece, PieceContext } from '@sapphire/framework';
import type { Awaitable } from '@sapphire/utilities';
import type { ApplicationCommandData, ApplicationCommandOptionData, CommandInteraction } from 'discord.js';

export abstract class SlashCommand extends Piece {
	public readonly commandData: SlashCommand.Options;
	public readonly guildOnly: boolean;

	public constructor(context: PieceContext, options: SlashCommand.Options) {
		super(context, options);

		this.guildOnly = options.guildOnly ?? false;
		this.commandData = {
			name: this.name,
			description: options.description,
			options: options.options ?? [],
			defaultPermission: options.defaultPermission ?? true,
			autocomplete: options.autocomplete ?? false
		};
	}

	public abstract run(interaction: CommandInteraction): Awaitable<unknown>;
}

export namespace SlashCommand {
	export type Options = ApplicationCommandData & {
		description: string;
		options?: ApplicationCommandOptionData[];
		defaultPermission?: boolean;
		guildOnly?: boolean;
		autocomplete?: boolean;
	};
}
