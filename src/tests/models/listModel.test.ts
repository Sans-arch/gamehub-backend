import { List } from './../../app/models/ListModel';
describe('List Model test suite', () => {
  it('should create new List without pass gameList', () => {
    let sut: List;

    sut = new List({
      id: 1,
      description: 'abc',
    });

    expect(sut).toBeInstanceOf(List);
  });

  it('should create new List with pass gameList', () => {
    let sut: List;

    sut = new List({
      id: 1,
      description: 'abc',
      gameList: [],
    });

    expect(sut).toHaveProperty('gameList');
  });

  it('should not create a List with empty description', () => {
    let sut: List;

    expect(() => {
      sut = new List({
        id: 1,
        description: '',
        gameList: [],
      });
    }).toThrowError('Description cannot be empty!');
  });
});
