import { List } from './../../app/models/ListModel';
describe('List Model test suite', () => {
  it('should create new List without pass gameList', () => {
    let sut: List;

    sut = new List({
      id: 1,
      description: '',
    });

    expect(sut).toBeInstanceOf(List);
  });

  it('should create new List with pass gameList', () => {
    let sut: List;

    sut = new List({
      id: 1,
      description: '',
      gameList: [],
    });

    expect(sut).toHaveProperty('gameList');
  });
});
