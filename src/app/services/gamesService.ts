
import { getOAuthTokenFromTwitch } from './external/twitchService';
import igdbService from './external/igdbService';
import { GameRepository } from '../repositories/GameRepository/GameRepository';
import { ReviewRepository } from '../repositories/ReviewRepository/ReviewRepository';
import { CreateReviewInput } from '../repositories/ReviewRepository/types';

const reviewRepository = new ReviewRepository();
const gameRepository = new GameRepository();

async function getMostPopularFromLastDecadeFromIGDB() {
  const accessToken = await getOAuthTokenFromTwitch();

  return igdbService.getMostPopularGamesOfLastDecade(accessToken);
}

async function getGameInfo(slug: string) {
  const accessToken = await getOAuthTokenFromTwitch();

  const [igdbGameInformation] = await igdbService.getGameInformation(accessToken, slug);
  const gamehubGameInformation = await gameRepository.getByIgdbId(String(igdbGameInformation.id));

  const gameInformation = {
    ...igdbGameInformation,
    usersReviews: gamehubGameInformation?.userRating,
  };

  if (!gameInformation.usersReviews) {
    gameInformation.usersReviews = [];
  }

  return gameInformation;
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

async function createGameReview({ gameId, userId, rating, description }: CreateReviewInput) {
  const createdGame = await gameRepository.save({ id_igdb: String(gameId) });

  const createdReview = await reviewRepository.save({
    gameId: createdGame.id,
    userId: userId,
    rating: rating,
    description: description,
  });

  return createdReview;
}

export default { getMostPopularFromLastDecadeFromIGDB, getGameInfo, getGamesById, createGameReview };
