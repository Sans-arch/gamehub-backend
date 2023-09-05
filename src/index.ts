import express from 'express';
import gamesRouter from './routes/games';
import { pool } from './config/db';

const app = express();
const port = 3000;

app.use(express.json());

app.use((req: any, res, next) => {
  req.db = pool;
  next();
});

app.use('/games', gamesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
