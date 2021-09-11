import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish';
import { DishService } from '../../../service/dish.service';
import { CartService } from '../../../service/cart.service';
import { OrderStatus, ShoppingCart } from '../../../models/shopping-cart';
import { OrderList } from '../../../models/orderList';
import { MessageService } from 'primeng/api';

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
  orderStatusDialog:boolean;
  constructor(private dishSvc: DishService,
    private orderService: CartService,
    private msgService: MessageService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    debugger;
    this.orderService.getOrder().subscribe(res => {
      this.orderList = res;
    });
  }
  fnViewOrder(order: OrderList){
    this.selectedOrderId = order.id;
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
}
