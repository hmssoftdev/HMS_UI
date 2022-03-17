import { Component, Input, OnInit } from '@angular/core';
import { graph, graphs } from '../../../models/graphs';
import { TodaySale } from '../../../models/report';


@Component({
  selector: 'app-week-summary',
  templateUrl: './week-summary.component.html',
  styleUrls: ['./week-summary.component.scss']
})
export class WeekSummaryComponent implements OnInit {
  dataa: graph;
  @Input() datagraph:graphs;
  

  chartOptionss: any;
  constructor() {
   
  }
  @Input() todaySale :TodaySale; 
  ngOnInit(): void {
    this.dataa = {
      labels: [this.datagraph.labeldine,this.datagraph.labelhd,this.datagraph.labeltakeaway],
      datasets: [
          {
              data: [this.todaySale.dine,this.todaySale.hd, this.todaySale.takeaway],
              backgroundColors: [
                  this.datagraph.bgdine,
                  this.datagraph.bgdh,
                  this.datagraph.bgtake
              ],
              hoverBackgroundColor: [
                this.datagraph.bgdine,
                this.datagraph.bgdh,
                this.datagraph.bgtake
              ]
          }
      ]
  };
  }

}
