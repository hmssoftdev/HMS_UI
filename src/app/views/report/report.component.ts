import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  data: any;

  chartOptions: any;

  subscription: Subscription;

 

  constructor() {}

  ngOnInit() {
      this.data = {
          labels: ['A','B','C'],
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

  

  getLightTheme() {
      return {
          plugins: {
              legend: {
                  labels: {
                      color: '#495057'
                  }
              }
          }
      }
  }

  getDarkTheme() {
      return {
          plugins: {
              legend: {
                  labels: {
                      color: '#ebedef'
                  }
              }
          }
      }
  }






}
