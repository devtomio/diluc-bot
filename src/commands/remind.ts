import { ApplyOptions } from '@sapphire/decorators';
import { Command, type ChatInputCommand } from '@sapphire/framework';
import { ms } from '@naval-base/ms';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Reminds you of a task.'
})
export class SlashCommand extends Command {
	public override registerApplicationCommands(...[registry]: Parameters<ChatInputCommand['registerApplicationCommands']>) {
		registry.registerChatInputCommand(
			(builder) =>
				builder
					.setName(this.name)
					.setDescription(this.description)
					.addStringOption((option) =>
						option.setName('reminder').setRequired(true).setDescription('The task that you want to be reminded of.')
					)
					.addIntegerOption((option) => option.setName('time').setRequired(true).setDescription('The time (in seconds)')),
			{ idHints: ['946309959413555200'] }
		);
	}

	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		await interaction.deferReply();

		const msg = await interaction.editReply('Reminding you of that...');
		const [reminder, time] = [interaction.options.getString('reminder', true), interaction.options.getInteger('time', true)];

		if (time > 1.728e6 || time < 1) return interaction.editReply('The `time` option can only be greater than 1 or less than 20 days.');

		await this.container.tasks.create(
			'remind',
			{
				reminder,
				user: interaction.user,
				channelId: interaction.channelId,
				messageId: msg.id,
				guildId: interaction.guildId
			},
			time * 1_000
		);

		const formattedTime = ms(time * 1_000, true);

		return interaction.editReply(`Okay! Reminding you of "${reminder}" in ${formattedTime}.`);
	}
}
