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
	};
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

			**Luxurious Sea-Lord**
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
			__2pc Crimson Witch of Flames & 2pc Wanderer's Troupe__
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
			**Level 1→2:** 20,000 Mora, 1x Agnidus Agate Sliver, 3x Small Lamp Grass, 3x Recruit's Insignia
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
	},
	'Sangonomiya Kokomi': {
		name: 'Sangonomiya Kokomi',
		stars: '5★',
		description: oneLine`
			The young Divine Priestess of Watatsumi Island and a descendant of the Sangonomiya Clan.
			Kokomi is in charge of most of Watatsumi's affairs, shouldering heavy responsibilities alone
			in hopes for giving Watatsumi Island's people the hopes and happiness that they desire.
		`,
		image: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/sangonomiya_kokomi/sangonomiya_kokomi_portrait.png?',
		vision: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Hydro.png',
		sex: 'Female',
		birthday: 'February 22nd',
		color: '#f6ebe5',
		constellation: 'Dracaena Somnolenta',
		region: 'Inazuma',
		affiliation: 'Watatsumi Island',
		specialDish: 'A Stunning Stratagem',
		story: stripIndents`
			Kokomi, as the Divine Priestess of Watatsumi Island, is in charge of practically all of the island's affairs. While she would like to remain a military advisor rather than bear such a burden, she accepts the role in order to provide her people with the hope and happiness they deserve. Kokomi, like Jean, burns herself out quickly while accomplishing her chores and attempts to keep it hidden from others so as not to concern them.

			In addition to managing a variety of situations, Kokomi is a competent strategist who considers all possible scenarios and how to manage them as a consequence of her extensive reading of military texts, but she also likes leisure reading. Kujou Sara claims that it was because of her preparation that the Tenryou Commission was unable to declare complete victory over the Watatsumi Army. This is a tendency she maintains even when she is not involved in military matters. She is immensely adored by her people as a consequence of the role she performs.

			She like Bird Egg Sushi but avoids seafood, which she keeps hidden from most people.
		`,
		talents: stripIndents`
			**Normal Attack: The Shape of Water**
			*Normal Attack*
			Performs up to 3 consecutive attacks that take the form of swimming fish, dealing **Hydro DMG**.

			*Charged Attack*
			Consumes a certain amount of Stamina to deal **AoE Hydro DMG** after a short casting time.

			*Plunging Attack*
			Gathering the might of Hydro, Kokomi plunges towards the ground from mid-air, damaging all opponents in her path. Deals **AoE Hydro DMG** upon impact with the ground.

			**Kurage's Oath**
			__*Kokomi needs timely "refreshment" in order to maintain optimal work efficiency.*__

			Summons a "Bake-Kurage" created from water that can heal her allies.
			Using this skill will apply the **Wet** status to Sangonomiya Kokomi.

			*Bake-Kurage*
			Deals **Hydro DMG** to surrounding opponents and heal nearby active characters at fixed intervals. This healing is based on Kokomi's Max HP.

			**Nereid's Ascension**
			__*Clear light coalesces into robes around Her Excellency, Sangonomiya Kokomi, reflecting her magnificent form.*__

			Summons the might of Watatsumi, dealing **Hydro DMG** to surrounding opponents, before robing Kokomi in a Ceremonial Garment made from the flowing waters of Sangonomiya.

			*Ceremonial Garment*
			- Sangonomiya Kokomi's Normal Attack, Charged Attack and Bake-Kurage DMG are increased based on her Max HP.
			- When her Normal and Charged Attacks hit opponents, Kokomi will restore HP for all nearby party members, and the amount restored is based on her Max HP.
			- Increases Sangonomiya Kokomi's resistance to interruption and allows her to walk on the water's surface.

			These effects will be cleared once Sangonomiya Kokomi leaves the field.

			**Tamanooya's Casket**
			If Sangonomiya Kokomi's own Bake-Kurage is on the field when she uses **Nereid's Ascension**, the Bake-Kurage's duration will be refreshed.

			**Song of Pearls**
			While donning the Ceremonial Garment created by **Nereid's Ascension**, the Normal and Charged Attack DMG Bonus Sangonomiya Kokomi gains based on her Max HP will receive a further increase based on 15% of her Healing Bonus.

			**Princess of Watatsumi**
			Decreases swimming Stamina consumption for your own party members by 20%.
			Not stackable with Passive Talents that provide the exact same effects.

			**Flawless Strategy**
			Sangonomiya Kokomi has a 25% Healing Bonus, but a 100% decrease in CRIT Rate.

			**Upgrading Priority**
			Skill > Burst > Normal Attack
		`,
		weapons: stripIndents`
			**Prototype Amber**
			Main Stat: HP%

			**Thrilling Tales of Dragon Slayers (R5)**
			Main Stat: HP%

			**Everlasting Moonglow**
			Main Stat: HP%

			**Skyward Atlas**
			Main Stat: ATK%

			**Sacrificial Fragments**
			Main Stat: Elemental Mastery

			**Hakushin Ring**
			Main Stat: Energy Recharge
		`,
		artifacts: stripIndents`
			**Main Stats**
			Flower of Life: HP
			Plume of Death: ATK
			Sands of Eon: HP% / Energy Recharge / ATK%
			Goblet of Eonothem: HP% / Hydro DMG Bonus
			Circlet of Logos: Healing Bonus / ATK%

			**Sub-stats**
			HP% / Energy Recharge / ATK% / HP / ATK

			**Artifact Set**
			__4pc Tenacity of the Millelith__
			__4pc Maiden Beloved__
			__2pc Tenacity of the Millelith & 2pc Maiden Beloved__
			__2pc Maiden Beloved & 2pc Heart of Depth__
			__4pc Heart of Depth__
			__2pc Tenacity of the Millelith & 2pc Heart of Depth__
		`,
		constellations: stripIndents`
			**At Water's Edge (C1)**
			While donning the Ceremonial Garment created by **Nereid's Ascension**, the final Normal Attack in Sangonomiya Kokomi's combo will unleash a swimming fish to deal 30% of her Max HP as **Hydro DMG**.
			This DMG is not considered Normal Attack DMG.

			**The Clouds Like Waves Rippling (C2)**
			Sangonomiya Kokomi gains the following Healing Bonuses with regard to characters with 50% or less HP via the following methods:
			- **Kurage's Oath** Bake-Kurage: 4.5% of Kokomi's Max HP.
			- **Nereid's Ascension** Normal and Charged Attacks: 0.6% of Kokomi's Max HP.

			**The Moon, A Ship O'er the Seas (C3)**
			Increases the Level of **Nereid's Ascension** by 3.
			Maximum upgrade level is 15.

			**The Moon Overlooks the Waters (C4)**
			While donning the Ceremonial Garment created by **Nereid's Ascension**, Sangonomiya Kokomi's Normal Attack SPD is increased by 10%, and Normal Attacks that hit opponents will restore 0.8 Energy for her.
			This effect can occur once every 0.2s.

			**All Streams Flow to the Sea (C5)**
			Increases the Level of **Kurage's Oath** by 3.
			Maximum upgrade level is 15.

			**Sango Isshin (C6)**
			While donning the Ceremonial Garment created by **Nereid's Ascension**, Sangonomiya Kokomi gains a 40% **Hydro DMG Bonus** for 4s when her Normal and Charged Attacks heal, or would heal, any party member with 80% or more HP.
		`,
		ascensionMaterials: stripIndents`
			**Level 1→2:** 20,000 Mora, 1x Varunada Lazurite Sliver, 3x Sango Pearl, 3x Spectral Husk
			**Level 2→3:** 40,000 Mora, 3x Varunada Lazurite Fragment, 2x Dew of Repudiation, 10x Sango Pearl, 15x Spectral Husk
			**Level 3→4:** 60,000 Mora, 6x Varunada Lazurite Fragment, 4x Dew of Repudiation, 20x Sango Pearl, 12x Spectral Heart
			**Level 4→5:** 80,000 Mora, 3x Varunada Lazurite Chunk, 8x Dew of Repudiation, 30x Sango Pearl, 18x Spectral Heart
			**Level 5→6:** 100,000 Mora, 6x Varunada Lazurite Chunk, 12x Dew of Repudiation, 45x Sango Pearl, 12x Spectral Nucleus
			**Level 6→7:** 120,000 Mora, 6x Varunada Lazurite Gemstone, 20x Dew of Repudiation, 60x Sango Pearl, 24x Spectral Nucleus
		`,
		talentMaterials: stripIndents`
			**Level 1→2:** 12,500 Mora, 3x Teachings of Transience, 6x Spectral Husk
			**Level 2→3:** 17,500 Mora, 2x Guide to Transience, 3x Spectral Heart
			**Level 3→4:** 25,000 Mora, 4x Guide to Transience, 4x Spectral Heart
			**Level 4→5:** 30,000 Mora, 6x Guide to Transience, 6x Spectral Heart
			**Level 5→6:** 37,500 Mora, 9x Guide to Transience, 9x Spectral Heart
			**Level 6→7:** 120,000 Mora, 4x Philosophies of Transience, 4x Spectral Nucleus, 1x Hellfire Butterfly
			**Level 7→8:** 260,000 Mora, 6x Philosophies of Transience, 6x Spectral Nucleus, 1x Hellfire Butterfly
			**Level 8→9:** 450,000 Mora, 12x Philosophies of Transience, 9x Spectral Nucleus, 2x Hellfire Butterfly
			**Level 9→10:** 700,000 Mora, 16x Philosophies of Transience, 12x Spectral Nucleus, 2x Hellfire Butterfly, 1x Crown of Insight
		`
	},
	Ganyu: {
		name: 'Ganyu',
		stars: '5★',
		description: 'She serves as an emissary and secretary for the Liyue Qixing.',
		image: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/ganyu/ganyu_portrait.png',
		vision: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Cryo.png',
		sex: 'Female',
		birthday: 'December 2nd',
		color: '#cedeee',
		constellation: 'Sinae Unicornis',
		region: 'Liyue',
		affiliation: 'Liyue Qixing',
		specialDish: 'Prosperous Peace',
		story: stripIndents`
			Due to her half-qilin ancestry, Ganyu is typically quiet and reclusive. She also completes whatever activities or food is assigned to her, even if she is hesitant to do so.

			For thousands of years, Ganyu has worked as the Liyue Qixing's nonstop secretary. She puts in more effort as the assignment gets more important, but she also becomes more tense and more prone to making mistakes.

			She has a hectic job schedule and frequently works overtime. Ganyu has few acquaintances outside of work as a result of this. She is forgetful due to her age, and she frequently forgets crucial things, which causes her humiliation. She sleeps a lot and is quite self-conscious about her horns and weight.
		`,
		talents: stripIndents`
			**Normal Attack: Liutian Archery**
			*Normal Attack*
			Perform up to 6 consecutive shots with a bow.

			*Charged Attack*
			Perform a more precise **Aimed Shot** with increased DMG.
			While aiming, an icy aura will accumulate on the arrowhead before the arrow is fired. Has different effects based on how long the energy has been charged:
			- Charge Level 1: Fires off an icy arrow that deals **Cryo DMG**.
			- Charge Level 2: Fires off a Frostflake Arrow that deals **Cryo DMG**. The Frostflake Arrow blooms after hitting its target, dealing **AoE Cryo DMG**.

			*Plunging Attack*
			Fires off a shower of arrows in mid-air before falling and striking the ground, dealing AoE DMG upon impact.

			**Trail of the Qilin**
			__*"You saw me, you say? You must be mistaken. I was working overtime then."*__

			Leaving a single Ice Lotus behind, Ganyu dashes backward, shunning all impurity and dealing **AoE Cryo DMG**.

			*Ice Lotus*
			- Continuously taunts surrounding opponents, attracting them to attack it.
			- Endurance scales based on Ganyu's Max HP.
			- Blooms profusely when destroyed or once its duration ends, dealing **AoE Cryo DMG**.

			**Celestial Shower**
			__*Ganyu can bring down sweet rains as a matter of course. But against demons and heretics, they become bitter, freezing snow.*__

			Coalesces atmospheric frost and snow to summon a Sacred Cryo Pearl that exorcises evil.
			During its ability duration, the Sacred Cryo Pearl will continuously rain down shards of ice, striking opponents within an AoE and dealing **Cryo DMG**

			**Undivided Heart**
			After firing a Frostflake Arrow, the CRIT Rate of subsequent Frostflake Arrows and their resulting bloom effects is increased by 20% for 5s.

			**Harmony between Heaven and Earth**
			**Celestial Shower** grants a 20% **Cryo DMG Bonus** to active party members in the AoE.

			**Preserved for the Hunt**
			Refunds 15% of the ore used when crafting Bow-type weapons.

			**Upgrading Priority**
			Normal Attack > Skill > Burst
		`,
		weapons: stripIndents`
			**Amos' Bow**
			Main Stat: ATK%

			**Prototype Cresent**
			Main Stat: ATK%

			**Polar Star**
			Main Stat: CRIT Rate

			**Skyward Harp**
			Main Stat: CRIT Rate

			**Blackcliff Warbow**
			Main Stat: CRIT DMG

			**Hamayumi**
			Main Stat: ATK%

			**The Viridescent Hunt**
			Main Stat: CRIT Rate
		`,
		artifacts: stripIndents`
			**Main Stats**
			Flower of Life: HP
			Plume of Death: ATK
			Sands of Eon: Elemental Mastery / ATK%
			Goblet of Eonothem: Cryo DMG Bonus
			Circlet of Logos: CRIT Rate / CRIT DMG

			**Sub-stats**
			CRIT Rate / CRIT DMG / ATK% / Elemental Mastery / ATK / Energy Recharge

			**Artifact Set**
			__4pc Wanderer's Troupe__
			__4pc Blizzard Strayer__
			__4pc Shimenawa's Reminiscence__
			__2pc Blizzard Strayer & 2pc Gladiator's Finale__
			__2pc Blizzard Strayer & 2pc Wanderer's Troupe__
		`,
		constellations: stripIndents`
			**Dew-Drinker (C1)**
			Taking DMG from a Charge Level 2 Frostflake Arrow or Frostflake Arrow Bloom decreases opponents' **Cryo RES** by 15% for 6s.
			A hit regenerates 2 Energy for Ganyu. This effect can only occur once per Charge Level 2 Frostflake Arrow, regardless if Frostflake Arrow itself or its Bloom hit the target.

			**The Auspicious (C2)**
			**Trail of the Qilin** gains 1 additional charge.

			**Cloud Strider (C3)**
			Increases the Level of **Celestial Shower** by 3.
			Maximum upgrade level is 15.

			**Westward Sojourn (C4)**
			Opponents standing within the AoE of **Celestial Shower** take increased DMG. This effect strengthens over time.
			Increased DMG taken begins at 5% and increases by 5% every 3s, up to a maximum of 25%.
			The effect lingers for 3s after the opponent leaves the AoE.

			**The Merciful (C5)**
			Increases the Level of **Trail of the Qilin** by 3.
			Maximum upgrade level is 15.

			**The Clement (C6)**
			Using **Trail of the Qilin** causes the next Frostflake Arrow shot within 30s to not require charging.
		`,
		ascensionMaterials: stripIndents`
			**Level 1→2:** 20,000 Mora, 1x Shivada Jade Sliver, 3x Qingxin, 3x Whopperflower Nectar
			**Level 2→3:** 40,000 Mora, 3x Shivada Jade Fragment, 2x Hoarfrost Core, 10x Qingxin, 15x Whopperflower Nectar
			**Level 3→4:** 60,000 Mora, 6x Shivada Jade Fragment, 4x Hoarfrost Core, 20x Qingxin, 12x Shimmering Nectar
			**Level 4→5:** 80,000 Mora, 3x Shivada Jade Chunk, 8x Hoarfrost Core, 30x Qingxin, 18x Shimmering Nectar
			**Level 5→6:** 100,000 Mora, 6x Shivada Jade Chunk, 12x Hoarfrost Core, 45x Qingxin, 12x Energy Nectar
			**Level 6→7:** 120,000 Mora, 6x Shivada Jade Gemstone, 20x Hoarfrost Core, 60x Qingxin, 24x Energy Nectar
		`,
		talentMaterials: stripIndents`
			**Level 1→2:** 12,500 Mora, 3x Teachings of Diligence, 6x Whopperflower Nectar
			**Level 2→3:** 17,500 Mora, 2x Guide to Diligence, 3x Shimmering Nectar
			**Level 3→4:** 25,000 Mora, 4x Guide to Diligence, 4x Shimmering Nectar
			**Level 4→5:** 30,000 Mora, 6x Guide to Diligence, 6x Shimmering Nectar
			**Level 5→6:** 37,500 Mora, 9x Guide to Diligence, 9x Shimmering Nectar
			**Level 6→7:** 120,000 Mora, 4x Philosophies of Diligence, 4x Energy Nectar, 1x Shadow of the Warrior
			**Level 7→8:** 260,000 Mora, 6x Philosophies of Diligence, 6x Energy Nectar, 1x Shadow of the Warrior
			**Level 8→9:** 450,000 Mora, 12x Philosophies of Diligence, 9x Energy Nectar, 2x Shadow of the Warrior
			**Level 9→10:** 700,000 Mora, 16x Philosophies of Diligence, 12x Energy Nectar, 2x Shadow of the Warrior, 1x Crown of Insight
		`
	},
	'Raiden Shogun': {
		affiliation: 'Archons',
		artifacts: stripIndents`
			**Main Stats**
			Flower of Life: HP
			Plume of Death: ATK
			Sands of Eon: Energy Recharge / ATK%
			Goblet of Eonothem: Electro DMG Bonus / ATK%
			Circlet of Logos: CRIT Rate / CRIT DMG

			**Sub-stats**
			CRIT Rate / CRIT DMG / ATK% / Energy Recharge / ATK / Elemental Mastery

			**Artifact Set**
			__4pc Emblem of Severed Fate__
			__2pc Gladiator's Finale & 2pc Emblem of Severed Fate__
			__2pc Noblesse Oblige & 2pc Thundering Fury__
			__2pc Noblesse Oblige & 2pc Emblem of Severed Fate__
			__4pc Tenacity of the Millelith__
		`,
		ascensionMaterials: stripIndents`
			**Level 1→2:** 20,000 Mora, 1x Vajrada Amethyst Sliver, 3x Amakumo Fruit, 3x Old Handguard
			**Level 2→3:** 40,000 Mora, 3x Vajrada Amethyst Fragment, 2x Storm Beads, 10x Amakumo Fruit, 15x Old Handguard
			**Level 3→4:** 60,000 Mora, 6x Vajrada Amethyst Fragment, 4x Storm Beads, 20x Amakumo Fruit, 12x Kageuchi Handguard
			**Level 4→5:** 80,000 Mora, 3x Vajrada Amethyst Chunk, 8x Storm Beads, 30x Amakumo Fruit, 18x Kageuchi Handguard
			**Level 5→6:** 100,000 Mora, 6x Vajrada Amethyst Chunk, 12x Storm Beads, 45x Amakumo Fruit, 12x Famed Handguard
			**Level 6→7:** 120,000 Mora, 6x Vajrada Amethyst Gemstone, 20x Storm Beads, 60x Amakumo Fruit, 24x Famed Handguard
		`,
		birthday: 'June 26th',
		color: '#282155',
		constellation: 'Imperatrix Umbrosa',
		constellations: stripIndents`
			**Ominous Inscription (C1)**
			**Chakra Desiderata** will gather Resolve even faster. When **Electro** characters use their Elemental Bursts, the Resolve gained is increased by 80%. When characters of other Elemental Types use their Elemental Bursts, the Resolve gained is increased by 20%.

			**Steelbreaker (C2)**
			While using Musou no Hitotachi and in the Musou Isshin state applied by **Secret Art: Musou Shinsetsu**, the Raiden Shogun's attacks ignore 60% of opponents' DEF.

			**Shinkage Bygones (C3)**
			Increases the Level of **Secret Art: Musou Shinsetsu** by 3.
			Maximum upgrade level is 15.

			**Pledge of Propriety (C4)**
			When the **Musou Isshin** state applied by **Secret Art: Musou Shinsetsu** expires, all nearby party members (excluding the Raiden Shogun) gain 30% bonus ATK for 10s.

			**Shogun's Descent (C5)**
			Increases the Level of **Transcendence: Baleful Omen** by 3.
			Maximum upgrade level is 15.

			**Wishbearer (C6)**
			While in the **Musou Isshin** state applied by **Secret Art: Musou Shinsetsu**, attacks by the Raiden Shogun that are considered part of her Elemental Burst will decrease all nearby party members' (not including the Raiden Shogun herself) Elemental Burst CD by 1s when they hit opponents.
			This effect can trigger once every 1s and can trigger a total of 5 times during Musou Isshin's duration.
		`,
		description: oneLine`
			She controls a puppet while meditating inside the Plane of Euthymia.
			Her current form is the vessel of Ei, the current Electro Archon of Inazuma.
		`,
		image: 'https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/characters/raiden_shogun/raiden_shogun_portrait.png',
		name: 'Raiden Shogun',
		region: 'Inazuma',
		sex: 'Female',
		specialDish: 'None',
		stars: '5★',
		story: stripIndents`
			The Raiden Shogun is a fervent believer in what she considers to be eternity—a realm where nothing changes, no matter what happens. She is respected by the residents of Inazuma for her noble behavior.

			Ei, the Raiden Shogun's actual identity, and the Shogun, a puppet made by Ei to govern Inazuma in her place while she meditates on the Plane of Euthymia, exist in two forms. This puppet is programmed with a set of instructions that are incredibly difficult to change, even by Ei herself. The Shogun has a cold, severe, and even heartless disposition; she lacks emotional expression, has no loves or dislikes, and has no desire for amusement. The Shogun sees herself as Ei's personal assistant, and she performs precisely what she wants, no more and no less; she can't act without Ei's permission, and if her normal functions are inhibited, the Shogun is rendered powerless. Outside forces may readily control the puppet due to her restricted protocols and Ei's initial apathy to everything other than her aim of eternal life. The Kujou Clan and the Fatui, for example, duped her into establishing and sustaining the Vision Hunt Decree.

			Ei is more expressive and friendly than the Shogun, but having a more austere exterior than the typical person. Ei, unlike the Shogun, has preferences, such as a sweet tooth and a love of martial arts. Ei is apprehensive of change because of her commitment to eternity. When it comes to new things, such as the appearance of the Traveler and modern world practices, she is curious rather than dismissive. Ei is driven by a fear of additional loss, wishing to protect Inazuma for all eternity, after having lost many of her loved ones over the generations. To do this, she secluded herself in the Plane of Euthymia to protect herself from erosion, while creating the puppet Shogun to be impervious to physical deterioration. Ei was apathetic to everything that did not effect her quest of eternity while on the Plane of Euthymia, and she had a low opinion of human desire since ambition leads to loss and pain, making it incompatible with eternity. Even on the Plane of Euthymia, she couldn't really escape loneliness, even if she was glad to see her friend Yae Miko again and appreciates the Traveler and Paimon's companionship.
		`,
		talentMaterials: stripIndents`
			**Level 1→2:** 12,500 Mora, 3x Teachings of Light, 6x Old Handguard
			**Level 2→3:** 17,500 Mora, 2x Guide to Light, 3x Kageuchi Handguard
			**Level 3→4:** 25,000 Mora, 4x Guide to Light, 4x Kageuchi Handguard
			**Level 4→5:** 30,000 Mora, 6x Guide to Light, 6x Kageuchi Handguard
			**Level 5→6:** 37,500 Mora, 9x Guide to Light, 9x Kageuchi Handguard
			**Level 6→7:** 120,000 Mora, 4x Philosophies of Light, 4x Famed Handguard, 1x Molten Moment
			**Level 7→8:** 260,000 Mora, 6x Philosophies of Light, 6x Famed Handguard, 1x Molten Moment
			**Level 8→9:** 450,000 Mora, 12x Philosophies of Light, 9x Famed Handguard, 2x Molten Moment
			**Level 9→10:** 700,000 Mora, 16x Philosophies of Light, 12x Famed Handguard, 2x Molten Moment, 1x Crown of Insight
		`,
		talents: stripIndents`
			**Normal Attack: Origin**
			*Normal Attack*
			Performs up to 5 consecutive spear strikes.

			*Charged Attack*
			Consumes a certain amount of Stamina to perform an upward slash.

			*Plunging Attack*
			Plunges from mid-air to strike the ground below, damaging opponents along the path and dealing AoE DMG upon impact.

			**Transcendence: Baleful Omen**
			__*Beings of great divinity might affect all that they survey, and the Electro Archon can manipulate the very inauspicious stars themselves to defend her retainers and bring a thundering sentence down on their foes.*__

			The Raiden Shogun unveils a shard of her Euthymia, dealing **Electro DMG** to nearby opponents, and granting nearby party members the Eye of Stormy Judgement.

			*Eye of Stormy Judgement*
			- When characters with this buff attack and deal DMG to opponents, the Eye will unleash a coordinated attack, dealing **AoE Electro DMG** at the opponent's position.
			- Characters who gain the Eye of Stormy Judgement will have their Elemental Burst DMG increased based on the Energy Cost of the Elemental Burst during the Eye's duration.

			The Eye can initiate one coordinated attack every 0.9s per party.
			Coordinated attacks generated by characters not controlled by you deal 20% of the normal DMG.

			**Secret Art: Musou Shinsetsu**
			__*This is the Raiden Shogun's new secret technique. Abandoning the void-like "Musou," she now shoulders a new "Musou" — the dreams and ambitions of all. Just as "shinsetsu", "the truth", also means "the new", so too has Inazuma entered a new chapter.*__

			Gathering truths unnumbered and wishes uncounted, the Raiden Shogun unleashes the Musou no Hitotachi and deals **AoE Electro DMG**, using Musou Isshin in combat for a certain duration afterward. The DMG dealt by Musou no Hitotachi and Musou Isshin's attacks will be increased based on the number of Chakra Desiderata's Resolve stacks consumed when this skill is used.

			*Musou Isshin*
			While in this state, the Raiden Shogun will wield her tachi in battle, while her Normal, Charged, and Plunging Attacks will be infused with **Electro DMG**, which cannot be overridden. When such attacks hit opponents, she will regenerate Energy for all nearby party members. Energy can be restored this way once every 1s, and this effect can be triggered 5 times throughout this skill's duration.
			While in this state, the Raiden Shogun's resistance to interruption is increased, and she is immune to **Electro-Charged** reaction DMG.
			While Musou Isshin is active, the Raiden Shogun's Normal, Charged, and Plunging Attack DMG will be considered Elemental Burst DMG.

			The effects of Musou Isshin will be cleared when the Raiden Shogun leaves the field.

			*Chakra Desiderata*
			When nearby party members (excluding the Raiden Shogun herself) use their Elemental Bursts, the Raiden Shogun will build up Resolve stacks based on the Energy Cost of these Elemental Bursts.
			The maximum number of Resolve stacks is 60.

			The Resolve gained by Chakra Desiderata will be cleared 300s after the Raiden Shogun leaves the field.

			**Wishes Unnumbered**
			When nearby party members gain Elemental Orbs or Particles, **Chakra Desiderata** gains 2 Resolve stacks.
			This effect can occur once every 3s.

			**Enlightened One**
			Each 1% above 100% Energy Recharge that the Raiden Shogun possesses grants her:
			- 0.6% greater Energy restoration from **Musou Isshin**
			- 0.4% **Electro DMG Bonus**

			**All-Preserver**
			Mora expended when ascending Swords and Polearms is decreased by 50%.
		`,
		vision: 'https://gi-builds.sfo3.digitaloceanspaces.com/elements/Electro.png',
		weapons: stripIndents`
			**Engulfing Lightning**
			Main Stat: Energy Recharge

			**"The Catch"**
			Main Stat: Energy Recharge

			**Skyward Spine**
			Main Stat: Energy Recharge

			**Primodial Jade Winged-Spear**
			Main Stat: CRIT Rate

			**Favonius Lance**
			Main Stat: Energy Recharge
		`
	}
};

export const list = ['Diluc', 'Sangonomiya Kokomi', 'Ganyu', 'Raiden Shogun'];
