import { RealQuery } from '../types/types';

export default abstract class BaseConnection<Entity> {
  abstract findOne(query: RealQuery<Entity>): Promise<Entity> | Entity | undefined;

  abstract findMany(query: RealQuery<Entity>): Promise<Entity[]> | Entity[];
}
