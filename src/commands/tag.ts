import { Command, type ChatInputCommand } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { Modal, type CommandInteraction, type Message } from 'discord.js';
import { useModal } from '#util/useModal';
import { randomUUID } from 'node:crypto';
import { isNullish } from '@sapphire/utilities';
import { cast } from '#util/cast';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'A tag command where you can make notes.'
})
export class SlashCommand extends Command {
	public override registerApplicationCommands(...[registry]: Parameters<ChatInputCommand['registerApplicationCommands']>) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addSubcommand((cmd) =>
					cmd
						.setName('show')
						.setDescription('Shows the content of a tag.')
						.addStringOption((option) => option.setName('name').setDescription('The name of the tag').setRequired(true))
				)
				.addSubcommand((cmd) => cmd.setName('create').setDescription('Creates a new tag.'))
		);
	}

	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		await interaction.deferReply();

		const subCommand = interaction.options.getSubcommand(true);

		if (subCommand === 'show') return this.show(interaction);
		else if (subCommand === 'create') return this.create(interaction);
	}

	private async show(interaction: CommandInteraction) {
		const name = interaction.options.getString('name', true);
		const data = await this.container.db.tag.findUnique({
			where: {
				id: `${name}-${interaction.guildId}`
			}
		});

		if (!data) return interaction.editReply("Sorry, that tag doesn't exist.");

		return interaction.editReply({ content: data.content, allowedMentions: { parse: [] } });
	}

	private async create(interaction: CommandInteraction) {
		const modalId = randomUUID();
		const modal = new Modal({
			customId: `modal-${modalId}`,
			title: 'Create a Tag',
			components: [
				{
					type: 'ACTION_ROW',
					components: [
						{
							type: 'TEXT_INPUT',
							style: 'SHORT',
							label: 'Name',
							placeholder: 'awesome_tag',
							customId: `name-${interaction.id}`
						}
					]
				},
				{
					type: 'ACTION_ROW',
					components: [
						{
							type: 'TEXT_INPUT',
							style: 'PARAGRAPH',
							label: 'Content',
							placeholder: 'Hello world!',
							customId: `content-${interaction.id}`
						}
					]
				}
			]
		});

		const submittedModal = await useModal(interaction, modal, modalId);

		if (isNullish(submittedModal)) return interaction.reply({ content: 'You took too long to submit.', ephemeral: true });

		const msg = cast<Message>(await submittedModal.reply({ content: 'Creating your tag...', fetchReply: true }));
		const name = submittedModal.fields.getTextInputValue(`name-${interaction.id}`);
		const content = submittedModal.fields.getTextInputValue(`content-${interaction.id}`);
		const exists = await this.container.db.tag.findUnique({
			where: {
				id: `${name}-${interaction.guildId}`
			}
		});

		if (exists) return msg.edit(`The tag "${name}" already exists in this guild.`);

		await this.container.db.tag.create({
			data: {
				name,
				content,
				id: `${name}-${interaction.guildId}`,
				guildID: interaction.guildId!,
				ownerID: interaction.user.id,
				ownerName: interaction.user.username
			}
		});

		return msg.edit(`The tag "${name}" was created successfully!`);
	}
}
