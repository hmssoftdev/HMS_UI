import { Component, Input, OnInit } from '@angular/core';
import { graph, graphs } from '../../../models/graphs';
import { TodaySale } from '../../../models/report';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {
  @Input() todaySale :TodaySale; 
  @Input() datagraph:graphs;
 
  basicData: graph;
  // this is default setting
  basicOptions:any;
  constructor() { }

  ngOnInit(): void {

    this.basicData = {
      labels: ['Today Sale'],
      datasets: [
          {
              label: this.datagraph.labeldine,
              backgroundColor:this.datagraph.bgdine,
              data: [this.todaySale.Dining]
          },
           {
              label: this.datagraph.labelhd,
              backgroundColor: this.datagraph.bgdh,
              data: [this.todaySale.HD]
          }, {
              label: this.datagraph.labeltakeaway,
              backgroundColor:this.datagraph.bgtake,
              data: [this.todaySale.Takeaway]
          }
          
      ]
  
  
  
  
  
    };
  
  

}
}
