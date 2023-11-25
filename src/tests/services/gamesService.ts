import { GameRepository } from '../../app/repositories/GameRepository/types';
import { ReviewRepository } from '../../app/repositories/ReviewRepository/ReviewRepository';
import { GameService } from '../../app/services/gamesService';

describe('GameService test suite', () => {
  let mockGameService: GameService;

  beforeEach(() => {
    const mockGameRepository: GameRepository = {
      getByIgdbId: jest.fn(),
      save(id_igdb) {
        return Promise.resolve({
          id: 1,
          id_igdb,
        });
      },
    };

    const mockReviewRepository: ReviewRepository = {
      save({ description, gameId, rating, userId }) {
        return Promise.resolve({
          id: 1,
          description,
          gameId,
          rating,
          userId,
          createdAt: new Date(),
          user: {
            id: userId,
            name: 'John Doe',
          },
        });
      },
    };

    mockGameService = new GameService(mockGameRepository, mockReviewRepository);
  });

  it('should return the list of most popular games from last decade', async () => {
    const games = await mockGameService.getMostPopularFromLastDecadeFromIGDB();

    expect(games).not.toBeUndefined();
    expect(games).toHaveLength(2);
  });

  it('should return a list of getGamesById', async () => {
    const gamesIds = ['1020', '1942'];

    const games = await mockGameService.getGamesById(gamesIds);

    expect(games).not.toBeUndefined();
    expect(games).toHaveLength(2);
  });

  it('should not return a list of games querying by invalid ids', async () => {
    const gamesIds = ['1', '2'];

    const games = await mockGameService.getGamesById(gamesIds);

    expect(games).not.toBeUndefined();
    expect(games).toHaveLength(2);
  });

  it('should return a game info by slug', async () => {
    const slug = 'the-last-of-us-part-ii';
    const gameInfo = await mockGameService.getGameInfo(slug);

    expect(gameInfo).not.toBeUndefined();
  });

  it('should be possible to create a game review', async () => {
    const review = {
      description: 'description',
      gameId: 1,
      rating: 5,
      userId: 1
    };

    const createdReview = await mockGameService.createGameReview(review);

    expect(createdReview).not.toBeUndefined();
    expect(createdReview).toHaveProperty('id');
    expect(createdReview.gameId).toBe(review.gameId);
    expect(createdReview.userId).toBe(review.userId);
  });
});
