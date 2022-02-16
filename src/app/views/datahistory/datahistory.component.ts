import { Component, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Historydata } from '../../models/historydata';
import { EnumService } from '../../service/enum.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-datahistory',
  templateUrl: './datahistory.component.html',
  styleUrls: ['./datahistory.component.scss']
})
export class DatahistoryComponent implements OnInit {
  @Input() maxDate :string;
  @Input() minDate :string;
  @Input() ID :number;
  @Input() deliveryMode : number = 0;
  historydata: Historydata[] = [];
  data: Historydata[]=[];
  loading :boolean = true;

  constructor(private user:UserService, private enumService:EnumService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getHistorydata();
    console.log("Hello Data");
  }
  getHistorydata(){
    let maxnewDate = moment(this.maxDate).format('YYYY-MM-DD').toString();
    let minnewDate = moment(this.minDate).format('YYYY-MM-DD').toString();
  

  this.user.getBillHistory(this.ID,maxnewDate,minnewDate).subscribe(
    x=>{
       this.historydata = x;
       if(this.deliveryMode > 0)
       this.historydata =  this.historydata.filter(x=>x.deliveryOptionId==this.deliveryMode);
       this.loading  = false;

      return this.historydata;
    }
  )
  }
getDeliveryMode(id:number) : string{
 return this.enumService.getDeliveryOptStr(id);
}
delete(item:string) {
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete '+ '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    
    });
  }




}


