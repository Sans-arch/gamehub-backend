import { Game, IExternalGameFormat } from '../../app/models/GameModel';

describe('Game Model test suite', () => {

  it('should initialize class attributes from an external game format', () => {
    const externalGameData: IExternalGameFormat = {
      name: 'Test Game',
      released: '2023-01-01',
      slug: 'test-game',
      platforms: ['PS4', 'Xbox One'],
      stores: ['Steam', 'Epic Games'],
      esrb_rating: 'Mature',
      background_image: 'test.jpg',
    };

    const game = new Game(externalGameData);

    expect(game.name).toBe('Test Game');
    expect(game.released).toBe('2023-01-01');
    expect(game.slug).toBe('test-game');
    expect(game.platforms).toEqual(['PS4', 'Xbox One']);
    expect(game.stores).toEqual(['Steam', 'Epic Games']);
    expect(game.esrbRating).toBe('Mature');
    expect(game.backgroundImage).toBe('test.jpg');
  });

  it('should consider two instances equal if their attributes match', () => {
    const sut: IExternalGameFormat = {
      name: 'Equal Game',
      released: '2023-03-01',
      slug: 'equal-game',
      platforms: ['PC'],
      stores: ['GOG'],
      esrb_rating: 'Teen',
      background_image: 'equal.jpg',
    };

    const gameData2: IExternalGameFormat = { ...sut };

    const game1 = new Game(sut);
    const game2 = new Game(gameData2);

    expect(game1).toEqual(game2);
  });

  it('should have a non-empty name', () => {
    const sut: Game = new Game({
      name: "Metal Gear",
      background_image: "",
      esrb_rating: 0,
      platforms: [],
      released: "",
      slug: "",
      stores: []
    });

    const actual = sut.name

    expect(actual.length).toBeGreaterThanOrEqual(1);
  });

});
