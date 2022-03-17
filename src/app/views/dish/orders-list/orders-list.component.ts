import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish';
import { DishService } from '../../../service/dish.service';
import { CartService } from '../../../service/cart.service';
import { OrderStatus, ShoppingCart } from '../../../models/shopping-cart';
import { OrderList } from '../../../models/orderList';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../service/auth.service';

import { Historydata } from '../../../models/historydata';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orderList: OrderList[] = [];
  statusValue: string;
  selectedDishes: Dish[];
  orderStatus: OrderStatus = new OrderStatus();
  selectedOrderId: number = 0;
  selectedOrderTotal: number = 0;
  orderStatusDialog:boolean;
  cartData: OrderList;
  constructor(
    private dishSvc: DishService,
    private orderService: CartService,
    private msgService: MessageService,
    private authService: AuthService,
   public translate:TranslateService,
    ) { 
      translate.addLangs(['english', 'hindi','gujrati','marathi','bengali']);
    translate.setDefaultLang('english');
        
             
    }
    switchLang(lang: string) {
      this.translate.use(lang);
    }

  ngOnInit(): void {
    this.authService.showLoader = true;
    this.loadData();
  }
  loadData() {
    this.orderService.getOrder().subscribe(res => {
      this.orderList = res;
    this.authService.showLoader = false;
    });
  }
  fnViewOrder(order: Historydata){

    this.selectedOrderId = order.id;
    this.selectedOrderTotal = order.grossTotal;
    this.cartData = order;
    this.orderStatusDialog =true;
  }
  fnProcessing(order: OrderList){ 
    this.processStatus(order.id, 2);
  }
  fnShipping(order: OrderList){  
    this.processStatus(order.id, 3);
  }
  fnCompleted(order: OrderList){ 
    this.processStatus(order.id, 4);
  }
  fnCancelOrder(order: OrderList){
    this.processStatus(order.id, 10);

  }

  processStatus(id: number, status: number){
    this.orderStatus.orderId = id;
    this.orderStatus.status = status;
    this.orderService.postOrderStatus(this.orderStatus).subscribe(() => {
      this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Order Processed', life: 3000 });
      this.loadData();
    })
  }
  getDeliveryOptStr(n:number){
    let strVal= '';
    switch(n){
      case 1:
        strVal = 'Dining';
        break;
      case 2:
        strVal = 'Home Delivery';
        break;                  
      case 3:
        strVal = 'Take Away'
    }
    return strVal;
  }

  getPaymentMode(n:number){
    let strVal= '-';
    switch(n){
      case 1:
        strVal = 'Cash';
        break;
      case 2:
        strVal = 'UPI';
        break;   
    }
    return strVal;
  }
}
