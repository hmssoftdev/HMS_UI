import { ReturnStatement } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs/internal/Subscription';
import { Admin } from '../../models/admin';
import { OrderItem } from '../../models/orderList';
import { setting } from '../../models/setting';
import { OrderStatus, ShoppingCart } from '../../models/shopping-cart';
import { AdminService } from '../../service/admin.service';
import { AuthService } from '../../service/auth.service';
import { CartService } from '../../service/cart.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  @Input() orderId: number;
  @Input() orderTotal: number;
  @Input() cartItems;
  @Input() invoiceno:number; 
  @Output() fnhide:EventEmitter<any> = new EventEmitter();
  orderStatusList: OrderStatus[] = [];
  orderStatusData: OrderStatusData[] = [];
  orderItem: OrderItem[] = [];
  adminData: Admin;
  label:boolean=false;
  showInvoice: boolean = false;
  data:setting;
  orderflow:boolean=true;
  billingDialog:boolean = false;
  selectedUserId: number;
  stateOptions: any[];
  lblIsProceed: boolean;
  paymentMode: string;
  invoiceDialog: boolean;
  deliveryMode: string;
  isSelectDeliveryMode: boolean;
  subscription: Subscription;
  object: any;
  constructor(private adminService: AdminService,public auth:AuthService,public commonService:CommonService,public router:Router,
    private orderSvc: CartService,public comset:CommonService,public msgService:MessageService) { }
    showKOTItems:boolean=true;
  ngOnInit(): void {
    this.comset.obsSetData.subscribe(x=>{
      this.data=x
      console.log(this.data.activeOrderFlow,"Order Stauts")
      if(this.data.activeOrderFlow===0)

      this.orderflow=false
      else if(this.data.activeOrderFlow===1)
      {
          this.orderflow=true
      }
    }
    )
    console.log(this.orderId);
    console.log(this.orderTotal);
    this.orderSvc.getOrderItem(this.orderId).subscribe( (x) => {
      console.log(x);
      this.orderItem = x;
      // const id=this.orderItem.map(res=> res.id)
      // this.orderItem=this.orderItem.filter(res=> res.dishName === res.dishName)
      console.log(this.orderItem);
    })
    console.log(this.orderItem);
    this.orderSvc.getOrderStatus(this.orderId).subscribe( (x) => {
      this.orderStatusList =  x;
      console.log(this.orderStatusList);
      this.orderStatusData = [
        {
          name: "Ordered",
          icon: 'pi pi-shopping-cart',
          status:'pending', //"#9C27B0",
        },
        {
          name: "Processing",
          icon: 'pi pi-cog',
          status: 'pending'// "#673AB7"
        },
        {
          name: "Shipped",
          icon: 'pi pi-envelope',
          status: 'pending' //"#FF9800"
        },
        {
          name: "Delivered",
          icon: 'pi pi-check',
          status: 'pending' //"#607D8B"
        }
      ];
      this.orderStatusList.forEach((value,index)=>{
        this.orderStatusData[index].date = value.createdOn;
        this.orderStatusData[index].status  ="completed" 
      });
    })
    console.log(this.orderStatusData);
  

    this.adminService.getAdmin().subscribe(resp => {
      this.adminData = resp[0];
    })
  }
  invoiceshow(){
    this.label=true;
  }
  fnCashProceed(v) {
    this.paymentMode = "Cash"
    this.lblIsProceed = true;
  }
  fnDeliveryMode(s: string) {
    this.deliveryMode = s;
    console.log(this.deliveryMode);
    if (this.deliveryMode === 'Home Delivery') {
      this.cartItems.deliveryOptionId = 1;
    } else {
      this.cartItems.deliveryOptionId = 2;
    }
    this.isSelectDeliveryMode = true;
  }
  fnUPIProceed() {
    this.paymentMode = 'UPI';
    this.lblIsProceed = true;
  }

  fnResetPayment() {
    this.paymentMode = null;
    this.lblIsProceed = false;
    this.deliveryMode = null;
    this.isSelectDeliveryMode = null;
  }
  fnProceed() {
    // if(this.paymentMode === 'Cash'){
    //   alert('Payment Successful');
    //   this.invoiceDialog = true
    // } else if(this.paymentMode === 'UPI'){
    //   alert('Please scan the QR code and proceed');
    // }
    // if(this.paymentMode === 'Cash'){
    //   this.shoppingCart.paymentMode = 1;
    //   alert('Payment Successful');
    //   this.invoiceDialog = true
    // } else if(this.paymentMode === 'UPI'){
    //   alert('Please scan the QR code and proceed');
    // }
    // var orderStatus : OrderStatus = {status : 1,id:0,orderId:0};
    // this.shoppingCart.orderStatus = [];
    // this.shoppingCart.orderStatus.push(orderStatus);
    // this.shoppingCart.userId = Number(this.selectedUserId);
    // this.router.navigate(['/dish/order-list']);
    console.log(this.cartItems, 'shopping cart');
  
    this.commonService.SettingData$.subscribe(setRes => {
      if(setRes){ 
        const pmObj = {
          id:this.cartItems.id,
          paymentMode:this.paymentMode == 'Cash' ? 1 : 2,
          activeOrderFlow: setRes.activeOrderFlow ? true : false
      }
        this.orderSvc.paymodeModeUpdate(pmObj).subscribe((resp) => {
          if(resp){
          this.msgService.add({ severity: 'success', summary: 'Successfully', detail: 'Completed Payment', life: 2000 });
          
          if(setRes.activeOrderFlow ==2){ 
            this.router.navigate(['/dish/order-list']);
           
          } else {
            const completeOrder = {
              orderId : pmObj.id,
              status : 4
            }
            this.orderSvc.postOrderStatus(completeOrder).subscribe(() => {
              // this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Order Processed', life: 3000 });
            
            })
            
          }
         
        }
        }) 
      }
    })
    
    this.fnhide.emit();
  }

  fnCloseModal() {
    // this.close.emit()
  }
  // fnMakePayment(){
  //   this.billingDialog = true;
  //   this.cartItems.adminId=this.auth.userData().adminId;
  //   this.cartItems.userId;
  //   console.log(this.cartItems,"cart")
  // }
  printing(){
    setTimeout(x=>{
      window.print()
    },1000)
  }
  printinvoice()
  {
    setTimeout(function () {
      window.print();
    },1000)
  }
  

  fnCancelOrder() {
    // Do something
  }
  fnShowInvoice() {
    this.showInvoice = !this.showInvoice;
  }



}
function emptyCart(emptyCart: any) {
  throw new Error('Function not implemented.');
}


export class OrderStatusData{
  name?:string;
  date?:Date ;
  icon:string; 
  status:string = 'pending'
}
