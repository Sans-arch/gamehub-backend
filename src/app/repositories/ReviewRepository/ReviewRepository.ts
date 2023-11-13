import prisma from '../prisma';
import { CreateReviewInput } from './types';

export class ReviewRepository {
  async save({ description, gameId, rating, userId }: CreateReviewInput) {
    const createdReview = await prisma.userRating.create({
      data: {
        description,
        gameId,
        rating,
        userId,
      },
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
    });

    return createdReview;
  }
}
