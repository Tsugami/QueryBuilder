import mock from './MOCK_DATA.json';
import ArrayQueryRunner from '../runners/ArrayQueryRunner';

describe('ArrayQueryRunner', () => {
  const QueryRunner = new ArrayQueryRunner(mock);

  it('should return the user with id 1', async () => {
    const user = await QueryRunner.createQueryBuilder().column('id').Equal(1).getOne();
    expect(user?.id).toEqual(1);
  });

  it('should return the first user that the id is not 1', async () => {
    const user = await QueryRunner.createQueryBuilder().column('id').not.Equal(1).getOne();
    expect(user?.id).toEqual(2);
  });
});
