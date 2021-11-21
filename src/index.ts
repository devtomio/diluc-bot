import '@sapphire/plugin-logger/register';
import 'reflect-metadata';
import { SapphireClient } from '@sapphire/framework';
import { Intents, Options } from 'discord.js';
import { SlashCommandStore } from '#structures/SlashCommandStore';

const client = new SapphireClient({
	defaultPrefix: null,
	intents: [Intents.FLAGS.GUILDS],
	makeCache: Options.cacheWithLimits({
		MessageManager: 50
	})
});

client.stores.register(new SlashCommandStore());

await client.login();
