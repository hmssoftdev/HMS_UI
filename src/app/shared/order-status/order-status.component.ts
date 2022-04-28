import { ReturnStatement } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Admin } from '../../models/admin';
import { OrderItem } from '../../models/orderList';
import { setting } from '../../models/setting';
import { OrderStatus, ShoppingCart } from '../../models/shopping-cart';
import { AdminService } from '../../service/admin.service';
import { CartService } from '../../service/cart.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  @Input() orderId: number;
  @Input() orderTotal: number;
  @Input() cartItems;
  orderStatusList: OrderStatus[] = [];
  orderStatusData: OrderStatusData[] = [];
  orderItem: OrderItem[] = [];
  adminData: Admin;
  label:boolean=false;
  showInvoice: boolean = false;
  data:setting;
  orderflow:boolean=true;
  billingDialog:boolean = false;
  constructor(private adminService: AdminService,
    private orderSvc: CartService,public comset:CommonService) { }
    showKOTItems:boolean=true;
  ngOnInit(): void {
    this.comset.obsSetData.subscribe(x=>{
      this.data=x
      console.log(this.data.activeOrderFlow,"Order Stauts")
      if(this.data.activeOrderFlow===0)

      this.orderflow=false
      else if(this.data.activeOrderFlow===1)
      {
          this.orderflow=true
      }
    }
    )
    console.log(this.orderId);
    console.log(this.orderTotal);
    this.orderSvc.getOrderItem(this.orderId).subscribe( (x) => {
      console.log(x);
      this.orderItem = x;
      console.log(this.orderItem);
    })
    console.log(this.orderItem);
    this.orderSvc.getOrderStatus(this.orderId).subscribe( (x) => {
      this.orderStatusList =  x;
      console.log(this.orderStatusList);
      this.orderStatusData = [
        {
          name: "Ordered",
          icon: 'pi pi-shopping-cart',
          status:'pending', //"#9C27B0",
        },
        {
          name: "Processing",
          icon: 'pi pi-cog',
          status: 'pending'// "#673AB7"
        },
        {
          name: "Shipped",
          icon: 'pi pi-envelope',
          status: 'pending' //"#FF9800"
        },
        {
          name: "Delivered",
          icon: 'pi pi-check',
          status: 'pending' //"#607D8B"
        }
      ];
      this.orderStatusList.forEach((value,index)=>{
        this.orderStatusData[index].date = value.createdOn;
        this.orderStatusData[index].status  ="completed" 
      });
    })
    console.log(this.orderStatusData);
  

    this.adminService.getAdmin().subscribe(resp => {
      this.adminData = resp[0];
    })
  }
  invoiceshow(){
    this.label=true;
  }
  fnMakePayment(){
    this.billingDialog = true;
  }
  printing(){
    setTimeout(x=>{
      window.print()
    },1000)
  }
  printinvoice()
  {
    setTimeout(function () {
      window.print();
    },1000)
  }
  

  fnCancelOrder() {
    // Do something
  }
  fnShowInvoice() {
    this.showInvoice = !this.showInvoice;
  }
}
export class OrderStatusData{
  name?:string;
  date?:Date ;
  icon:string; 
  status:string = 'pending'
}