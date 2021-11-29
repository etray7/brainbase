import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { StockChange } from 'app/@common/enums';
import { StockItem, StockItemResponse } from 'app/@common/models';
import {
  addTenPercent,
  getPercantageDifferenceByFormula,
  getStockStatus,
  minusTenPercent,
  stockChangeDirection,
} from 'app/@core/utils';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private stocksData: StockItem[] = [];
  private dataSource$ = new BehaviorSubject([]);

  constructor(private readonly http: HttpClient) {}

  getStocks(): Observable<StockItem[]> {
    return this.http.get<StockItemResponse[]>('/stocks.php').pipe(
      map((stocks: StockItemResponse[]): StockItem[] =>
        stocks.map(
          (item: StockItemResponse): StockItem => ({
            ...item,
            change: item.price,
            difference: 0,
            status: StockChange.GROWTH,
          })
        )
      ),
      tap((stocks: StockItem[]) => (this.stocksData = stocks))
    );
  }

  generateStockData(): Observable<StockItem[]> {
    const newStockData: StockItem[] = this.getStocksChanges(this.stocksData);
    this.stocksData = newStockData;

    return of(this.stocksData);
  }

  private getStocksChanges(stocks: StockItem[]): StockItem[] {
    return stocks.map(
      (stock: StockItem): StockItem => ({
        ...stock,
        ...this.getStockItemChanges(stock),
      })
    );
  }

  private getStockItemChanges({
    change: stockChange,
    price,
  }: StockItem): Omit<StockItem, keyof StockItemResponse> {
    const isStockGrow: StockChange = stockChangeDirection();
    const change: number = this.getStockChangedValue(isStockGrow, stockChange);
    const status: StockChange = getStockStatus(price, change);
    const difference: number = getPercantageDifferenceByFormula(change, price);

    return {
      change,
      difference,
      status,
    };
  }

  private getStockChangedValue(
    isStockGrow: StockChange,
    changedValue: number
  ): number {
    return isStockGrow === StockChange.GROWTH
      ? addTenPercent(changedValue)
      : minusTenPercent(changedValue);
  }
}
