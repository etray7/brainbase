import { IncomeChangePipe } from './income-change.pipe';

describe('IncomeChangePipe', () => {
  it('create an instance', () => {
    const pipe = new IncomeChangePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return correct income change when currentPrice is upper than initial', () => {
    const pipe = new IncomeChangePipe();
    expect(pipe.transform(10, 1000, 1100)).toBe('100.00$ | 10.00%');
  });
  
  it('should return correct income change when currentPrice is lower than initial', () => {
    const pipe = new IncomeChangePipe();
    expect(pipe.transform(10, 1000, 900)).toBe('-100.00$ | -10.00%');
  });
  
  it('should return correct income change when currentPrice is equal initial', () => {
    const pipe = new IncomeChangePipe();
    expect(pipe.transform(0, 1000, 1000)).toBe('0.00$ | 0.00%');
  });
});
