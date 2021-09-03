import { Component, Input, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
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
  public cartItems: ShoppingCart; 
  constructor( public adminService: AdminService,private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.get().subscribe(resp=> this.cartItems = resp);
    console.log(this.cartItems.grossTotal);
  }
}
