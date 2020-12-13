/* eslint-disable no-shadow */
export type OrderTypes = 'ASC' | 'DESC';

export type Sort<Entity> = Record<keyof Entity, OrderTypes>;

export enum LogicalOperator {
  OR,
  AND,
}

export enum Operator {
  Equal,
  GreaterThan,
  LessThan,
  GreaterThanOrEqual,
  LessThanOrEqual,
  Between,
  In,
  Like,
  IsNull,
}

export interface Query<Column> {
  column: Column;
  negatived: boolean;
  operator: Operator;
  logicalOperator: LogicalOperator;
  value: unknown;
}

export type QueryList<Entity> = Query<keyof Entity>[];

export interface RealQuery<Entity> {
  query: QueryList<Entity>;
  sort?: Sort<Entity>;
  limit?: number;
  offset?: number;
  fields?: (keyof Entity)[];
}
