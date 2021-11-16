import '@sapphire/plugin-logger/register';
import 'reflect-metadata';
import { SapphireClient } from '@sapphire/framework';
import { Intents } from 'discord.js';
import { SlashCommandStore } from '#structures/SlashCommandStore';

const client = new SapphireClient({
	defaultPrefix: null,
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.DIRECT_MESSAGES],
	partials: ['CHANNEL']
});

client.stores.register(new SlashCommandStore());

await client.login();
