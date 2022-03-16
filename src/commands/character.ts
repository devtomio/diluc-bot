/* eslint-disable no-implicit-coercion */

import { DilucCommand } from '#root/lib/structures/DilucCommand';
import { ApplyOptions } from '@sapphire/decorators';
import type { ChatInputCommand } from '@sapphire/framework';
import genshin from 'genshin-db';
import { list, characters as otherInfo, elementImages } from '#data/character';
import { PaginatedMessage } from '@sapphire/discord.js-utilities';
import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import { fetch, FetchResultTypes } from '@sapphire/fetch';
import type { OtherData, RawNames, Stats, StatsPriority, TalentPriority } from '#root/lib/types/OtherData';
import { toProperCase } from '#root/lib/util/toProperCase';
import { cast } from '#root/lib/util/cast';
import { pack, unpack, Packable } from '@yukikaze-bot/erlpack';

interface CachedData {
	character: genshin.Character;
	talent: genshin.Talent;
	constellations: genshin.Constellation;
	artifacts: string[];
	weapons: string[];
	statsPriority: Stats;
	subStatsPriority: StatsPriority[];
	talentPriority: TalentPriority[];
}

const PageLabels = [
	'ℹ️ - General Information',
	'🧠 - Personality',
	'👊 - Talents',
	'👑 - Artifacts',
	'🤺 - Weapons',
	'🌟 - Constellations',
	'💸 - Ascension Materials',
	'💰 - Talent Materials'
];

@ApplyOptions<ChatInputCommand.Options>({
	description: 'Shows information about a specific character.'
})
export class SlashCommand extends DilucCommand {
	public override registerApplicationCommands(...[registry]: Parameters<ChatInputCommand['registerApplicationCommands']>) {
		registry.registerChatInputCommand((builder) =>
			builder
				.setName(this.name)
				.setDescription(this.description)
				.addStringOption((option) =>
					option.setName('name').setRequired(true).setDescription('The name of the character').setAutocomplete(true)
				)
		);
	}

	public override async chatInputRun(...[interaction]: Parameters<ChatInputCommand['chatInputRun']>) {
		await interaction.deferReply();

		const name = interaction.options.getString('name', true);

		if (!list.includes(name)) {
			await interaction.editReply("That character couldn't be found. Please try again.");
			return;
		}

		const { character, constellations, talent, artifacts, weapons, statsPriority, subStatsPriority, talentPriority } = await this.getCached(name);
		const { personality, color } = otherInfo[name];
		const page = new PaginatedMessage({
			pageIndexPrefix: `${character.constellation} |${PaginatedMessage.pageIndexPrefix}`,
			template: new MessageEmbed()
				.setColor(color)
				.setAuthor({ name: `${character.name} | ${character.rarity}★`, iconURL: elementImages[character.element] })
				.setThumbnail(character.images.icon)
		})
			.setSelectMenuOptions((pageIndex) => ({ label: PageLabels[pageIndex - 1] }))
			.addPageEmbed((embed) =>
				embed
					.setTitle('ℹ️ - General Information')
					.setDescription(character.description)
					.addField('Gender', character.gender, true)
					.addField('Birthday', character.birthday, true)
					.addField('Region', character.region, true)
					.addField('Weapon', character.weapontype, true)
					.addField('Affiliation', character.affiliation, true)
					.addField('Title', character.title, true)
			)
			.addPageEmbed((embed) => embed.setTitle(`🧠 - Personality`).setDescription(personality))
			.addPageEmbed((embed) => {
				let talentText = stripIndents`
					*Priority: ${talentPriority.join(' → ')}*

					***${talent.combat1.name}***
					${talent.combat1.info}

					***${talent.combat2.name}***
					${talent.combat2.info}

					***${talent.combat3.name}***
					${talent.combat3.info}

					***${talent.passive1.name}***
					${talent.passive1.info}

					***${talent.passive2.name}***
					${talent.passive2.info}
				`;

				if (typeof talent.passive3 !== 'undefined') talentText += `\n\n***${talent.passive3.name}***\n${talent.passive3.info}`;
				if (typeof talent.passive4 !== 'undefined') talentText += `\n\n***${talent.passive4.name}***\n${talent.passive4.info}`;

				return embed.setTitle('👊 - Talents').setDescription(talentText);
			})
			.addPageEmbed((embed) => {
				const artifactText = stripIndents`
					**Main Stats**
					Flower of Life: ${statsPriority.flower.join(' / ')}
					Plume of Death: ${statsPriority.plume.join(' / ')}
					Sands of Eon: ${statsPriority.sands.join(' / ')}
					Goblet of Eonothem: ${statsPriority.goblet.join(' / ')} Bonus
					Circlet of Logos: ${statsPriority.circlet.join(' / ')}

					**Sub-stats**
					${subStatsPriority.join(' / ')}

					**Artifact Set**
					${artifacts.map((artifact) => `__${artifact}__`).join('\n')}
				`;

				return embed.setTitle('👑 - Artifacts').setDescription(artifactText);
			})
			.addPageEmbed((embed) => embed.setTitle('🤺 - Weapons').setDescription(weapons.join('\n')))
			.addPageEmbed((embed) => {
				const consText = stripIndents`
					**${constellations.c1.name} (C1)**
					${constellations.c1.effect}

					**${constellations.c2.name} (C2)**
					${constellations.c2.effect}

					**${constellations.c3.name} (C3)**
					${constellations.c3.effect}

					**${constellations.c4.name} (C4)**
					${constellations.c4.effect}

					**${constellations.c5.name} (C5)**
					${constellations.c5.effect}

					**${constellations.c6.name} (C6)**
					${constellations.c6.effect}
				`;

				return embed.setTitle('🌟 - Constellations').setDescription(consText);
			})
			.addPageEmbed((embed) => {
				const fmt = new Intl.NumberFormat();
				const ascText = stripIndents`
					**Ascension Level 1:** ${character.costs.ascend1.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Ascension Level 2:** ${character.costs.ascend2.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Ascension Level 3:** ${character.costs.ascend3.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Ascension Level 4:** ${character.costs.ascend4.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Ascension Level 5:** ${character.costs.ascend5.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Ascension Level 6:** ${character.costs.ascend6.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
				`;

				return embed.setTitle('💸 - Ascension Materials').setDescription(ascText);
			})
			.addPageEmbed((embed) => {
				const fmt = new Intl.NumberFormat();
				const talentText = stripIndents`
					**Talent Level 2:** ${talent.costs.lvl2.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Talent Level 3:** ${talent.costs.lvl3.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Talent Level 4:** ${talent.costs.lvl4.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Talent Level 5:** ${talent.costs.lvl5.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Talent Level 6:** ${talent.costs.lvl6.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Talent Level 7:** ${talent.costs.lvl7.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Talent Level 8:** ${talent.costs.lvl8.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Talent Level 9:** ${talent.costs.lvl9.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
					**Talent Level 10:** ${talent.costs.lvl10.map((item) => `${fmt.format(item.count)} ${item.name}`).join(', ')}
				`;

				return embed.setTitle('💰 - Talent Materials').setDescription(talentText);
			});

		return page.run(interaction);
	}

	private async getCached(name: string): Promise<CachedData> {
		const cached = await this.container.redis.get(name);

		if (!cached) {
			const character = genshin.characters(name, { matchAliases: true })!;
			const talent = genshin.talents(name, { matchAliases: true })!;
			const constellations = genshin.constellations(name, { matchAliases: true })!;
			const { artifacts, weapons, statsPriority, subStatsPriority, talentPriority } = await this.fetchOtherData(
				cast(name.replace(' ', '_').toLowerCase())
			);

			await this.container.redis.setex(
				name,
				604_800,
				this.compress({ character, talent, constellations, artifacts, weapons, statsPriority, subStatsPriority, talentPriority })
			);

			return { character, talent, constellations, weapons, artifacts, statsPriority, subStatsPriority, talentPriority };
		}

		return this.decompress(cached);
	}

	private async fetchOtherData(name: RawNames) {
		const raw = await fetch<OtherData>(
			'https://raw.githubusercontent.com/dvaJi/genshin-builds/master/_content/data/builds.json',
			FetchResultTypes.JSON
		);
		const data = raw[name];
		const artifacts = data[0].sets.map((ar) => {
			if (typeof ar.set_2 !== 'undefined') {
				const set1 = toProperCase(ar.set_1.replaceAll('_', ' '));
				const set2 = toProperCase(ar.set_2.replaceAll('_', ' '));
				const [{ name }, name2] = [genshin.artifacts(set1, { matchAliases: true })!, genshin.artifacts(set2, { matchAliases: true })!];

				return `2pc ${name} & 2pc ${name2.name}`;
			}

			const set = toProperCase(ar.set_1.replaceAll('_', ' '));
			const { name } = genshin.artifacts(set, { matchAliases: true })!;

			return `4pc ${name}`;
		});
		const weapons = data[0].weapons.map((weap) => {
			const weapon = toProperCase(weap.id.replaceAll('_', ' '));
			const { substat, name } = genshin.weapons(weapon, { matchAliases: true })!;

			return `**${name}**\nSub-stat: ${substat}\n`;
		});

		return {
			artifacts,
			weapons,
			subStatsPriority: data[0].stats_priority,
			statsPriority: data[0].stats,
			talentPriority: data[0].talent_priority
		};
	}

	private compress(data: CachedData) {
		const compressed = pack(cast<Packable>(data)).toString('binary');

		return compressed;
	}

	private decompress(id: string) {
		const decompressed = unpack(Buffer.from(id, 'binary'));

		return cast<CachedData>(decompressed);
	}
}
