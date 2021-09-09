import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish';
import { DishService } from '../../../service/dish.service';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  dishList: Dish[];
  selectedDishes: Dish[];
  orderStatusDialog:boolean;
  constructor(private dishSvc: DishService,
    private orderService: CartService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.dishSvc.getList().subscribe(res => {
      this.dishList = res;
    });
  }
  fnViewOrder(){
    this.orderStatusDialog =true;
  }
  fnProcessing(){ 
  }
  fnShipping(){  
  }
  fnCompleted(){ 
  }
  fnCancelOrder(){

  }
}
