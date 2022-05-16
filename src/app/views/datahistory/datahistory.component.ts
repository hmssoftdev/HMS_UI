import { Component, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Admin } from '../../models/admin';

import { Historydata } from '../../models/historydata';
import { OrderItem, OrderList } from '../../models/orderList';
import { AdminService } from '../../service/admin.service';
import { AuthService } from '../../service/auth.service';
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
  id:number;
  name:string;
  selectedOrderId: number = 0;
  selectedOrderTotal: number=0;
  number:number;
  invoice:number;
  constructor(public message:MessageService,public adminService: AdminService,public auth:AuthService,
    private user:UserService, private enumService:EnumService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getHistorydata();
    
    this.name=this.auth.userData().name;
    
    // this.number=this.auth.userData().contact;
    // console.log( this.auth.userData(), "Number Check")
    // console.log(this.name,"name");

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
      // if(this.historydata.)
      console.log(this.historydata,"response")
      // this.invoice = this.historydata.map(res=> res.invoiceNumber);

      return this.historydata;
    }
  )
  this.enumService.getPaymentMode(this.id);
  }
getDeliveryMode(id:number) : string{
 return this.enumService.getDeliveryOptStr(id);
}

deleteItem(n:number){
  this.user.DeleteUserHistorydata(n).subscribe(x=>{
    this.message.add({ severity: 'success', summary: 'Successful', detail: 'Bill Deleted', life: 3000 });
           this.getHistorydata();
  })
}

getPaymentMode(n:number){
  this.number=n;
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
fnhide(){
  this.Dialog=false
  this.getHistorydata();
 this.getPaymentMode(this.number); 
}
fnViewOrder(data){
  console.log(data);
 this.selectedOrderId=data.id;
 this.invoice=data.invoiceNumber;

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


