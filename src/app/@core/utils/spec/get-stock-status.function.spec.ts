import { StockChange } from 'app/@common/enums';
import { getStockStatus } from 'app/@core/utils';

describe('getStockStatus', () => {
  it('should correct return stock status', () => {
    expect(getStockStatus(100, 300)).toBe(StockChange.GROWTH);
    expect(getStockStatus(100, 100)).toBe(StockChange.GROWTH);
    expect(getStockStatus(100, 99)).toBe(StockChange.FALLING);
  });
});
