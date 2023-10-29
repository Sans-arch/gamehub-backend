import prisma from '../prisma';

interface Game {
  id_igdb: string
}

export class GameRepository {
  async save({ id_igdb }: Game) {
    const existingGame = await prisma.game.findFirst({
      where: {
        id_igdb: id_igdb
      }
    });

    if (!existingGame) {
      const newGame = await prisma.game.create({
        data: {
          id_igdb: id_igdb
        }
      });

      return newGame;
    }

    return existingGame;
  }
}
