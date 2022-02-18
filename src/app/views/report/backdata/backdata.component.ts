
import { Component, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Historydata } from '../../../models/historydata';
import { AuthService } from '../../../service/auth.service';
import { EnumService } from '../../../service/enum.service';
import { UserService } from '../../../service/user.service';
@Component({
  selector: 'app-backdata',
  templateUrl: './backdata.component.html',
  styleUrls: ['./backdata.component.scss']
})
export class BackdataComponent implements OnInit {
  @Input() maxDate :string;
  @Input() minDate :string;
  @Input() ID :number;
  @Input() deliveryMode : number = 0;
  @Input() cartItems;

  historydata: Historydata[] = [];
  order: Historydata[]=[];
  cartData:Historydata[]=[];
  loading :boolean = true;
  date =new Date();
  selectedOrderId: number = 0;
  selectedOrderTotal: number=0;
  Dialog: boolean;
  constructor(private auth :AuthService,private user:UserService, private enumService:EnumService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getHistorydata();
    this.ID=this.auth.userData().adminId;
  }
  getHistorydata(){
    let maxnewDate = moment(this.maxDate).format('YYYY-MM-DD').toString();
    let minnewDate = moment(this.minDate).format('YYYY-MM-DD').toString();
  

  this.user.getBillHistory(this.ID,maxnewDate,minnewDate).subscribe(
    x=>{
       this.historydata = x;
 
      
       this.loading  = false;

      return this.historydata;
    }
  )
  }
  fnViewOrder(data){

   this.selectedOrderId=data.id;
  this.selectedOrderTotal = data.grossTotal;
  this.cartData=data;
  
  this.Dialog=true;
  }
  delete(item:string) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete '+ '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      
      });
    }
}

