import { Component, Input, OnInit } from '@angular/core';
import { TodaySale } from '../../../models/report';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() todaySale :TodaySale; 
  basicData: any;
  basicOptions:any;
  constructor() { }

  ngOnInit(): void {

    this.basicData = {
      labels: ['Today Sale'],
      datasets: [
          {
              label: 'Dinning',
              backgroundColor: '#42A5F5',
              data: [this.todaySale.Dining]
          },
           {
              label: 'Home Delivery',
              backgroundColor: '#36A2EB',
              data: [this.todaySale.HD]
          }, {
              label: 'Takeaway',
              backgroundColor: '#FFCE56',
              data: [this.todaySale.Takeaway]
          }
          
      ]
  
  
  
  
  
    };
  
  

}
}
