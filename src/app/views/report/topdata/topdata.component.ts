import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Historydata } from '../../../models/historydata';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-topdata',
  templateUrl: './topdata.component.html',
 styleUrls: ['./topdata.component.scss']
})
export class TopdataComponent implements OnInit {
  strtdate=new Date();
  startdate:string='';
  monthenddate:string='';
  historydata:Historydata[];
  ids:number;
  @Input() ID:number[]
  constructor(private auth:AuthService,public user:UserService) { }
    ngOnInit(): void {
      this.startdate=moment(this.strtdate).format('YYYY-MM-DD').toString();
      this.monthenddate=moment(this.strtdate).format('YYYY-MM-DD').toString();
      // this.id=this.auth.userData().adminId;
      var currentDate = new Date();
      var dated = currentDate.getDate()
        var pastDate = new Date(currentDate)
        pastDate.setDate(pastDate.getDate() - dated);
        this.monthenddate =moment(pastDate).format('YYYY-MM-DD').toString();
        this.getTopHistorydata();
}
getTopHistorydata(){
  if(this.ID ==undefined)
  {
    this.ids=this.auth.userData().adminId;
  }
else{
this.ids=this.ID[1]
}
console.log(this.ids,"top id")
  this.user.getBillHistory(this.ids,this.startdate,this.monthenddate).subscribe(
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
               }
               return r;
                  }, []);
                  console.log(result,"Resulting")
                  this.historydata=result;
    return result;

 }
)
}
getPaymentMode(n:number){
  let strVal= '-';
  switch(n){
    case 1:
      strVal = 'Cash';
      break;
    case 2:
      strVal = 'UPI';
      break;   
  }
  return strVal;
}
}
  