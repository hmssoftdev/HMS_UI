import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { graph, graphs } from '../../../models/graphs';
import { TodaySale } from '../../../models/report';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';


@Component({
  selector: 'app-week-summary',
  templateUrl: './week-summary.component.html',
  styleUrls: ['./week-summary.component.scss']
})
export class WeekSummaryComponent implements OnInit {
  dataa: graph;
  @Input() datagraph:graphs;

  chartOptionss: any;
  constructor(public auth:AuthService,public user:UserService) {
   
    this.datagraph={
      labeldine:"Dinning",
      labelhd:"Home Delivery",
      labeltakeaway:"TakeAway",
      bgdine:"#42A5F5",
      bgdh:"#66BB6A",
      bgtake:"#FFA726"
    }
  }
  @Input() todaySale :TodaySale; 
  ngOnInit(): void {

    this.dataa = {
      labels: [this.datagraph.labeldine,this.datagraph.labelhd,this.datagraph.labeltakeaway],
      datasets: [
          {
              data: [this.todaySale.Dining,this.todaySale.HD, this.todaySale.Takeaway],
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
