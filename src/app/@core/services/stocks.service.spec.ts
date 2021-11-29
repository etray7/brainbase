import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { StocksService } from './stocks.service';
import { StockItem } from 'app/@common/models';
import { StockChange } from 'app/@common/enums';

describe('StocksService', () => {
  let service: StocksService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(StocksService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return data', () => {
    const fakeResponseWithMappedData = [
      {
        symbol: 'LYFT',
        name: 'Lyft',
        price: 57,
        difference: 0,
        change: 57,
        status: 1,
      },
    ];

    service.getStocks().subscribe((data: StockItem[]) => {
      expect(data).toEqual(fakeResponseWithMappedData);
    });

    const req = httpMock.expectOne('/stocks.php');
    req.flush(fakeResponseWithMappedData);
  });

  it('should return new data than add 10 percent', (done: DoneFn) => {
    const fakeResponseWithMappedData = [
      {
        symbol: 'LYFT',
        name: 'Lyft',
        price: 57,
        difference: 0,
        change: 57,
        status: 1,
      },
    ];

    service.getStocks().subscribe((data: StockItem[]) => {
      expect(data).toEqual(fakeResponseWithMappedData);
    });

    const req = httpMock.expectOne('/stocks.php');
    req.flush(fakeResponseWithMappedData);

    spyOn(Math, 'random').and.returnValue(0.6);

    service.generateStockData().subscribe((stocks: StockItem[]) => {
      expect(stocks).toEqual([
        {
          symbol: 'LYFT',
          name: 'Lyft',
          price: 57,
          difference: 10.000000000000005,
          change: 62.7,
          status: 1,
        },
      ]);
      done();
    });
  });

  it('should return new data than minus 10 percent', (done: DoneFn) => {
    const fakeResponseWithMappedData = [
      {
        symbol: 'LYFT',
        name: 'Lyft',
        price: 57,
        difference: 0,
        change: 57,
        status: StockChange.GROWTH,
      },
    ];

    service.getStocks().subscribe((data: StockItem[]) => {
      expect(data).toEqual(fakeResponseWithMappedData);
    });

    const req = httpMock.expectOne('/stocks.php');
    req.flush(fakeResponseWithMappedData);

    spyOn(Math, 'random').and.returnValue(0.3);

    service.generateStockData().subscribe((stocks: StockItem[]) => {
      expect(stocks).toEqual([
        {
          symbol: 'LYFT',
          name: 'Lyft',
          price: 57,
          difference: 10.000000000000005,
          change: 51.3,
          status: StockChange.FALLING,
        },
      ]);
      done();
    });
  });
});
