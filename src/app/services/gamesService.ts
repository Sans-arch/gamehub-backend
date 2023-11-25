import { getOAuthTokenFromTwitch } from './external/twitchService';
import igdbService from './external/igdbService';
import { GameRepository } from '../repositories/GameRepository/types';
import { ReviewRepository } from '../repositories/ReviewRepository/ReviewRepository';
import { CreateReviewInput } from '../repositories/ReviewRepository/types';

export class GameService {
  constructor(
    private gameRepository: GameRepository,
    private reviewRepository: ReviewRepository,
  ) {
    this.gameRepository = gameRepository;
    this.reviewRepository = reviewRepository;
  }

  async getMostPopularFromLastDecadeFromIGDB() {
    const accessToken = await getOAuthTokenFromTwitch();

    return igdbService.getMostPopularGamesOfLastDecade(accessToken);
  }

  async getGameInfo(slug: string) {
    const accessToken = await getOAuthTokenFromTwitch();

    const [igdbGameInformation] = await igdbService.getGameInformation(accessToken, slug);
    const gamehubGameInformation = await this.gameRepository.getByIgdbId(String(igdbGameInformation.id));

    const gameInformation = {
      ...igdbGameInformation,
      usersReviews: gamehubGameInformation?.userRating,
    };

    if (!gameInformation.usersReviews) {
      gameInformation.usersReviews = [];
    }

    return gameInformation;
  }

  async getGamesById(ids: string[]) {
    const accessToken = await getOAuthTokenFromTwitch();

    const promises = ids.map(id => igdbService.getById(accessToken, id));

    try {
      return await Promise.all(promises);
    } catch (error: any) {
      console.log(error.data);
    }
  }

  async createGameReview({ gameId, userId, rating, description }: CreateReviewInput) {
    const createdGame = await this.gameRepository.save(String(gameId));

    const createdReview = await this.reviewRepository.save({
      gameId: createdGame.id,
      userId: userId,
      rating: rating,
      description: description,
    });

    return createdReview;
  }
}
