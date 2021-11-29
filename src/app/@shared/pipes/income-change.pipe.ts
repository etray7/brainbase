import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'incomeChange',
})
export class IncomeChangePipe implements PipeTransform {
  transform(
    percent: number,
    initialPrice: number,
    currentPrice: number
  ): string {
    if (currentPrice >= initialPrice) {
      return `${(currentPrice - initialPrice).toFixed(2)}$ | ${percent.toFixed(2)}%`;
    }

    return `${(currentPrice - initialPrice).toFixed(2)}$ | -${percent.toFixed(2)}%`;
  }
}
