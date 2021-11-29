import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StocksService } from './@core/services/stocks.service';
import { Observable } from 'rxjs';
import { addDays, differenceInCalendarDays } from 'date-fns';

import { StockItem } from 'app/@common/models';
import { StockTableHeaderType } from 'app/@common/enums';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  public currentDate: Date = new Date();
  public dataSource: Observable<StockItem[]>;
  public displayedColumns: string[] = Object.values(StockTableHeaderType);
  public differenceInDays: number = 1;

  constructor(private readonly stockService: StocksService) {}

  public ngOnInit(): void {
    this.dataSource = this.stockService.getStocks();
  }

  public moveNextDay(): void {
    this.changeDate();
    this.getNewGeneratedStockData();
  }

  private getNewGeneratedStockData(): void {
    this.dataSource = this.stockService.generateStockData();
  }

  private changeDate(): void {
    this.addDay();
    this.getDifferenceInDays()
  }

  private addDay(): void {
    this.currentDate = addDays(this.currentDate, 1);
  }

  private getDifferenceInDays(): void {
    this.differenceInDays = differenceInCalendarDays(this.currentDate, new Date()) + 1;
  }
}
