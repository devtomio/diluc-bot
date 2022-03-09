import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { PrismaClient } = require('@prisma/client');

export { PrismaClient };
