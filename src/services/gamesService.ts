import axios from 'axios';
import fs from 'node:fs';
import path from 'node:path';

import { Game } from '../models/gameModel';

export async function getAllGamesFromExternalAPI() {
  try {
    const apiPath = `${process.env.EXTERNAL_GAMEDB_API_HOST}/games`;

    const response = await axios.get(apiPath, {
      params: {
        key: process.env.EXTERNAL_GAMEDB_API_KEY,
      },
    });

    const rawGames = response.data.results;
    const parsedGames = rawGames.map((game: any) => new Game(game));

    return parsedGames;
  } catch (error) {
    throw new Error('Erro ao buscar jogos da API externa');
  }
}

export async function getAllGamesFromMock() {
  const mockFileName = 'mocked-api-games.json';
  const mockFilePath = path.join(__dirname, '..', 'mocks', mockFileName);

  const data = fs.readFileSync(mockFilePath, 'utf-8');
  return JSON.parse(data);
}
