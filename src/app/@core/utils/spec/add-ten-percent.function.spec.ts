import { addTenPercent } from 'app/@core/utils';

describe('addTenPercent', () => {
  it('should correct add ten percent', () => {
    expect(addTenPercent(100)).toBe(110);
  });
});
