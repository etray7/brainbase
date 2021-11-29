import { StockChange } from 'app/@common/enums';

export function stockChangeDirection(): StockChange {
  return Math.random() > 0.5 ? StockChange.GROWTH : StockChange.FALLING;
}
