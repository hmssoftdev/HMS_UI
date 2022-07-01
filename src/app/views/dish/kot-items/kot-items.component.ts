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
  constructor(public comset:CommonService,public adminService: AdminService,private cartService: CartService,private userservice:UserService 
    ) {
      this.todaysDataTime = formatDate(this.myDate, 'hh:mm:ss a', 'en-US', '+0530');
     }

  ngOnInit(): void {
    this.orderData=this.orderData.filter(res=>res.orderItems.name != res.orderItems.name)
    
    console.log(this.orderData,"Checking")
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
    // this.cartService.get().subscribe(resp=> this.cartItems = resp);
    // console.log(this.cartItems.grossTotal);
  }

}
