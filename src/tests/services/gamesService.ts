import { GameRepository } from '../../app/repositories/GameRepository/types';
import { ReviewRepository } from '../../app/repositories/ReviewRepository/ReviewRepository';
import { GameService } from '../../app/services/gamesService';

describe('GameService test suite', () => {
  let mockGameRepository: GameRepository;
  let mockReviewRepository: ReviewRepository;
  let mockGamesService;

  beforeEach(() => {
    mockGamesService = new GameService(mockGameRepository, mockReviewRepository);
  });

  it('should return a list of getGamesById', async () => {
    const gamesIds = ['1020', '1942'];

    const games = await mockGamesService.getGamesById(gamesIds);

    expect(games).not.toBeUndefined();
    expect(games).toHaveLength(2);
  });

  it('should return a game info by slug', async () => {
    const slug = 'the-last-of-us-part-ii';
    const gameInfo = await mockGamesService.getGameInfo(slug);
  });
});
