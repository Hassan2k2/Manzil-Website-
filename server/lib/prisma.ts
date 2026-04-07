import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool, neonConfig } from '@neondatabase/serverless';
import ws from 'ws';
import dotenv from 'dotenv';

dotenv.config();

// Required for Neon WebSocket connections in Node.js/serverless environments
neonConfig.webSocketConstructor = ws;

// Parse DATABASE_URL into individual parts for Neon Pool
const dbUrl = new URL(process.env.DATABASE_URL!.trim());

const pool = new Pool({
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port || '5432'),
  user: dbUrl.username,
  password: dbUrl.password,
  database: dbUrl.pathname.slice(1), // Remove leading /
  ssl: true,
});

const adapter = new PrismaNeon(pool as any);
const prisma = new PrismaClient({ adapter });

export default prisma;
