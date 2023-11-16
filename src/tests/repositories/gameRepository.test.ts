import { GameRepository } from '../../app/repositories/GameRepository/types';

describe('GameRepository', () => {
  let gameRepository: GameRepository;

  beforeAll(() => {
    const fakeGameRepository: GameRepository = {
      getByIgdbId: async (id_igdb: string) => {
        return { id_igdb: id_igdb, userRating: [], id: 1 };
      },
      save: jest.fn(),
    };

    gameRepository = fakeGameRepository;
  });

  describe('getByIgdbId', () => {
    it('deve retornar um jogo existente pelo ID do IGDB', async () => {
      const existingGame = { id_igdb: '123', userRating: [], id: 1 };
      const result = await gameRepository.getByIgdbId('123');

      expect(result).toEqual(existingGame);
    });

    //   it('deve retornar null para um jogo inexistente pelo ID do IGDB', async () => {
    //     prisma.game.findFirst = jest.fn().mockResolvedValue(null);

    //     const result = await gameRepository.getByIgdbId('456');

    //     expect(result).toBeNull();
    //   });
    // });

    // describe('save', () => {
    //   it('deve criar um novo jogo se não existir', async () => {
    //     const newGame = { id_igdb: '789' };
    //     prisma.game.findFirst = jest.fn().mockResolvedValue(null);
    //     prisma.game.create = jest.fn().mockResolvedValue(newGame);

    //     const result = await gameRepository.save('789');

    //     expect(result).toEqual(newGame);
    //   });

    //   it('deve retornar um jogo existente se já existir', async () => {
    //     const existingGame = { id_igdb: '789' };
    //     prisma.game.findFirst = jest.fn().mockResolvedValue(existingGame);

    //     const result = await gameRepository.save('789');

    //     expect(result).toEqual(existingGame);
    //   });
  });
});
