import {
  Component,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import {
  graphs
} from '../../models/graphs';
import {
  OrderSummary
} from '../../models/OrderSummary';
import {
  TodaySale
} from '../../models/report';
import {
  AuthService
} from '../../service/auth.service';
import { CommonService } from '../../service/common.service';
import {
  UserService
} from '../../service/user.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  bardine: number;
  barhd: number;
  bartake: number;
  allstartdate: string = '';
  weekenddate: string = '';
  todaySale: TodaySale;
  ID: number;
  ordersummary: OrderSummary[];
  dateValuee: Date;
  dateValue: Date;
  dataa: any;
  chartOptionss: any;
  datadoughnut: any;
  data: any;
  chartOptions: any;

  constructor(public user: UserService, public auth: AuthService,public translate:TranslateService,comset:CommonService) {

    comset.Obslangauge.subscribe(res=>{
      translate.use(res);
    })
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
    this.ID = this.auth.userData().adminId;
  }

  getSummaryData() {
    var currentDate = new Date();
    this.allstartdate = moment(currentDate).format('YYYY-MM-DD').toString();
    var day = currentDate.getDay()
    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - day);
    this.weekenddate = moment(pastDate).format('YYYY-MM-DD').toString();
    this.user.getOrderSummary(this.auth.userData().adminId, this.allstartdate, this.weekenddate).subscribe(
      res => {
        this.ordersummary = res;

        res.map(item => {
          this.todaySale = {
            Dining: this.ordersummary.find(x => x.deliveryOptionId == 1).totalBill,
            Takeaway:this.ordersummary.find(x => x.deliveryOptionId == 2).totalBill,
            HD:this.ordersummary.find(x => x.deliveryOptionId == 3).totalBill,
            dine:this.ordersummary.find(x => x.deliveryOptionId == 1).totalAmount,
            hd:this.ordersummary.find(x => x.deliveryOptionId == 2).totalAmount,
            takeaway:this.ordersummary.find(x => x.deliveryOptionId == 3).totalAmount,
          }
        });
      });

  }
}
