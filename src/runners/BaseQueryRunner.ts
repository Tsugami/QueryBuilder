import { RealQuery } from '../types/types';
// eslint-disable-next-line import/no-cycle
import QueryBuilder from '../QueryBuilder';

export default abstract class BaseQueryRunner<Entity> {
  abstract findOne(query: RealQuery<Entity>): Promise<Entity> | Entity | undefined;

  abstract findMany(query: RealQuery<Entity>): Promise<Entity[]> | Entity[];

  abstract createQueryBuilder(): QueryBuilder<Entity>;
}
