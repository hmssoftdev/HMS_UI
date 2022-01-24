import { Component, OnInit } from '@angular/core';
import { DishCategory } from '../../../models/dish';
import { ShoppingCart } from '../../../models/shopping-cart';
import { AuthService } from '../../../service/auth.service';
import { CartService } from '../../../service/cart.service';
import { DishService } from '../../../service/dish.service';
import { ShareDataService } from '../../../service/share-data.service';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  sendId: number;
  public cartItems: ShoppingCart;
  storage: Storage;
  totCartPrice: any;
  userData: any;
  CategoryList: DishCategory[];
  constructor( private categorySvc: DishService, private cartService: CartService, private authService: AuthService, private storageService: StorageService,
    private shareData: ShareDataService) { }

  ngOnInit(): void {
    this.shareData.currentId.subscribe(id => this.sendId =  id);
    this.loadCategory();
    this.cartService.get().subscribe(resp => this.cartItems = resp);
    let itemPrice = this.cartItems.orderItems.map( x => x.price);
    console.log(itemPrice);
    let gst =  this.CategoryList.map(x => x.gstCompliance);
    console.log(gst);
    // this.cartService.get().subscribe(res => {
    //   this.cartItems = res.items.map(x => x.price * )
    // })
    this.userData = this.authService.userData(); 
  }
  loadCategory(){
    this.categorySvc.getDishCategory(this.sendId).subscribe(x => {
      this.CategoryList = x;
      console.log(x);
    });
  }

  fnCompleteOrder() {
    this.cartService.empty();
    alert("Thank you for your order, it will be dispatched shortly!")
  }

}




