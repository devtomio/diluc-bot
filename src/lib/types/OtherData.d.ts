export interface OtherData {
	albedo: Set[];
	amber: Set[];
	barbara: Set[];
	beidou: Set[];
	bennett: Set[];
	chongyun: Set[];
	diluc: Set[];
	diona: Set[];
	fischl: Set[];
	ganyu: Set[];
	hu_tao: Set[];
	jean: Set[];
	kaeya: Set[];
	keqing: Set[];
	klee: Set[];
	lisa: Set[];
	mona: Set[];
	ningguang: Set[];
	noelle: Set[];
	qiqi: Set[];
	razor: Set[];
	rosaria: Set[];
	sucrose: Set[];
	tartaglia: Set[];
	traveler_anemo: Set[];
	traveler_geo: Set[];
	venti: Set[];
	xiangling: Set[];
	xiao: Set[];
	xingqiu: Set[];
	xinyan: Set[];
	yanfei: Set[];
	zhongli: Set[];
	eula: Set[];
	kaedehara_kazuha: Set[];
	kamisato_ayaka: Set[];
	traveler_electro: Set[];
	sayu: Set[];
	yoimiya: Set[];
	raiden_shogun: Set[];
	kujou_sara: Set[];
	aloy: Set[];
	sangonomiya_kokomi: Set[];
	thoma: Set[];
	arataki_itto: Set[];
	gorou: Set[];
	shenhe: Set[];
	yun_jin: Set[];
	yae_miko: Set[];
}

export type RawNames =
	| 'albedo'
	| 'amber'
	| 'barbara'
	| 'beidou'
	| 'bennett'
	| 'chongyun'
	| 'diluc'
	| 'diona'
	| 'fischl'
	| 'ganyu'
	| 'hu_tao'
	| 'jean'
	| 'kaeya'
	| 'keqing'
	| 'klee'
	| 'lisa'
	| 'mona'
	| 'ningguang'
	| 'noelle'
	| 'qiqi'
	| 'razor'
	| 'rosaria'
	| 'sucrose'
	| 'tartaglia'
	| 'traveler_anemo'
	| 'traveler_geo'
	| 'venti'
	| 'xiangling'
	| 'xiao'
	| 'xingqiu'
	| 'xinyan'
	| 'yanfei'
	| 'zhongli'
	| 'eula'
	| 'kaedehara_kazuha'
	| 'kamisato_ayaka'
	| 'traveler_electro'
	| 'sayu'
	| 'yoimiya'
	| 'raiden_shogun'
	| 'kujou_sara'
	| 'aloy'
	| 'sangonomiya_kokomi'
	| 'thoma'
	| 'arataki_itto'
	| 'gorou'
	| 'shenhe'
	| 'yun_jin'
	| 'yae_miko';

export interface Set {
	id: string;
	name: string;
	description: string;
	recommended: boolean;
	role: Role;
	sets: Set1[];
	stats: Stats;
	stats_priority: StatsPriority[];
	talent_priority: TalentPriority[];
	weapons: Weapon[];
}

export enum Role {
	MainDPS = 'Main DPS',
	SubDPS = 'Sub DPS',
	Support = 'Support'
}

export interface Set1 {
	set_1: string;
	set_2?: string;
}

export interface Stats {
	flower: StatsPriority[];
	plume: StatsPriority[];
	sands: StatsPriority[];
	goblet: string[];
	circlet: StatsPriority[];
}

export enum StatsPriority {
	Atk = 'ATK%',
	CRITRate = 'CRIT Rate',
	CritDmg = 'CRIT DMG',
	CryoDMG = 'Cryo DMG',
	Def = 'DEF%',
	ElementalMastery = 'Elemental Mastery',
	EnergyRecharge = 'Energy Recharge',
	HP = 'HP%',
	HealingBonus = 'Healing Bonus',
	StatsPriorityATK = 'ATK',
	StatsPriorityDEF = 'DEF',
	StatsPriorityHP = 'HP'
}

export enum TalentPriority {
	Burst = 'Burst',
	NormalAttack = 'Normal Attack',
	Skill = 'Skill'
}

export interface Weapon {
	id: string;
	r: number;
}
