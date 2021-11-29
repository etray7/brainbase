import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';
import { addDays } from 'date-fns';

import { AppComponent } from './app.component';
import { StockItem } from 'app/@common/models';
import { StocksService } from 'app/@core/services/stocks.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service = jasmine.createSpyObj('StocksService', [
    'getStocks',
    'generateStockData',
  ]);
  service.getStocks.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: StocksService,
          useValue: service,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    service = TestBed.inject(StocksService);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    service.getStocks.calls.reset();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set data to dataSource', () => {
    component.ngOnInit();

    expect(component.dataSource).toBeTruthy();
    expect(service.getStocks).toHaveBeenCalledTimes(1);
  });

  it('should change date and move next day', () => {
    component.ngOnInit();

    const data: Observable<StockItem[]> = component.dataSource;
    const newDate: Date = addDays(component.currentDate, 1);

    component.moveNextDay();

    expect(component.dataSource).not.toBe(data);
    expect(service.generateStockData).toHaveBeenCalledTimes(1);
    expect(component.differenceInDays).toBe(2);
    expect(component.currentDate).toEqual(newDate);
  });
});
