import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { OrderSummary } from '../../../models/OrderSummary';

import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-today-summary',
  templateUrl: './today-summary.component.html',
  styleUrls: ['./today-summary.component.scss']
})
export class TodaySummaryComponent implements OnInit {
  powercount:number=0;
  @Input() ID:number[];
  ids:number;
  date=new Date();
  orderSummary:OrderSummary;
  alltotalAmout:number;
 diningamount:number;
 diningbill:number;
 homedeliveryamount:number;
 homedeliverybill:number;
 takeawayamount:number;
 takeawaybill:number;
totalbill:number;
  sales: { srno: string; cusname: string; cuscontact: string; cuscity: string; billno: string; cusamout: string; }[];

  constructor(private translate:TranslateService,private user:UserService,public auth:AuthService) {
   
   }
 
  startdate=new Date();
  enddate=new Date();
  allstartdate

  powercountstop:any= setInterval(()=>{
    this.powercount++;
    if(this.powercount==10)
    {
      clearInterval(this.powercountstop);

    }
  },1000)
  ngOnInit(): void {
    console.log("Today Summary")
    this.ID=this.auth.userData().adminId;
  this.getSummaryData()

}
getSummaryData(){
  if(this.ID ==undefined)
  {
    this.ids=this.auth.userData().adminId;
  }
  else if(this.ID[1] == undefined){
    this.ids=this.auth.userData().adminId;
  }
else{
this.ids=this.ID[1]
}
console.log(this.ids,"today")
  let maxnewDate = moment(this.date).format('YYYY-MM-DD').toString();
    let minnewDate = moment(this.date).format('YYYY-MM-DD').toString();
    this.user.getOrderSummary(this.ids,maxnewDate,minnewDate).subscribe(
      res=>{
        // this.orderSummary=x
        // this.alltotalAmout=res.totalAmount;
        console.log(res,"Cheching Response")
        if(res){
res.map(item=>{

  if(item.deliveryOptionId===0)
  {
    this.alltotalAmout=item.totalAmount;
    this.totalbill=item.totalBill;

  }
  if(item.deliveryOptionId===1){
    this.diningamount=item.totalAmount;
    this.diningbill=item.totalBill;
  }
  if(item.deliveryOptionId===2){
    this.homedeliveryamount=item.totalAmount;
    this.homedeliverybill=item.totalBill;
  }
  if(item.deliveryOptionId===3){
    this.takeawayamount=item.totalAmount;
    this.takeawaybill=item.totalBill;
  }
})
        }
        // console.log(this.orderSummary,"Hello order Is Here")
      }
    )

}
// getDeliveryOptStr(n:number){
//   switch(n){
//     case 0:
//       this.diningamount=this.orderSummary.totalAmount;
//     break;
//     case 1:
//       this.alltotalAmout=this.orderSummary.totalAmount;
//       break;
//     case 2:
//       this.alltotalAmout=this.orderSummary.totalAmount;
//       break;                  
//     case 3:
//       this.alltotalAmout=this.orderSummary.totalAmount;
//   }
  
// }


  }


