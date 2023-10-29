import { List } from '../../models/ListModel';
import { ListDTO } from '../../dtos/ListDTO';

export interface ListRepository {
  findByDescription: (description: string) => Promise<List | null>;
  save: (list: ListDTO) => Promise<List | null>;
}
