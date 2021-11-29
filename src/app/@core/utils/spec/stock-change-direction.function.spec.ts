import { StockChange } from 'app/@common/enums';
import { stockChangeDirection } from 'app/@core/utils';

describe('minusTenPercent', () => {
  it('should correct minus ten percent', () => {
    spyOn(Math, 'random').and.returnValue(0.6);
    expect(stockChangeDirection()).toBe(StockChange.GROWTH);
  });

  it('should correct minus ten percent', () => {
    spyOn(Math, 'random').and.returnValue(0.3);
    expect(stockChangeDirection()).toBe(StockChange.FALLING);
  });
});
