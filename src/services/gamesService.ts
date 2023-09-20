import axios from 'axios';
import { Game } from '../models/gamesModel';

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