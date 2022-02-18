import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-topdata',
  templateUrl: './topdata.component.html',
 styleUrls: ['./topdata.component.scss']
})
export class TopdataComponent implements OnInit {
  strtdate=new Date();
  startdate:string='';
  enddate:string='';
  id:number;
  constructor(private auth:AuthService) { }
    ngOnInit(): void {
      this.startdate=moment(this.strtdate).format('YYYY-MM-DD').toString();
      this.enddate=moment(this.strtdate).format('YYYY-MM-DD').toString();
      this.id=this.auth.userData().adminId;
}
}
  