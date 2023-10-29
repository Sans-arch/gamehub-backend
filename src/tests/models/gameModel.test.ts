import { Game } from '../../app/models/gameModel';

describe('Game Model test suite', () => {

  it.only('Should have a non-empty name', () => {
    const sut: Game = new Game({
      name: "",
      background_image: "",
      esrb_rating: 0,
      platforms: [],
      released: "",
      slug: "",
      stores: []
    });

    const actual = sut.name

    expect(actual).toBeGreaterThanOrEqual(1);
  });

});
