process.env.NODE_ENV ??= 'development';

import '@sapphire/plugin-logger/register';
import '#util/initClean';
import 'reflect-metadata';
import { DilucClient } from '#structures/DilucClient';
import * as colorette from 'colorette';
import { initializeWs } from '#util/initializeWs';

colorette.createColors({ useColor: true });

const client = new DilucClient();

await client.login();
client.logger.info(`${colorette.blue('WS')} - Successfully logged in.`);
await initializeWs();
