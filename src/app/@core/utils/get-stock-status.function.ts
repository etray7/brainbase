import { StockChange } from 'app/@common/enums';

export function getStockStatus(
  price: number,
  changedValue: number
): StockChange {
  return price <= changedValue ? StockChange.GROWTH : StockChange.FALLING;
}
