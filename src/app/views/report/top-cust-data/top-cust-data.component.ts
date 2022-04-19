import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { graph, graphs } from '../../../models/graphs';
import { TodaySale } from '../../../models/report';
import { AuthService } from '../../../service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { updateConstructor } from 'typescript';
import { UserService } from '../../../service/user.service';
import { Historydata } from '../../../models/historydata';

@Component({
  selector: 'app-top-cust-data',
  templateUrl: './top-cust-data.component.html',
  styleUrls: ['./top-cust-data.component.scss']
})
export class TopCustDataComponent implements OnInit {
  data: graph;
   datagraph:graphs;
  id:number;
  startdate:string='';
  monthenddate:string='';
  date= new Date;
  historydata:Historydata[];
  visit:number;
  // hist:Historydata={
  //   visitCount:1,
  // }
  result:string[];
  constructor(private auth: AuthService ,private translate:TranslateService,public user:UserService) {
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
    
    this.startdate=moment(this.date).format('YYYY-MM-DD').toString();
    this.id=this.auth.userData().adminId;
    this.data = {
      labels:[this.datagraph.labeldine,this.datagraph.labelhd,this.datagraph.labeltakeaway ],
      datasets: [
          {
              label: 'Customer Name',
              borderColor: this.datagraph.bgdine,
              
              data: [22,44,50,30,76,56,96]
          },
          {
              label: 'Customer Name',
              data: [28, 48, 40, 19, 86, 27, 90],
              borderColor: this.datagraph.bgtake,
          
          }
      ]
  }
  
 var currentDate = new Date();
  var dated = currentDate.getDate()
    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - dated);
    this.monthenddate =moment(pastDate).format('YYYY-MM-DD').toString();
    this.getRepeatedHistorydata()
  }
  getRepeatedHistorydata(){
     this.user.getBillHistory(this.id,this.startdate,this.monthenddate).subscribe(
    x=>{
       this.historydata = x;

      var helper = {};
      var result = this.historydata.reduce(function(r, o) {
          var key = o.userMobileNumber + '-' + o.userName;
             if(!helper[key]) {
             helper[key] = Object.assign({}, o); // create a copy of o
                  r.push(helper[key]);
                } else {
                helper[key].grossTotal += o.grossTotal;
                  if(helper[key].hasOwnProperty('visitCount')===true)
                    helper[key].visitCount ++;
                    else{
                      helper[key].visitCount=1; 
                    }
                  }
                  return r;
                     }, []);
                     console.log(result,"Result")
                     this.historydata=result;
                     return result;
    }
  )
  }

}
