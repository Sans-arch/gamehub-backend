import axios from 'axios';

const imdbPath = 'https://api.igdb.com/v4/games';

export async function getGames(accessToken: string) {
  const response = await axios.post(imdbPath, '', {
    headers: {
      'Client-ID': String(process.env.TWITCH_CLIENT_ID),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export async function getMostPopularGamesOfLastDecade(accessToken: string) {
  const queryFilter = `fields name, rating, slug, summary, cover.id, cover.game, cover.height, cover.url, cover.width;
  where first_release_date > 315360000  & total_rating_count > 0;
  sort total_rating_count desc;
  limit 20;`;

  const response = await axios.post(imdbPath, queryFilter, {
    headers: {
      'Client-ID': String(process.env.TWITCH_CLIENT_ID),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}
