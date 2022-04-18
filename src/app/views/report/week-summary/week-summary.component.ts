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
 @Input() todaySales :TodaySale; 
  basicOptions:any;
  datagraph:graphs;
  basicData: graph;
  dataa: graph;
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

  ngOnInit(): void {
    console.log(this.todaySales,"today")
    this.dataa = {
      labels: [this.datagraph.labeldine,this.datagraph.labelhd,this.datagraph.labeltakeaway],
      datasets: [
          {

              data: [this.todaySales.Dining,this.todaySales.HD, this.todaySales.Takeaway],
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

   
   

     this.basicData = {
      labels: ['Sales'],
      datasets: [
          {
              label: this.datagraph.labeldine,
              backgroundColor:this.datagraph.bgdine,
              data: [this.todaySales.dine]

          },
           {
              label: this.datagraph.labelhd,
              backgroundColor: this.datagraph.bgdh,
              data: [this.todaySales.hd]
          }, {
              label: this.datagraph.labeltakeaway,
              backgroundColor:this.datagraph.bgtake,
              data: [this.todaySales.takeaway]
          }
          
      ]
    }
  
  
}

}
