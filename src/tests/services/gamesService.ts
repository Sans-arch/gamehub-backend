import gamesService from '../../app/services/gamesService';

describe('GameService test suite', () => {
  it('should return a list of games', async () => {
    const gamesIds = ['1020', '1942'];

    const games = await gamesService.getGamesById(gamesIds);

    expect(games).not.toBeUndefined();
    expect(games).toHaveLength(2);
  });
});
