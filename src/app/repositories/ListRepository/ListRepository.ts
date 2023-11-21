import prisma from '../prisma';

import { GameRepository } from '../GameRepository/types';
import { PrismaGameRepository } from '../GameRepository/GameRepository';
import { ListRepository } from './types';
import { List } from '../../models/ListModel';
import { ListDTO } from '../../dtos/ListDTO';

const gameRepository: GameRepository = new PrismaGameRepository();

export class PrismaListRepository implements ListRepository {
  async findByDescription(description: string) {
    const list = await prisma.list.findFirst({
      where: {
        description: description,
      }
    });

    return list;
  }


  async findByUserId(userId: number): Promise<any[] | null> {
    const lists = await prisma.list.findMany({
      where: {
        gamelist: {
          every: {
            profileid: userId,
          },
        },
      },
      include: {
        gamelist: {
          where: {
            profileid: userId,
          },
          include: {
            game: true,
          },
        },
      },
    })

    return lists;
  }

  async save(list: ListDTO): Promise<List> {
    const createdGames = await Promise.all(list.selectedGamesIds.map(async gameId => {
      return await gameRepository.save(String(gameId));
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

    return {
      id: newList.id,
      description: newList.description,
      gameList: newList.gamelist.map(game => {
        return {
          gameId: game.gameid,
          id: game.id,
          listId: game.listid,
          userId: game.profileid
        }
      })
    };
  }

  async deleteById(id: number) {
    const deletedGameList = prisma.gamelist.deleteMany({
      where: {
        listid: id,
      },
    });

    const deletedList = prisma.list.delete({
      where: {
        id: id,
      },
    });

    const transaction = await prisma.$transaction([deletedGameList, deletedList])

    return transaction;
  }
}
