
export interface GameRepository {
  getByIgdbId: (id_igdb: string) => Promise<({
    userRating: {
      id: number;
      rating: number;
      description: string;
      gameId: number;
      userId: number;
      createdAt: Date;
      user: {
        id: number;
        name: string;
      };
    }[];
  } & {
    id: number;
    id_igdb: string;
  }) | null>;

  save: (id_igdb: string) => Promise<{ id: number, id_igdb: string }>;
}
