import gamesService from '../../app/services/gamesService'

describe('GameService test suite', () => {
  it('should return a game with the correct id', async () => {
    const games = await gamesService.getGamesById(['1', '2']);
  });

});
