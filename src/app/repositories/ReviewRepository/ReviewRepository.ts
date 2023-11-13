import prisma from '../prisma';
import { CreateReviewInput } from './types';

export class ReviewRepository {
  async save({ description, gameId, rating, userId }: CreateReviewInput) {
    // Vai ter que criar com o id_igdb, pois pode ser que o game em questão não tenha sido criado ainda por nenhuma lista
    console.log('Dados que chegam no repository');
    console.log({ description, gameId, rating, userId })

    const createdReview = await prisma.userRating.create({
      data: {
        description,
        gameId,
        rating,
        userId,
      }
    });

    return createdReview;
  }
}
