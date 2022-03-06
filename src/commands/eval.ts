import { Command, type ChatInputCommand } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { useModal } from '#util/useModal';
import { Modal } from 'discord.js';
import { isNullish } from '@sapphire/utilities';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Evaluates arbitrary JavaScript code. (only for owners)',
	chatInputCommand: {
		register: true
	}
})
export class SlashCommand extends Command {
	public override registerApplicationCommands(...[registry]: Parameters<ChatInputCommand['registerApplicationCommands']>) {
		registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description).setDefaultPermission(true), {
			idHints: ['950037783114817576']
		});
	}

	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		await interaction.deferReply({ ephemeral: true });

		const modal = new Modal({
			customId: `modal-${interaction.id}`,
			title: 'Code to Evaluate',
			components: [
				{
					type: 'ACTION_ROW',
					components: [
						{
							type: 'TEXT_INPUT',
							style: 'PARAGRAPH'
						}
					]
				}
			]
		});

		const submittedModal = await useModal(interaction, modal);

		if (isNullish(submittedModal)) return interaction.editReply('You took too long to submit.');

		// eslint-disable-next-line no-eval
		return submittedModal.reply(eval(submittedModal.fields.getTextInputValue(`modal-${interaction.id}`)));
	}
}
