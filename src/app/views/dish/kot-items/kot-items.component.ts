import { Component, OnInit, Input } from '@angular/core';
import { Admin } from '../../../models/admin';
import { OrderItem } from '../../../models/orderList';
import { User } from '../../../models/user';
import { AdminService } from '../../../service/admin.service';
import { CartService } from '../../../service/cart.service';
import { UserService } from './../../../service/user.service';
import { DatePipe } from '@angular/common'
import { DishMenuNewComponent } from '../dish-menu-new/dish-menu-new.component';
@Component({
  selector: 'app-kot-items',
  templateUrl: './kot-items.component.html',
  styleUrls: ['./kot-items.component.scss']
})
export class KOTItemsComponent implements OnInit {
@Input() orderData: any;
@Input() tableNames: any;
@Input() printType: string;
@Input() orderId:any;
@Input() adminData: Admin;
@Input() userdata:User;
selectedUser : DishMenuNewComponent;
myDate = new Date();

@Input() orderItem: OrderItem;
@Input() cartItems;

  constructor(public adminService: AdminService,private cartService: CartService,private userservice:UserService) { }

  ngOnInit(): void {
   
    console.log(this.adminData, 'AdminData');
    // this.cartService.get().subscribe(resp=> this.cartItems = resp);
    // console.log(this.cartItems.grossTotal);
  }

}
