import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Dish } from '../../../models/dish';
import { ShoppingCart } from '../../../models/shopping-cart';
import { CartService } from '../../../service/cart.service';
import { ShareDataService } from '../../../service/share-data.service';


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  selectedUserId: number;
  userData = JSON.parse(sessionStorage.getItem('HMSUserData'));
  public cartItems: ShoppingCart;
  totCartPrice: any;
  @Output() fnBillingModal: EventEmitter<any> = new EventEmitter();
  @Output() KOTPrint : EventEmitter<any> = new EventEmitter();
  @Output() BillPrint : EventEmitter<any> = new EventEmitter();

  constructor(private cartService: CartService,
    public data: ShareDataService,
    private msgService: MessageService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.selectedUserId = message);
    console.log(this.selectedUserId);
    this.cartService.empty();
    this.cartService.get().subscribe((resp:ShoppingCart)=> this.cartItems = resp);
  }
  addItem(item){
    this.cartService.addItem(item,1);
  } 
  removeItem(item){
    this.cartService.addItem(item,-1)
  }
  emptyCart(){
    this.cartService.empty();
  }
  fnMakePayment(){
    // this.fnBillingModal.emit();
    // this.cartItems.userId = this.selectedUserId;
    // this.cartItems.adminId = this.userData.adminId;

    this.fnBillingModal.emit(this.cartItems);
    this.cartItems.userId = this.selectedUserId;
    console.log(this.cartItems.userId);
    this.cartItems.adminId = this.userData.adminId;
    // console.log(this.cartItems);
    // this.cartService.postOrder(this.cartItems).subscribe(() => {
    //   this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Cart Item Posted', life: 30000 });
    // })
  }
  fnDiscountCal(value){
    this.cartItems.discountInPercent  = parseInt(value);
    this.cartItems.discountInRupees = (this.cartItems.grossTotal * value) / 100; 
    this.cartItems.grossTotal = this.cartItems.grossTotal - this.cartItems.discountInRupees;
  }
  fnAdditionalAmount(event){
    debugger
    console.log(event.target.value, "VALUE")
    this.cartItems.additionalAmount  = parseInt(event.target.value);
    this.cartItems.grossTotal = this.cartItems.grossTotal + this.cartItems.additionalAmount;
  }
  fnKOTPrint(){
    // this.cartService.get().subscribe(resp=> {
    //   if(resp){
        this.KOTPrint.emit(this.cartItems);
    //   }
    // })
  }
  fnBillPrint(){
    this.BillPrint.emit(this.cartItems)
  }
}
