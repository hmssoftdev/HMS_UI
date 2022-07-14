import { Component, OnInit, Input } from '@angular/core';
import { Admin } from '../../../models/admin';
import { OrderItem } from '../../../models/orderList';
import { User } from '../../../models/user';
import { AdminService } from '../../../service/admin.service';
import { CartService } from '../../../service/cart.service';
import { UserService } from './../../../service/user.service';
import { DatePipe, formatDate } from '@angular/common'
import { DishMenuNewComponent } from '../dish-menu-new/dish-menu-new.component';
import { CommonService } from '../../../service/common.service';
import { setting } from '../../../models/setting';
import { ShoppingCart } from '../../../models/shopping-cart';
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
@Input() invoiceno:any;
// @Input() carts:any;
// index :string='0001';

data:setting;
myDate = new Date();
todaysDataTime = '';
selectedTableID: Array < any > = [];

set=true;
gst=true;
logo=true;
sign=true;
// datas:ShoppingCart[];
billdata :any ;
  constructor(public comset:CommonService,public adminService: AdminService,private cartService: CartService,private userservice:UserService 
    ) {
      this.todaysDataTime = formatDate(this.myDate, 'hh:mm:ss a', 'en-US', '+0530');
     }

  ngOnInit(): void {
    // this.orderData=this.orderData.filter(res=>res.orderItems.name != res.orderItems.name)
      // console.log(this.carts,"carts")
    this.selectedTableID = [];
    // this.cartService.get().subscribe(resp =>{
    //   this.cartItems = resp;
    // })
    // console.log(this.cartItems,"kot bill pap")
   this.comset.obsSetData.subscribe(x=>{
      this.data=x;
      const d=x;
      this.set=d.billWithCustomer ? true :false;
      // if(this.data.billWithCustomer===0 ) 
      // {
      //   this.set=false
      // }  
      this.gst=d.billWithGST ? true :false;
      // if(this.data.billWithGST===0){
      //   this.gst=false;
      // }
      this.logo=d.billWithLOGO ? true :false;
      // if(this.data.billWithLOGO===0)
      // {
      //   this.logo=false;
      // }
      this.sign=d.billWithSign ? true :false;
      // if(this.data.billWithSign===0)
      // {
      //   this.sign=false;
      // }
   });

  

    console.log(this.adminData, 'AdminData', this.orderData);
    // this.fncheck()
    var arrays = this.orderData.orderItems;
    console.log(arrays,"array check")
    var orderitem = [];
    arrays.reduce(function(res, value) {
    
      if (orderitem.findIndex(x=>x.name==value.name) == -1) {
        orderitem.push({ name: value.name, quantity: 0,price:0, total:0 })
      }
    let index = orderitem.findIndex(x=>x.name==value.name)
    orderitem[index].quantity +=(value.quantity);
    orderitem[index].price +=(value.price);
    orderitem[index].total += (value.price) * (value.quantity);
          return res;
    }, {});
    // this.orderData.orderItems=orderitem
    console.log(orderitem ,"BIll data check kot",this.billdata);
    // this.cartService.get().subscribe(resp=> this.cartItems = resp);
    // console.log(this.cartItems.grossTotal);
  }

  // fncheck()
  // {
  //   this.datas = this.orderData
  //   for(let i=0;i > this.orderData.orderItems.length;i++){
      
  //   }
  //   const kotitem = this.datas.map(x=>x.orderItems)
  //   this.datas=this.datas.filter(res=>
  //     {const k =res.orderItems.map(res=> res.name)
  //     const l =res.orderItems.map(res=> res.name)
  //     k != l 
  //     }
      
  //     )
  //     console.log(this.datas,"datas check")
  //     console.log(this.orderData,"Checking")
  // }



}
