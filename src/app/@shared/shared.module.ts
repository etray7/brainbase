import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomeChangePipe } from './pipes/income-change.pipe';

@NgModule({
  declarations: [IncomeChangePipe],
  imports: [CommonModule],
  exports: [IncomeChangePipe]
})
export class SharedModule {}
