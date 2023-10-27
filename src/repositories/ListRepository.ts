import prisma from './prisma';

import { GameRepository } from './GameRepository';

interface List {
  description: string;
  userId: number;
  selectedGamesIds: string[];
}

const gameRepository = new GameRepository();

export class ListRepository {
  async findByDescription(description: string) {
    const list = await prisma.list.findFirst({
      where: {
        description: description,
      }
    });

    return list;
  }


  async save(list: List) {
    const createdGames = await Promise.all(list.selectedGamesIds.map(async gameId => {
      return await gameRepository.save({
        id_igdb: String(gameId)
      });
    }));

    const newList = await prisma.list.create({
      data: {
        description: list.description,
        gamelist: {
          create: createdGames.map((gameId) => ({
            game: {
              connect: {
                id: gameId.id
              }
            },
            profile: {
              connect: {
                id: list.userId
              }
            },
          }),
          )
        }
      },
      include: {
        gamelist: true,
      },
    });

    return newList;
  }
}
