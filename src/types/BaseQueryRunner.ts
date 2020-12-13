import { RealQuery } from './types';
// eslint-disable-next-line import/no-cycle
import QueryBuilder from '../QueryBuilder';

export default interface BaseQueryRunner<Entity> {
  findOne(query: RealQuery<Entity>): Promise<Entity> | Entity | undefined;
  findMany(query: RealQuery<Entity>): Promise<Entity[]> | Entity[];
  createQueryBuilder(): QueryBuilder<Entity>;
}
