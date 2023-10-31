export interface GameList {
  id: number;
  gameId: number;
  listId: number;
  userId: number;
}

interface IListConstructor {
  id: number;
  description: string;
  gameList?: GameList[];
}

export class List {
  id: number;
  description: string;
  gameList?: GameList[];

  constructor({ id, description, gameList }: IListConstructor) {
    this.id = id;

    if (gameList) {
      this.gameList = gameList;
    }

    if (!description.length) {
      throw new Error('Description cannot be empty!');
    }

    this.description = description;
  }
}
