import mock from './MOCK_DATA.json';
import ArrayQueryRunner from '../runners/ArrayQueryRunner';

describe('ArrayQueryRunner', () => {
  const QueryRunner = new ArrayQueryRunner(mock);

  it('should return one user with id 1', async () => {
    const user = await QueryRunner.createQueryBuilder().column('id').Equal(1).getOne();
    expect(user?.id).toEqual(1);
  });
});
