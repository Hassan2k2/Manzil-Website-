import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from '../server/routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api', apiRouter);

app.get('/api/debug', async (req, res) => {
  const dbUrl = process.env.DATABASE_URL;
  const hasDb = !!dbUrl;
  const dbMasked = dbUrl ? dbUrl.replace(/:([^@]+)@/, ':***@') : 'NOT SET';
  try {
    // Try a raw DB connection test
    const { default: prisma } = await import('../server/lib/prisma.js');
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'ok', db: 'connected', hasDb, dbMasked });
  } catch (e: any) {
    res.status(500).json({ status: 'error', hasDb, dbMasked, error: e?.message, code: e?.code });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Manzil API is running' });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default app;
