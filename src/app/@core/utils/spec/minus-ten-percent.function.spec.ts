import { minusTenPercent } from 'app/@core/utils';

describe('minusTenPercent', () => {
  it('should correct minus ten percent', () => {
    expect(minusTenPercent(100)).toBe(90);
  });
});
