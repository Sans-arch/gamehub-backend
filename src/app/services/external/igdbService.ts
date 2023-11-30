import axios from 'axios';

const igdbPath = 'https://api.igdb.com/v4/games';

async function getGames(accessToken: string) {
  const response = await axios.post(igdbPath, '', {
    headers: {
      'Client-ID': String(process.env.TWITCH_CLIENT_ID),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

async function getMostPopularGamesOfLastDecade(accessToken: string) {
  const queryFilter = `fields name, rating, slug, summary, cover.id, cover.game, cover.height, cover.url, cover.width;
  where first_release_date > 315360000 & total_rating_count > 0;
  sort total_rating_count desc;
  limit 20;`;

  const response = await axios.post(igdbPath, queryFilter, {
    headers: {
      'Client-ID': String(process.env.TWITCH_CLIENT_ID),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

async function getGameInformation(accessToken: string, slug: string) {
  const queryFilter = `fields name, rating, genres.id, genres.name, slug, summary, first_release_date,
  age_ratings, age_ratings.content_descriptions.description,
  platforms.name, platforms.platform_logo.url,
  cover.id, cover.game, cover.height, cover.url, cover.width;
  where slug = "${slug}";`;

  const response = await axios.post(igdbPath, queryFilter, {
    headers: {
      'Client-ID': String(process.env.TWITCH_CLIENT_ID),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

async function getById(accessToken: string, id: string) {
  const queryFilter = `fields name, rating, slug, summary, cover.id, cover.game, cover.height, cover.url, cover.width;
  where id = ${id};`;

  const response = await axios.post(igdbPath, queryFilter, {
    headers: {
      'Client-ID': String(process.env.TWITCH_CLIENT_ID),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

async function getGamesBySearchTerm(accessToken: string, searchTerm: string) {
  const queryFilter = `fields name, rating, slug, summary, cover.id, cover.game, cover.height, cover.url, cover.width;
  search "${searchTerm}";
  where category = (0, 8, 9) & rating > 0;
  `;

  const response = await axios.post(igdbPath, queryFilter, {
    headers: {
      'Client-ID': String(process.env.TWITCH_CLIENT_ID),
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}

export default { getGames, getMostPopularGamesOfLastDecade, getGameInformation, getById, getGamesBySearchTerm };
