import { Component, Input, OnInit } from '@angular/core';
import { graph, graphs } from '../../../models/graphs';
import { TodaySale } from '../../../models/report';

@Component({
  selector: 'app-top-cust-data',
  templateUrl: './top-cust-data.component.html',
  styleUrls: ['./top-cust-data.component.scss']
})
export class TopCustDataComponent implements OnInit {
  data: graph;
  @Input() 
  datagraph:graphs;
  @Input() todaySale :TodaySale;
  constructor() { }

  ngOnInit(): void {
    this.data = {
      labels:[this.datagraph.labeldine,this.datagraph.labelhd,this.datagraph.labeltakeaway ],
      datasets: [
          {
              label: 'Customer Name',
              borderColor: this.datagraph.bgdine,
              
              data: [this.todaySale.Dining,this.todaySale.HD, this.todaySale.Takeaway,this.todaySale.dine,this.todaySale.hd,this.todaySale.takeaway]
          },
          {
              label: 'Customer Name',
              data: [28, 48, 40, 19, 86, 27, 90],
              borderColor: this.datagraph.bgtake,
          
          }
      ]
  }
  }

}
