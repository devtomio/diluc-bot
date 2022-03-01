import { Command, type ChatInputCommand } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { DiscordSnowflake } from '@sapphire/snowflake';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Shows the latency of the bot.',
	chatInputCommand: {
		register: true
	}
})
export class SlashCommand extends Command {
	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		const msg = await interaction.reply({ content: '🏓 Pinging...', ephemeral: true, fetchReply: true });
		const timestamp = DiscordSnowflake.timestampFrom(msg.id);
		const diff = timestamp - interaction.createdTimestamp;
		const ping = Math.round(this.container.client.ws.ping);

		return interaction.editReply(`🏓 Pong! (🔵 Roundtrip: ${diff}ms. 💙 Heartbeat: ${ping}ms)`);
	}
}
