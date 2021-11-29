import { StockChange } from '../enums';
import { StockItemResponse } from './stock-item-response.interface';

export interface StockItem extends StockItemResponse {
  change: number;
  difference: number;
  status: StockChange;
}
