/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import BaseConnection from './BaseQueryRunner';
import dynamicSort from '../util/DynamicSort';

import { QueryList, RealQuery, LogicalOperator, Operator } from '../types/types';

export default class ArrayConnection<Entity> implements BaseConnection<Entity> {
  private base: Entity[];

  constructor(base: Entity[]) {
    this.base = base;
  }

  private static runOperator(operator: Operator, column: unknown, value: unknown): boolean {
    // eslint-disable-next-line default-case
    switch (operator) {
      case Operator.Equal:
        return column === value;
      case Operator.GreaterThan:
        return Number(column) > Number(value);
      case Operator.GreaterThanOrEqual:
        return Number(column) >= Number(value);
      case Operator.LessThan:
        return Number(column) < Number(value);
      case Operator.LessThanOrEqual:
        return Number(column) <= Number(value);
      case Operator.IsNull:
        return column === null || column === undefined;
      case Operator.In:
        return (value as unknown[]).includes(column);
      case Operator.Like:
        return String(value).toLowerCase().includes(String(column).toLowerCase());
      case Operator.Between: {
        const [min, max] = value as [number, number];
        return Number(column) >= min && Number(column) <= max;
      }
    }
  }

  private static queryCallback<Entity>(queries: QueryList<Entity>[]): (entity: Entity) => boolean {
    return entity => {
      for (const andQueries of queries) {
        for (const query of andQueries) {
          const result = ArrayConnection.runOperator(
            query.operator,
            entity[query.column],
            query.value
          );

          if ((query.negative && result) || !result) {
            return false;
          }
        }
      }
      return true;
    };
  }

  /**
   * Return the queries sorted
   * Ex: [OR, OR, OR]
   * OR = [AND, AND, AND]
   */
  private static parseQueries<Entity>(queries: QueryList<Entity>): QueryList<Entity>[] {
    return queries.reduce<QueryList<Entity>[]>(
      (p, query) => {
        if (query.logicalOperator === LogicalOperator.OR) {
          return [...p, [query]];
        }
        p[p.length - 1].push(query);
        return p;
      },
      [[]]
    );
  }

  findMany(query: RealQuery<Entity>): Entity[] {
    const queryParsed = ArrayConnection.parseQueries(query.query);
    const filtered = this.base.filter(ArrayConnection.queryCallback<Entity>(queryParsed));
    const sorted = query.sort ? filtered.sort(dynamicSort(query.sort)) : filtered;
    if (query.limit && query.offset) {
      return sorted.slice((query.offset - 1) * query.limit, query.offset * query.limit);
    }
    if (query.fields) {
      return sorted.map(entity =>
        ArrayConnection.parseFields(entity, query.fields as (keyof Entity)[])
      ) as Entity[];
    }
    return sorted;
  }

  findOne(query: RealQuery<Entity>): Entity | undefined {
    const queryParsed = ArrayConnection.parseQueries(query.query);
    const result = this.base.find(ArrayConnection.queryCallback<Entity>(queryParsed));
    if (!result) return;
    if (query.fields) {
      return ArrayConnection.parseFields(result, query.fields) as Entity;
    }
    return result;
  }

  private static parseFields<Entity>(entity: Entity, fields: (keyof Entity)[]): Partial<Entity> {
    const newEntity: Partial<Entity> = {};

    for (const field of fields) {
      newEntity[field] = entity[field];
    }
    return newEntity;
  }
}
