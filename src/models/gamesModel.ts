export interface IGame {
  name: string;
  released: string;
  backgroundImage: string;
  platforms: any[];
  stores: any[];
}

interface IExternalGameFormat {
  name: string;
  slug: string;
  platforms: any[];
  released: string;
  stores: any[];
  esrb_rating: any;
  background_image: string;
}

export class Game implements IGame {
  name: string;
  released: string;
  slug: string;
  platforms: any[];
  stores: any[];
  esrbRating: any;
  backgroundImage: string;

  constructor(game: IExternalGameFormat) {
    this.name = game.name;
    this.released = game.released;
    this.slug = game.slug;
    this.platforms = game.platforms;
    this.stores = game.stores;
    this.esrbRating = game.esrb_rating;
    this.backgroundImage = game.background_image;
  }
}
