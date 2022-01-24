import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AppModule } from '../../app.module';
import { CommonModule } from '@angular/common';
import { TodaySummaryComponent } from './today-summary/today-summary.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { WeekSummaryComponent } from './week-summary/week-summary.component';



@NgModule({
  declarations: [
    TodaySummaryComponent,
    BarChartComponent,
    CommonModule,
    SharedModule,
    WeekSummaryComponent
  
  ],
  imports: [
    CommonModule,
    SharedModule,AppModule
  ]
})
export class ReportModule { }


