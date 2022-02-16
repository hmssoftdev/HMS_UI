import {
  DatePipe
} from '@angular/common';
import {
  Component,
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

@Component({
  selector: 'app-historydata',
  templateUrl: './historydata.component.html',
  styleUrls: ['./historydata.component.scss']
})
export class HistorydataComponent implements OnInit {
  showhistorydata = false;
  maxdate: string = '';
  mindate: string = '';
  id: number;
  showmonthdata = false;
  today = new Date();
  showyeardata = false;
  showweekdata = false;
  constructor(private auth: AuthService) {}


  ngOnInit(): void {

    this.id = this.auth.userData().adminId;
    this.getDates();
  }
  getDates() {
    var currentDate = new Date();
    let weekstartdate = this.getFormatedDate(currentDate);
    var day = currentDate.getDay()
    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - day);
    let weekenddate = moment(pastDate).format('YYYY-MM-DD').toString();

    var currentDate = new Date();
    var date = currentDate.getDate()
    let monthstartdate = moment(currentDate).format('YYYY-MM-DD').toString();

    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - date);
    let monthenddate = moment(pastDate).format('YYYY-MM-DD').toString();


    var year = currentDate.getFullYear()
    let yearstartdate = moment(currentDate).format('YYYY-MM-DD').toString();

    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - year);
    let yearenddate = moment(pastDate).format('YYYY-MM-DD').toString();
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
  }
  getmonthdata() {

    this.showmonthdata = true;
    this.showhistorydata = false;
    this.showweekdata = false;
    this.showyeardata = false;
  }
  getyeardata() {
    this.showyeardata = true;
    this.showmonthdata = false;
    this.showhistorydata = false;
    this.showweekdata = false;
  }
}
