import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';


import { TodaySummaryComponent } from './today-summary/today-summary.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { WeekSummaryComponent } from './week-summary/week-summary.component';
import { TopCustDataComponent } from './top-cust-data/top-cust-data.component';



@NgModule({
  declarations: [TodaySummaryComponent,
    BarChartComponent,
    WeekSummaryComponent,
    TopCustDataComponent ],
  imports: [
 
    SharedModule,
  ]
})
export class ReportModule { }


