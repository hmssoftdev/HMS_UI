import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.scss']
})
export class FooditemComponent implements OnInit {
  cars: any[];
  constructor(private translate:TranslateService) {
   
  }

  ngOnInit(): void {
    this.cars = [
      { item: 'noodles', invoice: '101',amount:'1002' },
      { item: 'veg noodles', invoice: '101',amount:'1002' },
      { item: 'rice', invoice: '101',amount:'1002' },
      { field: 'color', header: 'Color' }
  ];
  }

}
