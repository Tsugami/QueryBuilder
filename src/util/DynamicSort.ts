import { Sort, OrderTypes } from '../types/types';

function dynamicSort<A>(property: keyof A, order: OrderTypes = 'ASC'): (a: A, b: A) => number {
  const sortOrder = order === 'ASC' ? 1 : -1;
  return (a, b) => {
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export default function dynamicSortMultiple<E, S extends Sort<E>>(sort: S): (a: E, b: E) => number {
  return (a, b) => {
    const keys = Object.keys(sort) as (keyof E)[];
    return keys.reduce((_p, key) => dynamicSort<E>(key, sort[key])(a, b), 0);
  };
}
