import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { graph, graphs } from '../../../models/graphs';
import { TodaySale } from '../../../models/report';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-top-cust-data',
  templateUrl: './top-cust-data.component.html',
  styleUrls: ['./top-cust-data.component.scss']
})
export class TopCustDataComponent implements OnInit {
  data: graph;
  @Input() 
  datagraph:graphs;
  id:number;
  @Input() todaySale :TodaySale;
  constructor(private auth:AuthService) { }
  startdate:string='';
  enddate:string='';
  date= new Date;
  ngOnInit(): void {
    this.startdate=moment(this.date).format('YYYY-MM-DD').toString();

    var pastDate = new Date(this.date)

    var day = this.date.getDay()
    pastDate.setDate(pastDate.getDate() - day);
    this.enddate = moment(pastDate).format('YYYY-MM-DD').toString();
    // this.enddate=moment(this.date).format('YYYY-MM-DD').toString();
    this.id=this.auth.userData().adminId;
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
