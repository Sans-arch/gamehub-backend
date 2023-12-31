import prisma from '../prisma';
import { GameRepository } from './types';

export class PrismaGameRepository implements GameRepository {
  async getByIgdbId(id_igdb: string) {
    const game = await prisma.game.findFirst({
      where: {
        id_igdb: id_igdb
      },
      include: {
        userRating: {
          select: {
            id: true,
            description: true,
            rating: true,
            gameId: true,
            userId: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        }
      }
    });


    return game;
  }

  async save(id_igdb: string) {
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
