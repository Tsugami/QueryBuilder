/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
import { QueryList, LogicalOperator, OrderTypes, Operator, Sort, RealQuery } from './types/types';
import QueryRunner from './types/BaseQueryRunner';

export default class QueryBuilder<Entity> {
  public queryRunner: QueryRunner<Entity>;

  private query: QueryList<Entity>;

  private currentColumn?: keyof Entity;

  private currentLogicalOperator: LogicalOperator;

  private _not: boolean;

  private selectedField?: (keyof Entity)[];

  private _limit?: number;

  private _offset?: number;

  private _sort?: Record<keyof Entity, OrderTypes>;

  constructor(queryRunner: QueryRunner<Entity>) {
    this.queryRunner = queryRunner;
    this.query = [];
    this.currentLogicalOperator = LogicalOperator.AND;
    this._not = false;
  }

  column(column: keyof Entity): this {
    this.currentColumn = column;
    return this;
  }

  private createQuery(value: unknown, operator: Operator) {
    if (!this.currentColumn) {
      throw new Error('REFER a COLUMN before call a QUERY');
    }

    this.query.push({
      column: this.currentColumn,
      negatived: this._not,
      logicalOperator: this.currentLogicalOperator,
      operator,
      value,
    });
  }

  Equal(value: unknown): this {
    this.createQuery(value, Operator.Equal);
    return this;
  }

  GreaterThan(num: number): this {
    this.createQuery(num, Operator.GreaterThan);
    return this;
  }

  LessThan(num: number): this {
    this.createQuery(num, Operator.LessThan);
    return this;
  }

  GreaterThanOrEqual(num: number): this {
    this.createQuery(num, Operator.GreaterThanOrEqual);
    return this;
  }

  LessThanOrEqual(num: number): this {
    this.createQuery(num, Operator.LessThanOrEqual);
    return this;
  }

  In(arr: unknown[]): this {
    this.createQuery(arr, Operator.In);
    return this;
  }

  Between(min: number, max: number): this {
    this.createQuery([min, max], Operator.Between);
    return this;
  }

  Like(str: string): this {
    this.createQuery(str, Operator.Like);
    return this;
  }

  isNull(): this {
    this.createQuery(null, Operator.IsNull);
    return this;
  }

  get not(): this {
    this._not = true;
    return this;
  }

  get or(): this {
    this.currentLogicalOperator = LogicalOperator.OR;
    return this;
  }

  get and(): this {
    this.currentLogicalOperator = LogicalOperator.AND;
    return this;
  }

  select(...fields: (keyof Entity)[]): this {
    this.selectedField = fields;
    return this;
  }

  limit(limit: number): this {
    this._limit = limit;
    return this;
  }

  offset(offset: number): this {
    this._offset = offset;
    return this;
  }

  orderBy(fields: Sort<Entity>): this {
    this._sort = fields;
    return this;
  }

  private createRealQuery(): RealQuery<Entity> {
    return {
      sort: this._sort,
      limit: this._limit,
      query: this.query,
      offset: this._offset,
      fields: this.selectedField,
    };
  }

  getMany(): Promise<Entity[]> | Entity[] {
    return this.queryRunner.findMany(this.createRealQuery());
  }

  getOne(): Promise<Entity> | Entity | undefined {
    return this.queryRunner.findOne(this.createRealQuery());
  }
}
