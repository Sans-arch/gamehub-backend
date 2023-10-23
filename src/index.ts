import * as dotenv from 'dotenv';
import fastify from 'fastify';
import cors from '@fastify/cors';
import formBody from '@fastify/formbody';

import { gamesRoute } from './routes/gamesRoute';
import { authRoute } from './routes/authRoute';
import { listsRoute } from './routes/listsRoute';

dotenv.config();

export const server = fastify({
  logger: false,
});

const corsOptions = {
  credentials: true,
  // origin: String(process.env.APP_CORS_ALLOWED_ORIGINS),
};

server.register(cors, corsOptions);
server.register(formBody);

server.register(authRoute);
server.register(gamesRoute);
server.register(listsRoute);

server
  .listen({ port: Number(process.env.APP_PORT) || 5765, host: '0.0.0.0' })
  .then(address => console.log(`🚀 Server listening on ${address}! 🔥🔥🔥`))
  .catch(err => {
    console.log(`Error starting server: `, err);
    process.exit(1);
  });
