import { SlashCommand } from '#structures/SlashCommandPiece';
import { ApplyOptions } from '@sapphire/decorators';
import { CommandInteraction, MessageEmbed, MessageActionRow, MessageSelectMenu, Message } from 'discord.js';
import { list, characters } from '#data/characters';
import { randomUUID } from 'crypto';

@ApplyOptions<SlashCommand.Options>({
	name: 'character',
	description: 'Shows information about a specific character.',
	options: [
		{
			name: 'name',
			type: 'STRING',
			required: true,
			description: 'The name of the character',
			autocomplete: true
		}
	]
})
export class Character extends SlashCommand {
	public async run(interaction: CommandInteraction): Promise<void> {
		await interaction.deferReply();

		const name = interaction.options.getString('name', true);

		if (!list.includes(name)) {
			await interaction.editReply("That character could'nt be found. Please try again.");
			return;
		}

		const character = characters[name];
		const embed1 = new MessageEmbed()
			.setAuthor(`${character.name} (${character.stars})`, character.image)
			.setThumbnail(character.vision)
			.setDescription(character.description)
			.addField('Sex', character.sex, true)
			.addField('Birthday', character.birthday, true)
			.addField('Constellation', character.constellation, true)
			.addField('Region', character.region, true)
			.addField('Special Dish', character.specialDish, true)
			.addField('Affiliation', character.affiliation, true)
			.setColor(character.color);
		const embed2 = new MessageEmbed()
			.setAuthor(`${character.name} (${character.stars})`, character.image)
			.setThumbnail(character.vision)
			.setTitle('Story / Lore')
			.setDescription(character.story)
			.setColor(character.color);
		const embed3 = new MessageEmbed()
			.setAuthor(`${character.name} (${character.stars})`, character.image)
			.setThumbnail(character.vision)
			.setTitle('Talents')
			.setDescription(character.talents)
			.setColor(character.color);
		const embed4 = new MessageEmbed()
			.setAuthor(`${character.name} (${character.stars})`, character.image)
			.setThumbnail(character.vision)
			.setTitle('Weapons')
			.setDescription(character.weapons)
			.setColor(character.color);
		const embed5 = new MessageEmbed()
			.setAuthor(`${character.name} (${character.stars})`, character.image)
			.setThumbnail(character.vision)
			.setTitle('Artifacts')
			.setDescription(character.artifacts)
			.setColor(character.color);
		const embed6 = new MessageEmbed()
			.setAuthor(`${character.name} (${character.stars})`, character.image)
			.setThumbnail(character.vision)
			.setTitle('Constellations')
			.setDescription(character.constellations)
			.setColor(character.color);
		const embed7 = new MessageEmbed()
			.setAuthor(`${character.name} (${character.stars})`, character.image)
			.setThumbnail(character.vision)
			.setTitle('Ascension Materials')
			.setDescription(character.ascensionMaterials)
			.setColor(character.color);
		const embed8 = new MessageEmbed()
			.setAuthor(`${character.name} (${character.stars})`, character.image)
			.setThumbnail(character.vision)
			.setTitle('Talent Materials')
			.setDescription(character.talentMaterials)
			.setColor(character.color);
		const id = randomUUID();
		const select = new MessageActionRow().addComponents(
			new MessageSelectMenu().setCustomId(id).addOptions([
				{
					label: 'General Information',
					description: 'The basic information of the character.',
					value: 'info',
					emoji: 'ℹ️'
				},
				{
					label: 'Story',
					description: 'The story / lore of the character.',
					value: 'story',
					emoji: '📖'
				},
				{
					label: 'Talents',
					description: 'The talents of the character.',
					value: 'talents',
					emoji: '🖌️'
				},
				{
					label: 'Weapons',
					description: 'The recommended weapons for the character.',
					value: 'weapons',
					emoji: '⚔️'
				},
				{
					label: 'Artifacts',
					description: 'The recommended artifacts for the character.',
					value: 'artifacts',
					emoji: '🎭'
				},
				{
					label: 'Constellations',
					description: 'The constellations of the character.',
					value: 'constellations',
					emoji: '🌠'
				},
				{
					label: 'Ascension Materials',
					description: 'The ascension materials of the character.',
					value: 'ascension_materials',
					emoji: '🔮'
				},
				{
					label: 'Talent Materials',
					description: 'The talent materials of the character.',
					value: 'talent_materials',
					emoji: '💎'
				}
			])
		);
		const m = <Message<true>>await interaction.editReply({ embeds: [embed1], components: [select] });
		const collector = interaction.channel!.createMessageComponentCollector({
			filter: (i) => i.isSelectMenu() && i.customId === id && i.user.id === interaction.user.id,
			idle: 180000
		});

		collector
			.on('collect', async (i) => {
				if (!i.isSelectMenu()) return;

				const val = i.values.join();

				switch (val) {
					case 'info':
						await m.edit({ embeds: [embed1] });
						break;
					case 'story':
						await m.edit({ embeds: [embed2] });
						break;
					case 'talents':
						await m.edit({ embeds: [embed3] });
						break;
					case 'weapons':
						await m.edit({ embeds: [embed4] });
						break;
					case 'artifacts':
						await m.edit({ embeds: [embed5] });
						break;
					case 'constellations':
						await m.edit({ embeds: [embed6] });
						break;
					case 'ascension_materials':
						await m.edit({ embeds: [embed7] });
						break;
					case 'talent_materials':
						await m.edit({ embeds: [embed8] });
						break;
					default:
				}
			})
			.on('end', async () => {
				await m.edit({ content: 'This interaction has ended.', components: [] });
			});
	}
}
