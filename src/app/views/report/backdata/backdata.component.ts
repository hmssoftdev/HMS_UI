
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
  num:number=2236;

  constructor(private msgService:MessageService,
    private auth :AuthService,private user:UserService,
     private enumService:EnumService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getHistorydata();
    this.ID=this.auth.userData().adminId;
    console.log(this.auth.userData(),"id")
  }
  getHistorydata(){
    let maxnewDate = moment(this.maxDate).format('YYYY-MM-DD').toString();
    let minnewDate = moment(this.minDate).format('YYYY-MM-DD').toString();
  

  this.user.getBillHistory(this.ID,maxnewDate,minnewDate).subscribe(
    x=>{
       this.historydata = x;

        console.log(this.historydata)
       this.loading  = false;

      return this.historydata;
    }
  )


  }
  getPaymentMode(n:number){
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
  }
  deleteOrder(id:number) {
   this.user.DeleteUserHistorydata(id).subscribe(()=>
         {

          this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Bill Deleted', life: 3000 });
           this.getHistorydata();
         })

    // let maxnewDate = moment(this.maxDate).format('YYYY-MM-DD').toString();
    // let minnewDate = moment(this.minDate).format('YYYY-MM-DD').toString();
    // this.user.getBillHistory(this.ID,maxnewDate,minnewDate).subscribe(res=>{
    //   let bill;
    //  bill=res

    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete '+ '?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     let number=2236;
    //     this.user.DeleteUserHistorydata(number).subscribe(()=>
    //     {
    //       this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Bill Deleted', life: 3000 });
    //     })
    

    //   }
    // // })
    //   });
    }


  fnViewOrder(data){

   this.selectedOrderId=data.id;
  this.selectedOrderTotal = data.grossTotal;
  this.cartData=data;
  
  this.Dialog=true;
  }
  
}

