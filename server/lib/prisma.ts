import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

// Standard Prisma v5 client - reads DATABASE_URL from environment
const prisma = new PrismaClient();

export default prisma;
