import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.scss']
})
export class FooditemComponent implements OnInit {
  cars: any[];
  constructor() { }

  ngOnInit(): void {
    this.cars = [
      { item: 'noodles', invoice: '101',amount:'1002' },
      { item: 'veg noodles', invoice: '101',amount:'1002' },
      { item: 'rice', invoice: '101',amount:'1002' },
      { field: 'color', header: 'Color' }
  ];
  }

}
