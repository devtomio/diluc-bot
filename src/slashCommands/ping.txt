import { SlashCommand } from '#structures/SlashCommandPiece';
import { ApplyOptions } from '@sapphire/decorators';
import type { CommandInteraction } from 'discord.js';

@ApplyOptions<SlashCommand.Options>({
	name: 'ping',
	description: 'Shows the latency of the bot.'
})
export class Ping extends SlashCommand {
	public async run(interaction: CommandInteraction) {
		await interaction.deferReply();
		await interaction.editReply(`Pong! API Latency is ${Math.round(this.container.client.ws.ping)}ms.`);
	}
}
