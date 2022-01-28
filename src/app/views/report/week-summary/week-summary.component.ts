import { Component, Input, OnInit } from '@angular/core';
import { TodaySale } from '../../../models/report';

@Component({
  selector: 'app-week-summary',
  templateUrl: './week-summary.component.html',
  styleUrls: ['./week-summary.component.scss']
})
export class WeekSummaryComponent implements OnInit {
  dataa: any;

  chartOptionss: any;
  constructor() { }
  @Input() todaySale :TodaySale; 
  ngOnInit(): void {
    this.dataa = {
      labels: ['Dinning','Home Delivery','Takeaway'],
      datasets: [
          {
              data: [this.todaySale.dine,this.todaySale.hd, this.todaySale.takeaway],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
  };
  }

}
