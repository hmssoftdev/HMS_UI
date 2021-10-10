import { Component, Input, OnInit, OnDestroy, Output, EventEmitter  } from '@angular/core';
import { scan } from 'rxjs/internal/operators';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../service/admin.service';
import { OrderStatus, ShoppingCart } from '../../../models/shopping-cart';
import { CartService } from '../../../service/cart.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ShareDataService } from '../../../service/share-data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input() adminData: Admin;
  @Input() shoppingCart: ShoppingCart;
  @Output() close: EventEmitter<any> = new EventEmitter(); 
  selectedUserId: number;
  stateOptions: any[];
  lblIsProceed: boolean;
  paymentMode: string;
  invoiceDialog: boolean;
  deliveryMode:string;
  isSelectDeliveryMode: boolean;
  subscription: Subscription;
  object: any;
  constructor(public adminService: AdminService,
    private cartService: CartService,
    private msgService: MessageService,
    private router: Router,
    public data: ShareDataService) { }


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

  fnCashProceed(v){
    this.paymentMode = "Cash"
    this.lblIsProceed = true;
  }
  fnDeliveryMode(s:string){
    this.deliveryMode = s;
    console.log(this.deliveryMode);
    if(this.deliveryMode === 'Home Delivery'){
    this.shoppingCart.deliveryOptionId = 1;
  } else {
    this.shoppingCart.deliveryOptionId = 2;
  }
    this.isSelectDeliveryMode = true;
  }
  fnUPIProceed(){
    this.paymentMode = 'UPI';
    this.lblIsProceed = true;
  }

  fnResetPayment(){
    this.paymentMode = null;
    this.lblIsProceed = false;
    this.deliveryMode = null;
    this.isSelectDeliveryMode = null;
  }
  fnProceed(){
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
    var orderStatus : OrderStatus = {status : 1,id:0,orderId:0};
    this.shoppingCart.orderStatus = [];
    this.shoppingCart.orderStatus.push(orderStatus);
    this.shoppingCart.userId = Number(this.selectedUserId);
    console.log(this.shoppingCart);
    this.cartService.postOrder(this.shoppingCart).subscribe(() => {
      this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Cart Item Posted', life: 3000 });
      this.router.navigate(['/dish/order-list']);
    })
  }

  fnCloseModal(){
    this.close.emit()
  }
}
