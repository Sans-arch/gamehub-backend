import gamesService from '../../app/services/gamesService';

describe('GameService test suite', () => {
  it('should return a list of getGamesById', async () => {
    const gamesIds = ['1020', '1942'];

    const games = await gamesService.getGamesById(gamesIds);

    expect(games).not.toBeUndefined();
    expect(games).toHaveLength(2);
  });

  it('should return a game info by slug', async () => {
    const slug = 'the-last-of-us-part-ii';
    const gameInfo = await gamesService.getGameInfo(slug);
  });
});
