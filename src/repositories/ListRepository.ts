import prisma from './prisma';

interface List {
  description: string;
  userId: number;
  selectedGamesIds: number[];
}

export class ListRepository {
  async save(list: List) {
    const customList = await prisma.customList.create({
      data: {
        description: list.description,
        user_id: list.userId,
      },
    });

    console.log({ list });

    list.selectedGamesIds.forEach(async gameId => {
      await prisma.gamesOnCustomLists.create({
        data: {
          customListId: customList.id,
          gameId: gameId,
        },
      });
    });

    return customList;
  }
}
