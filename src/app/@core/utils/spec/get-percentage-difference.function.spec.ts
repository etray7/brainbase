import { getPercantageDifferenceByFormula } from 'app/@core/utils';

describe('getPercantageDifferenceByFormula', () => {
  it('should correct return difference in percentage than initial value lower', () => {
    expect(getPercantageDifferenceByFormula(100, 90)).toBe(10);
  });

  it('should correct return difference in percentage than initial value higher', () => {
    expect(getPercantageDifferenceByFormula(100, 330)).toBe(10);
  });
});
