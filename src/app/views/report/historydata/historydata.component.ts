import {
  DatePipe
} from '@angular/common';
import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import * as moment from 'moment';
import {
  Historydata
} from '../../../models/historydata';
import {
  OrderList
} from '../../../models/orderList';
import {
  AuthService
} from '../../../service/auth.service';
import {
  UserService
} from '../../../service/user.service';
import { TranslateService } from '@ngx-translate/core';
import { TodaySale } from '../../../models/report';
import { OrderSummary } from '../../../models/OrderSummary';

@Component({
  selector: 'app-historydata',
  templateUrl: './historydata.component.html',
  styleUrls: ['./historydata.component.scss']
})
export class HistorydataComponent implements OnInit {
  
  maxdate: string = '';
  mindate: string = '';
  ids: number;
  todaySale: TodaySale;
  todaySales: TodaySale;
  allstartdate:string='';
  weekenddate:string='';
  monthenddate:string='';
  yearenddate:string='';
  showyeardata = false;
  showweekdata = false;
  showhistorydata = false;
  showmonthdata = false;
  ordersummary:OrderSummary[];
  @Input() ID:number[]
  constructor(private auth: AuthService ,private translate:TranslateService,public user:UserService) {}
  


  ngOnInit(): void {

   
    this.getDates();
    // this.todaySales={
    //   Dining : 0, 
    //   HD : 0,
    //   Takeaway : 0,
    // }
    // if(this.ID[]==undefined){
    //   this.ids = this.auth.userData().adminId;
    // }
  
console.log(this.ids,"hist id ")
  }
  getDates() {
    var currentDate = new Date();
   this.allstartdate = this.getFormatedDate(currentDate);


    var day = currentDate.getDay()
    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - day);
    this.weekenddate = this.getFormatedDate(pastDate);
    console.log(this.weekenddate)
 
    var date = currentDate.getDate()
    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - date);
    this.monthenddate = this.getFormatedDate(pastDate);
    console.log(this.monthenddate);

    var year = currentDate.getFullYear()
    

    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - year);
    let yearenddate = this.getFormatedDate(pastDate);
  }
  getFormatedDate(date: Date) {
    return moment(date).format('YYYY-MM-DD').toString();
  }

  getHistorydata() {
    this.showhistorydata = true;
    this.showweekdata = false;
    this.showyeardata = false;
    this.showmonthdata = false;
  }
  getweekdata() {
    this.showmonthdata = false;
    this.showhistorydata = false;
    this.showweekdata = true;
    this.showyeardata = false;
    if(this.ID ==undefined)
    {
      this.ids=this.auth.userData().adminId;
    }
    else if(this.ID[1]==undefined){
  this.ids=this.auth.userData().adminId;
}
else{
  this.ids=this.ID[1]
}
console.log(this.ids,"hist id ")   
    this.user.getOrderSummary(this.ids, this.allstartdate, this.weekenddate).subscribe(
      res => {
        this.ordersummary = res;
        console.log(this.ordersummary,"week")
        res.map(item => {
          this.todaySales= {
            Dining:this.ordersummary.find(x => x.deliveryOptionId == 1) ==undefined ? 0 : this.ordersummary.find(x => x.deliveryOptionId == 1).totalBill ,
            Takeaway:this.ordersummary.find(x => x.deliveryOptionId == 2)==undefined ? 0 :this.ordersummary.find(x => x.deliveryOptionId == 2).totalBill,
            HD:this.ordersummary.find(x => x.deliveryOptionId == 3)==undefined ?0:this.ordersummary.find(x => x.deliveryOptionId == 3).totalBill,
            dine:this.ordersummary.find(x => x.deliveryOptionId == 1) == undefined ? 0 : this.ordersummary.find(x => x.deliveryOptionId == 1).totalAmount ,
            hd:this.ordersummary.find(x => x.deliveryOptionId == 2) == undefined ? 0 :this.ordersummary.find(x => x.deliveryOptionId == 2).totalAmount,
            takeaway:this.ordersummary.find(x => x.deliveryOptionId == 3)== undefined ? 0 :this.ordersummary.find(x => x.deliveryOptionId == 3).totalAmount,
          }
        });
      });

  }
  getmonthdata() {

    this.showmonthdata = true;
    this.showhistorydata = false;
    this.showweekdata = false;
    this.showyeardata = false;
    if(this.ID == undefined)
    {
      this.ids=this.auth.userData().adminId;
    }
else if(this.ID[1]==undefined){
  this.ids=this.auth.userData().adminId;
}
else{
  this.ids=this.ID[1]
}
console.log(this.ids,"hist id ")
    this.user.getOrderSummary(this.ids, this.allstartdate, this.monthenddate).subscribe(
      res => {
        this.ordersummary = res;

        res.map(item => {
          this.todaySale = {
            Dining: this.ordersummary.find(x => x.deliveryOptionId == 1) ==undefined ? 0 : this.ordersummary.find(x => x.deliveryOptionId == 1).totalBill ,
            Takeaway:this.ordersummary.find(x => x.deliveryOptionId == 2)==undefined? 0 : this.ordersummary.find(x => x.deliveryOptionId == 2).totalBill,
            HD:this.ordersummary.find(x => x.deliveryOptionId == 3)==undefined ? 0 : this.ordersummary.find(x => x.deliveryOptionId == 3).totalBill,
            dine:this.ordersummary.find(x => x.deliveryOptionId == 1) ==undefined ? 0 : this.ordersummary.find(x => x.deliveryOptionId == 1).totalAmount ,
            hd:this.ordersummary.find(x => x.deliveryOptionId == 2)==undefined ? 0 :this.ordersummary.find(x => x.deliveryOptionId == 2).totalAmount,
            takeaway:this.ordersummary.find(x => x.deliveryOptionId == 3)==undefined ? 0 :this.ordersummary.find(x => x.deliveryOptionId == 3).totalAmount,
          }

        });
      });

  
  }
  getyeardata() {
    this.showyeardata = true;
    this.showmonthdata = false;
    this.showhistorydata = false;
    this.showweekdata = false;
  }


}
