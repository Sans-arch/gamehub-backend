
import { getOAuthTokenFromTwitch } from './external/twitchService';
import igdbService from './external/igdbService';

async function getMostPopularFromLastDecadeFromIGDB() {
  const accessToken = await getOAuthTokenFromTwitch();

  return igdbService.getMostPopularGamesOfLastDecade(accessToken);
}

async function getGameInfo(slug: string) {
  const accessToken = await getOAuthTokenFromTwitch();

  return igdbService.getGameInformation(accessToken, slug);
}

async function getGamesById(ids: string[]) {
  const accessToken = await getOAuthTokenFromTwitch();

  const promises = ids.map(id => igdbService.getById(accessToken, id));

  try {
    return await Promise.all(promises);
  } catch (error: any) {
    console.log(error.data);
  }
}

export default { getMostPopularFromLastDecadeFromIGDB, getGameInfo, getGamesById };
