process.env.NODE_ENV ??= 'development';

import '@sapphire/plugin-logger/register';
import 'reflect-metadata';
import { DilucClient } from '#root/lib/structures/DilucClient';
import { blue } from 'colorette';

const client = new DilucClient();

await client.login();
client.logger.info(`${blue('WS')} - Successfully logged in.`);
