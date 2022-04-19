import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { Dish } from '../../../models/dish';
import { ShoppingCart } from '../../../models/shopping-cart';
import { User } from '../../../models/user';
import { CartService } from '../../../service/cart.service';
import { ShareDataService } from '../../../service/share-data.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  selectedUserId: number;
  userData = JSON.parse(sessionStorage.getItem('HMSUserData'));
  public cartItems: ShoppingCart;
  totCartPrice: any;
  deliveryMode: string;
  diningTableDialog:boolean;
  //userData:any;
  selectedUser: number;
  userDialog: boolean;
  submitted: boolean;
  usersList: any[];
  user: User;
  @Output() fnBillingModal: EventEmitter<any> = new EventEmitter();
  @Output() KOTPrint : EventEmitter<any> = new EventEmitter();
  @Output() BillPrint : EventEmitter<any> = new EventEmitter();

  constructor(private cartService: CartService,
    public dataService: ShareDataService,
    private msgService: MessageService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(message => this.selectedUserId = message);
    this.loadUserData();
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
  
  // New Items
  fnDeliveryMode(s:string){
    this.deliveryMode = s;
    if(s =='Dining'){
      this.diningTableDialog = true;
    } 
  }
  
  loadUserData() {
    this.userService.getUserList().subscribe(res => {
      this.usersList = res.map(CItem => {
        return { label: CItem.contact, value: CItem.id }
      })
    });
  }
  userSelection(user) {
    this.dataService.changeMessage(this.selectedUser);
  }
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }
  fnSaveUser(event){
    this.usersList = event;
    this.userDialog = false;
    this.loadUserData();
  }
}
