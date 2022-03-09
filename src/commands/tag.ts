import { Command, RegisterBehavior, type ChatInputCommand } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { Modal, Permissions, type CommandInteraction, type Message, type GuildMember } from 'discord.js';
import { useModal } from '#util/useModal';
import { randomUUID } from 'node:crypto';
import { isNullish } from '@sapphire/utilities';
import { cast } from '#util/cast';

@ApplyOptions<ChatInputCommand.Options>({
	description: 'A tag command where you can make notes.'
})
export class SlashCommand extends Command {
	public override registerApplicationCommands(...[registry]: Parameters<ChatInputCommand['registerApplicationCommands']>) {
		registry.registerChatInputCommand(
			(builder) =>
				builder
					.setName(this.name)
					.setDescription(this.description)
					.addSubcommand((cmd) =>
						cmd
							.setName('show')
							.setDescription('Shows the content of a tag.')
							.addStringOption((option) =>
								option.setName('name').setDescription('The name of the tag').setRequired(true).setAutocomplete(true)
							)
					)
					.addSubcommand((cmd) => cmd.setName('create').setDescription('Creates a new tag.'))
					.addSubcommand((cmd) =>
						cmd
							.setName('delete')
							.setDescription(
								"Deletes a tag. (A tag may only be deleted by the tag's creator or a member with the Moderate Members permission."
							)
							.addStringOption((option) =>
								option.setName('name').setDescription('The name of the tag').setRequired(true).setAutocomplete(true)
							)
					),
			{ idHints: ['951001361267458058'], behaviorWhenNotIdentical: RegisterBehavior.Overwrite }
		);
	}

	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		if (isNullish(interaction.guildId)) return interaction.reply({ content: 'You can only use this command inside of guilds.', ephemeral: true });

		const subCommand = interaction.options.getSubcommand(true);

		if (subCommand === 'show') return this.show(interaction);
		else if (subCommand === 'create') return this.create(interaction);
		else if (subCommand === 'delete') return this.delete(interaction);
	}

	private async show(interaction: CommandInteraction) {
		await interaction.deferReply();

		const name = interaction.options.getString('name', true);
		const content = await this.container.redis.hget(`tags:${name}:${interaction.guildId}`, 'content');

		if (!content) return interaction.editReply("Sorry, that tag doesn't exist.");

		return interaction.editReply({ content, allowedMentions: { parse: [] } });
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
		const exists = await this.container.redis.hexists(`tags:${name}:${interaction.guildId}`, 'name');

		if (exists) return msg.edit(`The tag "${name}" already exists in this guild.`);

		await this.container.redis
			.multi()
			.hset(
				`tags:${name}:${interaction.guildId}`,
				'name',
				name,
				'content',
				content,
				'guildId',
				interaction.guildId!,
				'ownerId',
				interaction.user.id,
				'ownerName',
				interaction.user.username
			)
			.lpush(`tags:${interaction.guildId}`, name)
			.exec();

		return msg.edit(`The tag "${name}" was created successfully!`);
	}

	private async delete(interaction: CommandInteraction) {
		await interaction.deferReply();

		const name = interaction.options.getString('name', true);
		const ownerId = await this.container.redis.hget(`tags:${name}:${interaction.guildId}`, 'ownerId');

		if (!ownerId) return interaction.editReply("Sorry, that tag doesn't exist.");

		const owner = await interaction.guild!.members.fetch(ownerId);

		if (owner.id !== ownerId || cast<GuildMember>(interaction.member).permissions.has(Permissions.FLAGS.MODERATE_MEMBERS))
			return interaction.editReply("You don't have permissions to edit this tag.");

		await this.container.redis.del(`tags:${name}:${interaction.guildId}`);

		return interaction.editReply(`The tag "${name}" was deleted successfully!`);
	}
}
