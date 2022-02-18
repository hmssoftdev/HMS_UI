import { Component, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Admin } from '../../models/admin';

import { Historydata } from '../../models/historydata';
import { OrderItem, OrderList } from '../../models/orderList';
import { AdminService } from '../../service/admin.service';
import { CartService } from '../../service/cart.service';
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
  @Input() cartItems;
  historydata: Historydata[] = [];
  data: Historydata[]=[];
  loading :boolean = true;
  Dialog:boolean;
  orderItem: OrderItem[] = [];
  adminData: Admin;
  cartData: OrderList;
  
 
  selectedOrderId: number = 0;
  selectedOrderTotal: number=0;
  constructor(public adminService: AdminService,private user:UserService, private enumService:EnumService,private confirmationService: ConfirmationService) { }

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

fnViewOrder(data){
  console.log(data);
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


