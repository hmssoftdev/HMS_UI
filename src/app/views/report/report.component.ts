import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { graphs } from '../../models/graphs';
import { TodaySale } from '../../models/report';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  bardine:number;
  barhd:number;
  bartake:number;
  allstartdate:string='';
  weekenddate:string='';
  ID:number;
  datagraph:graphs={
    labeldine:"Dinning",
    labelhd:"Home Delivery",
    labeltakeaway:"TakeAway",
    bgdine:"#42A5F5",
    bgdh:"#66BB6A",
    bgtake:"#FFA726"
  }
    dateValuee:Date;
    dateValue:Date;

    todaySale: TodaySale = {
      Dining: 20,      //20
       HD: 41,
        Takeaway: 25,
      dine: 100,
      hd: 320,
      takeaway: 250
    }

    dataa: any;
    // id:number;
    chartOptionss: any;
datadoughnut: any;
data: any;
chartOptions: any;
   
    constructor(public user:UserService,public auth:AuthService) {
        this.chartOptions = {
            responsive: true,
            title: {
                display: true,
                text: 'Combo Bar Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        }
    }
ngOnInit() {
  this.getSummaryData();
  this.ID=this.auth.userData().adminId;
    // this.id=this.auth.userData().adminId;
    var currentDate = new Date();
   this.allstartdate =  moment(currentDate).format('YYYY-MM-DD').toString();
   var day = currentDate.getDay()
   var pastDate = new Date(currentDate)
   pastDate.setDate(pastDate.getDate() - day);
   this.weekenddate = moment(pastDate).format('YYYY-MM-DD').toString();;
console.log("id",this.ID,"Start",this.allstartdate,"end",this.weekenddate)
  }





  getSummaryData(){
    this.user.getOrderSummary(this.auth.userData().adminId,this.allstartdate,this.weekenddate).subscribe(

      res=>{
        res.map(item=>{
          if (item.deliveryOptionId===1){
            this.bardine=item.totalBill;
            this.todaySale.Dining=this.bardine
            console.log("Dine Chech",this.todaySale.Dining) 
          }
        })
      }
    );
  }

  //excel button click functionality
 


}
    

