import type { SlashCommandStore } from '#structures/SlashCommandStore';

declare module '@sapphire/framework' {
	interface StoreRegistryEntries {
		slashCommands: SlashCommandStore;
	}
}
