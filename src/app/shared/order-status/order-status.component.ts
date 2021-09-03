import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  orderStatusData: Array<any>;
  constructor() { }

  ngOnInit(): void {
    this.orderStatusData = [
      {
        name: "Ordered",
        date: "15/10/2020 10:30",
        icon: 'pi pi-shopping-cart',
        status:'completed', //"#9C27B0",
        image: "game-controller.jpg"
      },
      {
        name: "Processing",
        date: "15/10/2020 14:00",
        icon: 'pi pi-cog',
        status: 'running'// "#673AB7"
      },
      {
        name: "Shipped",
        date: "15/10/2020 16:15",
        icon: 'pi pi-envelope',
        status: 'pending' //"#FF9800"
      },
      {
        name: "Delivered",
        date: "16/10/2020 10:00",
        icon: 'pi pi-check',
        status: 'pending' //"#607D8B"
      }
    ];
  }

}
