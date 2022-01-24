import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-week-summary',
  templateUrl: './week-summary.component.html',
  styleUrls: ['./week-summary.component.scss']
})
export class WeekSummaryComponent implements OnInit {
  dataa: any;

  chartOptionss: any;
  constructor() { }

  ngOnInit(): void {
    this.dataa = {
      labels: ['Dinning','Home Delivery','Takeaway'],
      datasets: [
          {
              data: [300, 50, 100],
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
