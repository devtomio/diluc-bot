import { Command } from '@sapphire/framework';
import { PermissionFlagsBits } from 'discord-api-types/v9';
import { Permissions } from 'discord.js';

export abstract class DilucCommand extends Command {
	public constructor(context: Command.Context, options: Command.Options & DilucCommand.Options) {
		const resolvedPermissions = new Permissions(options.requiredClientPermissions).add(PermissionFlagsBits.EmbedLinks);

		super(context, {
			requiredClientPermissions: options.embed ? resolvedPermissions : options.requiredClientPermissions,
			...options
		});
	}
}

export namespace DilucCommand {
	export interface Options {
		embed: boolean;
	}
}
