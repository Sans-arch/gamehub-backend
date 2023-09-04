import express from 'express';
import gamesRouter from './routes/games';
import { Pool } from 'pg';

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gamedb',
  password: 'password',
  port: 5432
});

app.use(express.json());

app.use((req: any, res, next) => {
  req.db = pool;
  next();
});

app.use('/games', gamesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
