import express from 'express';
import gamesRouter from './routes/games';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/games', gamesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
