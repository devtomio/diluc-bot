import type { SlashCommandStore } from '#structures/SlashCommandStore';

declare module '@sapphire/framework' {
	interface StoreRegistryEntries {
		slashCommands: SlashCommandStore;
	}
}

declare namespace NodeJS {
	interface ProcessEnv {
		DISCORD_TOKEN: string;
	}
}
