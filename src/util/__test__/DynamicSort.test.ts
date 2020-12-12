import dynamicSort from '../DynamicSort';

it('return the list organized', () => {
  const persons = [
    { name: 'A', age: 10 },
    { name: 'W', age: 11 },
    { name: 'A', age: 11 },
    { name: 'E', age: 24 },
    { name: 'Q', age: 30 },
    { name: 'K', age: 31 },
    { name: 'T', age: 40 },
    { name: 'T', age: 35 },
  ];

  expect(persons.sort(dynamicSort({ age: 'ASC', name: 'ASC' }))).toEqual([
    { name: 'A', age: 10 },
    { name: 'A', age: 11 },
    { name: 'E', age: 24 },
    { name: 'K', age: 31 },
    { name: 'Q', age: 30 },
    { name: 'T', age: 40 },
    { name: 'T', age: 35 },
    { name: 'W', age: 11 },
  ]);
});
