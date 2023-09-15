import * as dotenv from 'dotenv';
import express from 'express';

import gamesRoutes from './routes/gamesRoute';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/games', gamesRoutes);

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port} 🚀`);
});
