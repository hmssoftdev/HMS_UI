import { Component, Input, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { OrderItem } from '../../models/orderList';
import { ShoppingCart } from '../../models/shopping-cart';
import { AdminService } from '../../service/admin.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @Input() adminData: Admin
  @Input() orderItem: OrderItem;
  @Input() cartItems;
  // public cartItems: ShoppingCart; 
  constructor( public adminService: AdminService,private cartService: CartService) { }
  ngOnInit(): void {
    console.log(this.orderItem,'ORDERITEM');
    console.log(this.adminData, 'AdminData');
    // this.cartService.get().subscribe(resp=> this.cartItems = resp);
    // console.log(this.cartItems.grossTotal);
  }
}
