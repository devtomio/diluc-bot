import { oneLine, stripIndents } from 'common-tags';

interface Characters {
	[key: string]: {
		name: string;
		stars: string;
		description: string;
		image: string;
		vision: string;
		sex: string;
		birthday: string;
		color: `#${string}`;
		constellation: string;
		region: string;
		affiliation: string;
		specialDish: string;
		story: string;
		talents: string;
		weapons: string;
		artifacts: string;
		constellations: string;
		ascensionMaterials: string;
		talentMaterials: string;
	}
}

export const characters: Characters = {
	Diluc: {
		name: 'Diluc',
		stars: '5★',
		description: oneLine`
			Diluc is the current proprietor of the Dawn Winery and a nobleman of high repute in Mondstadt society, having
			been born into the opulent Ragnvindr Clan. While he has broken away from the Knights of Favonius due to a
			previous event, he continues to guard Mondstadt in his own manner.
		`,
		image: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/diluc/diluc_portrait.png',
		vision: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Pyro.png',
		sex: 'Male',
		birthday: 'April 30th',
		color: '#ca3a32',
		constellation: 'Noctua',
		region: 'Mondstadt',
		affiliation: 'Dawn Winery',
		specialDish: 'Once Upon a Time on Mondstadt',
		story: stripIndents`
			Kaeya and Diluc refer to themselves as "anti-heroes with attitude issues." He decided to take matters into his own hands and became the "Darknight Hero" to defend the people of Mondstadt, much to his chagrin and disgrace.

			Diluc was once a perfect young man, committed to the Knights of Favonius' cause. His confidence in the Knights was destroyed after his father died prematurely as a result of using a Delusion, as well as Inspector Eroch instructing Diluc to cover up the occurrence. Even after being expelled from the Knights for being a traitor, Eroch still retains grudges against them. He believes the Knights take too long to complete tasks, yet he still admires those that put up the effort, such as Lisa and Jean.

			He admired his father, Crepus, while he was a member of the Knights. Being commended by his father made him happier than fame or anything else, and Crepus advised Diluc to carry out his responsibilities faithfully. He has been repressing himself since his father's death. He has a soft, tender, and modest character, despite coming out as sour and gloomy in his voice. Diluc used to be a lively and pleasant person, but that is no longer the case.
		`,
		talents: stripIndents`
			**Normal Attack: Tempered Sword**
			*Normal Attack*
			Perform up to 4 consecutive strikes.

			*Charged Attack*
			Drains Stamina over time to perform continuous slashes.
			At the end of the sequence, perform a more powerful slash.

			*Plunging Attack*
			Plunges from mid-air to strike the ground, damaging opponents along the path and dealing AoE DMG upon impact.

			**Searing Onslaught**
			__*The slashes represent the values that Diluc holds dear: one for justice, one for courage, and one for duty.*__
			Performs a forward slash that deals **Pyro DMG**.

			This skill can be consecutively used 3 times. Enters CD if not cast again within a short period.

			**Dawn**
			__*The only reason to walk in the darkness is to light it up. Behold, that fleeing light in the dead of night is the herald of the coming dawn.*__
			Releases intense flames to knock back nearby opponents, dealing **Pyro DMG**. The flames then converge into the weapon, summoning a Phoenix that flies forward and deals massive **Pyro DMG** to all opponents in its path. The Phoenix explodes upon reaching its destination, causing a large amount of **AoE Pyro DMG**.
			The searing flames that run down his blade cause it to be infused with **Pyro**.

			**Relentless**
			Diluc's Charged Attack Stamina Cost is decreased by 50%, and its duration is increased by 3s.

			**Blessing of Phoenix**
			The **Pyro Infusion** provided by **Dawn** lasts for 4s longer. Additionally, Diluc gains 20% **Pyro DMG Bonus** during the duration of this effect.

			**Tradition of the Dawn Knight**
			Refunds 15% of the ore used when crafting Claymore-type weapons.

			**Upgrading Priority**
			Normal Attack > Skill > Burst
		`,
		weapons: stripIndents`
			**Wolf's Gravestone**
			Main Stat: ATK%

			**The Unforged**
			Main Stat: ATK%

			**Serpent Spine**
			Main Stat: CRIT Rate

			**Song of Broken Pines**
			Main Stat: Physical DMG Bonus

			**Skyward Pride**
			Main Stat: Energy Recharge

			**Blackcliff Slasher**
			Main Stat: CRIT DMG

			**Rainslasher**
			Main Stat: Elemental Mastery

			**Lithic Blade**
			Main Stat: ATK%

			**Luxurious Sea-Lord (R5)**
			Main Stat: ATK%

			**Prototype Archaic**
			Main Stat: ATK%

			**Debate Club**
			Main Stat: ATK%
		`,
		artifacts: stripIndents`
			**Main Stats**
			Flower of Life: HP
			Plume of Death: ATK
			Sands of Eon: ATK% / Elemental Mastery
			Goblet of Eonothem: Pyro DMG Bonus
			Circlet of Logos: CRIT Rate / CRIT DMG

			**Sub-stats**
			CRIT Rate / CRIT DMG / ATK% / Elemental Mastery / Energy Recharge

			**Artifact Set**
			__4pc Crimson Witch of Flames__
			__2pc Crimson Witch of Flames & 2pc Gladiator's Finale__
			__2pc Crimson Witch of Flames & 2pc Shimenawa's Reminiscence__
			__2pc Crimson Witch of Flames & 2pc Wanderers Troupe__
			__4pc Gladiator's Finale__
		`,
		constellations: stripIndents`
			**Conviction (C1)**
			Diluc deals 15% more DMG to opponents whose HP is above 50%.

			**Searing Ember (C2)**
			When Diluc takes DMG, his ATK increases by 10% and his ATK SPD increases by 5%. Lasts for 10s.
			This effect can stack up to 3 times and can only occur once every 1.5s.

			**Fire and Steel (C3)**
			Increases the Level of **Searing Onslaught** by 3.
			Maximum upgrade level is 15.

			**Flowing Flame (C4)**
			Casting **Searing Onslaught** in rhythm greatly increases damage dealt.
			2s after casting **Searing Onslaught**, casting the next Searing Onslaught in the combo deals 40% additional DMG. This effect lasts for 2s.

			**Phoenix, Harbinger of Dawn (C5)**
			Increases the Level of **Dawn** by 3.
			Maximum upgrade level is 15.

			**Flaming Sword, Nemesis of the Dark (C6)**
			After casting **Searing Onslaught**, the next 2 Normal Attacks within the next 6s will have their DMG and ATK SPD increased by 30%.
			Additionally, Searing Onslaught will not interrupt the Normal Attack combo.
		`,
		ascensionMaterials: stripIndents`
			**Level 1→2:** 20,000 Mora, 1x Agnidus Agate Silver, 3x Small Lamp Grass, 3x Recruit's Insignia
			**Level 2→3:** 40,000 Mora, 3x Agnidus Agate Fragment, 2x Everflame Seed, 10x Small Lamp Grass, 15x Recruit's Insignia
			**Level 3→4:** 60,000 Mora, 6x Agnidus Agate Fragment, 4x Everflame Seed, 20x Small Lamp Grass, 12x Sergeant's Insignia
			**Level 4→5:** 80,000 Mora, 3x Agnidus Agate Chunk, 8x Everflame Seed, 30x Small Lamp Grass, 18x Sergeant's Insignia
			**Level 5→6:** 100,000 Mora, 6x Agnidus Agate Chunk, 12x Everflame Seed, 45x Small Lamp Grass, 12x Lieutenant's Insignia
			**Level 6→7:** 120,000 Mora, 66x Agnidus Agate Gemstone, 20x Everflame Seed, 60x Small Lamp Grass, 24x Lieutenant's Insignia
		`,
		talentMaterials: stripIndents`
			**Level 1→2:** 12,500 Mora, 3x Teachings of Resistance, 6x Recruit's Insignia
			**Level 2→3:** 17,500 Mora, 2x Guide to Resistance, 3x Sergeant's Insignia
			**Level 3→4:** 25,000 Mora, 4x Guide to Resistance, 4x Sergeant's Insignia
			**Level 4→5:** 30,000 Mora, 6x Guide to Resistance, 6x Sergeant's Insignia
			**Level 5→6:** 37,500 Mora, 9x Guide to Resistance, 9x Sergeant's Insignia
			**Level 6→7:** 120,000 Mora, 4x Philosophies of Resistance, 4x Lieutenant's Insignia, 1x Dvalin's Plume
			**Level 7→8:** 260,000 Mora, 6x Philosophies of Resistance, 6x Lieutenant's Insignia, 1x Dvalin's Plume
			**Level 8→9:** 450,000 Mora, 12x Philosophies of Resistance, 9x Lieutenant's Insignia, 2x Dvalin's Plume
			**Level 9→10:** 700,000 Mora, 16x Philosophies of Resistance, 12x Lieutenant's Insignia, 2x Dvalin's Plume, 1x Crown of Insight
		`
	}
};

export const list = ['Diluc'];
