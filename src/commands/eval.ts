import { Command, RegisterBehavior, type ChatInputCommand } from '@sapphire/framework';
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
			idHints: ['950037783114817576'],
			behaviorWhenNotIdentical: RegisterBehavior.Overwrite
		});
	}

	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		if (interaction.user.id !== '566155739652030465')
			return interaction.reply({ content: "You don't have permissions to use this command.", ephemeral: true });

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

		if (isNullish(submittedModal)) return interaction.reply({ content: 'You took too long to submit.', ephemeral: true });

		// eslint-disable-next-line no-eval
		return submittedModal.reply({ content: eval(submittedModal.fields.getTextInputValue(`modal-${interaction.id}`)), ephemeral: true });
	}
}
