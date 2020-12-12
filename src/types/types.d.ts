/* eslint-disable no-shadow */
type OrderTypes = 'ASC' | 'DESC';

type Sort<Entity> = Record<keyof Entity, OrderTypes>;

enum LogicalOperator {
  OR,
  AND,
}

enum Operator {
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

interface Query<Column> {
  column: Column;
  negative: boolean;
  operator: Operator;
  logicalOperator: LogicalOperator;
  value: unknown;
}

type QueryList<Entity> = Query<keyof Entity>[];

interface RealQuery<Entity> {
  query: QueryList<Entity>;
  sort?: Sort<Entity>;
  limit?: number;
  offset?: number;
  fields?: (keyof Entity)[];
}
