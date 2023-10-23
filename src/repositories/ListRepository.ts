import prisma from './prisma';

interface List {
  description: string;
  userId: number;
  selectedGamesIds: number[];
}

export class ListRepository {
  async save(list: List) {
    const customlist = await prisma.customList.create({
      data: {
        description: list.description,
        user: {
          connect: {
            id: list.userId,
          },
        },
        games: {
          create: list.selectedGamesIds.map(game => ({ id_igdb: String(game) })),
        },
      },
      include: {
        games: true,
      },
    });

    return customlist;
  }
}
