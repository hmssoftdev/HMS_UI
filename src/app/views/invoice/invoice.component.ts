import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { OrderItem } from '../../models/orderList';
import { ShoppingCart } from '../../models/shopping-cart';
import { AdminService } from '../../service/admin.service';
import { CartService } from '../../service/cart.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @Input() adminData: Admin
  @Input() orderItem: OrderItem;
  @Input() cartItems;
  @Input() invoiceno:number
  set:boolean;
  gst:boolean;
  logo:boolean;
  sign:boolean;

  myDate = new Date();
  todaysDataTime:string= '';
  // public cartItems: ShoppingCart; 
  constructor( public adminService: AdminService,private cartService: CartService,public comset:CommonService) { }
  ngOnInit(): void {
    console.log(this.orderItem,'ORDERITEM');
    console.log(this.adminData, 'AdminData');
    // this.cartService.get().subscribe(resp=> this.cartItems = resp);
    // console.log(this.cartItems.grossTotal);
    this.todaysDataTime = formatDate(this.myDate, 'hh:mm:ss a', 'en-US', '+0530');
    this.comset.obsSetData.subscribe(x=>
      {
     if(x)
      {
        const d=x 
        this.set=d.billWithCustomer? true: false;
        this.gst=d.billWithGST? true : false;
        this.logo=d.billWithLOGO? true : false;
        this.sign=d.billWithLOGO? true : false;
      }
      })
    
  }
  printing(){
    setTimeout(function () {
      window.print();
    },1000)
  }
  
}
