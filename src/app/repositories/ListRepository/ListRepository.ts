import prisma from '../prisma';

import { GameRepository } from '../GameRepository/GameRepository';
import { ListRepository } from './types';
import { List } from '../../models/ListModel';
import { ListDTO } from '../../dtos/ListDTO';

const gameRepository = new GameRepository();

export class PrismaListRepository implements ListRepository {
  async findByDescription(description: string) {
    const list = await prisma.list.findFirst({
      where: {
        description: description,
      }
    });

    return list;
  }

  async save(list: ListDTO): Promise<List> {
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
}
