import { Command, RegisterBehavior, type ChatInputCommand } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { useModal } from '#util/useModal';
import { Modal } from 'discord.js';
import { isNullish } from '@sapphire/utilities';
import { randomUUID } from 'crypto';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Evaluates arbitrary JavaScript code. (only for owners)',
	chatInputCommand: {
		register: true
	}
})
export class SlashCommand extends Command {
	public override registerApplicationCommands(...[registry]: Parameters<ChatInputCommand['registerApplicationCommands']>) {
		registry.registerChatInputCommand((builder) => builder.setName(this.name).setDescription(this.description).setDefaultPermission(true), {
			idHints: ['950037783114817576'],
			behaviorWhenNotIdentical: RegisterBehavior.Overwrite
		});
	}

	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		if (interaction.user.id !== '566155739652030465')
			return interaction.reply({ content: "You don't have permissions to use this command.", ephemeral: true });

		const modalId = randomUUID();
		const modal = new Modal({
			customId: `modal-${modalId}`,
			title: 'Eval Command',
			components: [
				{
					type: 'ACTION_ROW',
					components: [
						{
							type: 'TEXT_INPUT',
							style: 'PARAGRAPH',
							label: 'Code to Evaluate',
							customId: `modal-${interaction.id}`
						}
					]
				}
			]
		});

		const submittedModal = await useModal(interaction, modal, modalId);

		if (isNullish(submittedModal)) return interaction.reply({ content: 'You took too long to submit.', ephemeral: true });

		// eslint-disable-next-line no-eval
		return submittedModal.reply({ content: eval(submittedModal.fields.getTextInputValue(`modal-${interaction.id}`)), ephemeral: true });
	}
}
