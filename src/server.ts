import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';

import gamesRoute from './app/routes/gamesRoute';
import authRoute from './app/routes/authRoute';
import listsRoute from './app/routes/listsRoute';

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== 'development') {
  app.use(
    cors({
      origin: ['http://localhost:5173', 'https://gamehub-frontend-site.onrender.com'],
    }),
  );
}

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = Number(process.env.APP_PORT) || 5765;

app.use('/api/games', gamesRoute);
app.use('/api/auth', authRoute);
app.use('/api/lists', listsRoute);

app.listen(port, () => {
  console.log(`🚀 Application is running at port: ${port}`);
});
