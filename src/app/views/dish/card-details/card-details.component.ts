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
  message: string;
  userData = JSON.parse(localStorage.getItem('HMSUserData'));
  public cartItems: ShoppingCart;
  totCartPrice: any;
  @Output() fnBillingModal: EventEmitter<any> = new EventEmitter();
  constructor(private cartService: CartService,
    public data: ShareDataService,
    private msgService: MessageService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.cartService.get().subscribe(resp=> this.cartItems = resp);
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
    this.fnBillingModal.emit();
    this.cartItems.items.map(x => {
      x.userId = this.userData.id;
      x.adminId = this.userData.adminId
    });
    this.cartService.postOrder(this.cartItems).subscribe(() => {
      this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Cart Item Posted', life: 30000 });
    })
  }
}
