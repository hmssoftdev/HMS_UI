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
// index :string='0001';

data:setting;
myDate = new Date();
todaysDataTime = '';
selectedTableID: Array < any > = [];
@Input() orderItem: OrderItem;
@Input() cartItems;
set=true;
gst=true;
logo=true;
sign=true;
datas:ShoppingCart[];
  constructor(public comset:CommonService,public adminService: AdminService,private cartService: CartService,private userservice:UserService 
    ) {
      this.todaysDataTime = formatDate(this.myDate, 'hh:mm:ss a', 'en-US', '+0530');
     }

  ngOnInit(): void {
    // this.orderData=this.orderData.filter(res=>res.orderItems.name != res.orderItems.name)

    this.selectedTableID = [];

   this.comset.obsSetData.subscribe(x=>{
      this.data=x;
      if(this.data.billWithCustomer===0 ) 
      {
        this.set=false
      }  
      if(this.data.billWithGST===0){
        this.gst=false;
      }
      if(this.data.billWithLOGO===0)
      {
        this.logo=false;
      }
      if(this.data.billWithSign===0)
      {
        this.sign=false;
      }
   });

    // for (let i = 0; i < this.index.length; i++) {
    //   i++
    // }

    console.log(this.adminData, 'AdminData', this.orderData);
    // this.fncheck()
    // var array = this.orderData.orderItems;
    // console.log(array,"kot array" ,this.billdata,"bil kot")
    // var orderitem = [];
    // array.reduce(function(res, value) {
    
    //   if (orderitem.findIndex(x=>x.name==value.name) == -1) {
    //     orderitem.push({ name: value.name, quantity: 0,price:0, total:0 })
    //   }
    // let index = orderitem.findIndex(x=>x.name==value.name)
    // orderitem[index].quantity +=(value.quantity);
    // orderitem[index].price +=(value.price);
    // orderitem[index].total += (value.price) * (value.quantity);
    //       return res;
    // }, {});
    // console.log(orderitem ,"BIll data check kot");
    // this.cartService.get().subscribe(resp=> this.cartItems = resp);
    // console.log(this.cartItems.grossTotal);
  }

  fncheck()
  {
    this.datas = this.orderData
    for(let i=0;i > this.orderData.orderItems.length;i++){
      
    }
    const kotitem = this.datas.map(x=>x.orderItems)
    this.datas=this.datas.filter(res=>
      {const k =res.orderItems.map(res=> res.name)
      const l =res.orderItems.map(res=> res.name)
      k != l 
      }
      
      )
      console.log(this.datas,"datas check")
      console.log(this.orderData,"Checking")
  }



}
