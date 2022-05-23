      import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { scan } from 'rxjs/internal/operators';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../service/admin.service';
import { OrderStatus, ShoppingCart } from '../../../models/shopping-cart';
import { CartService } from '../../../service/cart.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ShareDataService } from '../../../service/share-data.service';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../service/common.service';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input() adminData: Admin;
  @Input() shoppingCart: ShoppingCart;
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() emptyCart:EventEmitter<any> = new EventEmitter();
  selectedUserId: number;
  stateOptions: any[];
  lblIsProceed: boolean;
  paymentMode: string;
  invoiceDialog: boolean;
  deliveryMode: string;
  isSelectDeliveryMode: boolean;
  subscription: Subscription;
  object: any;

  constructor(public adminService: AdminService,
    private cartService: CartService,
    private msgService: MessageService,
    private router: Router,
    public data: ShareDataService,
    private commonService: CommonService,) { }


  ngOnInit(): void {
    var testData
    this.data.currentObject.subscribe(
      object => {
        return testData = object;
      }
    );
    console.log(testData);
    this.data.currentMessage.subscribe(message => this.selectedUserId = message);
    console.log(this.selectedUserId);
    console.log(this.shoppingCart);
    console.log(this.adminData);
  }

  fnCashProceed(v) {
    this.paymentMode = "Cash"
    this.lblIsProceed = true;
  }
  fnDeliveryMode(s: string) {
    this.deliveryMode = s;
    console.log(this.deliveryMode);
    if (this.deliveryMode === 'Home Delivery') {
      this.shoppingCart.deliveryOptionId = 1;
    } else {
      this.shoppingCart.deliveryOptionId = 2;
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
    console.log(this.shoppingCart, 'shopping cart');
  
    this.commonService.SettingData$.subscribe(setRes => {
      if(setRes){ 
        const pmObj = {
          id:this.shoppingCart.id,
          paymentMode:this.paymentMode == 'Cash' ? 1 : 2,
          activeOrderFlow: setRes.activeOrderFlow ? true : false
      }
        this.cartService.paymodeModeUpdate(pmObj).subscribe((resp) => {
          if(resp){
            let status:OrderStatus={status : 4};
            status.orderId = this.shoppingCart.id;
            this.cartService.postOrderStatus(status).subscribe( ()=>{
              this.msgService.add({ severity: 'success', summary: 'Table Release', detail: 'Order Processed', life: 2000 });
            })
          this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Cart Item Posted', life: 3000 });
          
          if(setRes.activeOrderFlow === 2 ){ 
            this.router.navigate(['/dish/order-list']);
          } 
          else {
            const completeOrder = {
              orderId : pmObj.id,
              status : 4
            }
            this.cartService.postOrderStatus(completeOrder).subscribe(() => {
              this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Order Processed', life: 3000 });
            
            })
            this.close.emit();
            this.emptyCart.emit()
          }
         
        }
        }) 
      }
    })
    
    
  }

  fnCloseModal() {
    this.close.emit()
  }
}
function emptyCart(emptyCart: any) {
  throw new Error('Function not implemented.');
}

