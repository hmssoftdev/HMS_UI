import {
  Component,
  OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Admin } from '../../models/admin';
import { franchis } from '../../models/franchise';
import {
  graphs
} from '../../models/graphs';
import {
  OrderSummary
} from '../../models/OrderSummary';
import {
  TodaySale
} from '../../models/report';
import { AdminService } from '../../service/admin.service';
import {
  AuthService
} from '../../service/auth.service';
import { CapnfranService } from '../../service/capnfran.service';
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
  ID: number[];
  ordersummary: OrderSummary[];
  dateValuee: Date;
  dateValue: Date;
  dataa: any;
  chartOptionss: any;
  datadoughnut: any;
  data: any;
  chartOptions: any;
  frachlist:franchis[];
  selectedCities:any[]
  selectedHotel:any[]
  userData:any;
  show:boolean;

  constructor(public user: UserService,public adminService: AdminService, public auth: AuthService,public translate:TranslateService,comset:CommonService,public capnfran:CapnfranService) {

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
    // this.getSummaryData();
    
    this.userData=this.auth.userData();
    this.frachiseget()
    this.fnshowData(this.show)
  }
  fnshowData(shows:boolean){
    this.show=shows
  }
  frachiseget(){
    this.capnfran.GetFranchise(this.auth.userData().adminId).subscribe(x=>{
      this.frachlist=x
     
      return this.frachlist;
    })
    // this.adminService.getClientList().subscribe(res => {
    //   this.adminList=res
    // })
  }

  fnadminReport(){
    this.ID =[ this.auth.userData().adminId]
    this.show=true
  }
  franchSelection(){
    
    this.ID =[ this.auth.userData().adminId,
      this.selectedHotel ]
      this.show=true
      console.log(this.ID,"id check")
   
  }
  franlocationSelection(){
    this.ID =[ this.auth.userData().adminId,
      this.selectedCities ]
      this.show=true
      console.log(this.ID,"id check")
  }
  // getSummaryData() {
  //   var currentDate = new Date();
  //   this.allstartdate = moment(currentDate).format('YYYY-MM-DD').toString();
  //   var day = currentDate.getDay()
  //   var pastDate = new Date(currentDate)
  //   pastDate.setDate(pastDate.getDate() - day);
  //   this.weekenddate = moment(pastDate).format('YYYY-MM-DD').toString();
  //   this.user.getOrderSummary(this.auth.userData().adminId, this.allstartdate, this.weekenddate).subscribe(
  //     res => {
  //       this.ordersummary = res;

  //       res.map(item => {
  //         this.todaySale = {
  //           Dining: this.ordersummary.find(x => x.deliveryOptionId == 1)==undefined ?0 :this.ordersummary.find(x => x.deliveryOptionId == 1) .totalBill,
  //           Takeaway:this.ordersummary.find(x => x.deliveryOptionId == 2).totalBill,
  //           HD:this.ordersummary.find(x => x.deliveryOptionId == 3).totalBill,
  //           dine:this.ordersummary.find(x => x.deliveryOptionId == 1)==undefined ?0: this.ordersummary.find(x => x.deliveryOptionId == 1).totalAmount,
  //           hd:this.ordersummary.find(x => x.deliveryOptionId == 2).totalAmount,
  //           takeaway:this.ordersummary.find(x => x.deliveryOptionId == 3).totalAmount,
  //         }
  //       });
  //     });

  // }
}
