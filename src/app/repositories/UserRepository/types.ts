import { profile as User } from '@prisma/client';
import { UserPersistDTO } from '../../dtos/UserDTO';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findByEmailAndPassword(email: string, password: string): Promise<User | null>;
  save(user: UserPersistDTO): Promise<User | null>;
}
