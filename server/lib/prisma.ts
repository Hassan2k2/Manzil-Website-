import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import dotenv from 'dotenv';

dotenv.config();

// Required for Neon to use WebSockets in non-browser (Node.js/serverless) environments
neonConfig.webSocketConstructor = ws;

// @neondatabase/serverless reads DATABASE_URL from process.env automatically
// No need to pass connectionString explicitly
const pool = new Pool();
const adapter = new PrismaNeon(pool as any);

const prisma = new PrismaClient({ adapter });

export default prisma;
