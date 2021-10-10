import { Component, OnInit,ViewChild } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Dish, DishCategory } from '../../../models/dish';
import { DishService } from '../../../service/dish.service';
import { ShareDataService } from '../../../service/share-data.service'; 
@Component({
  selector: 'app-dish-menu-new',
  templateUrl: './dish-menu-new.component.html',
  styleUrls: ['./dish-menu-new.component.scss']
})
export class DishMenuNewComponent implements OnInit {
  dishes: Dish[];
  sendId: number;
  rawDishCategoyItems: DishCategory[];
  dishCategory: any;
  sortField: string;
  sortOrder: number;
  sortOptions: any[];
  toggle: any;
  status: any;
  categoryFilter: Dish[];
  constructor(private dishService: DishService,
    private primengConfig: PrimeNGConfig,
      private dataService: ShareDataService) { }

  ngOnInit(): void {
    this.dataService.currentId.subscribe(resp => this.sendId = resp)
    this.dishService.getList(this.sendId).subscribe(data => {
      this.dishes = data;
    });
    this.fnGetDishCategoy();
    this.sortOptions = [
      { label: 'Price High to Low', value: '!fullPrice' },
      { label: 'Price Low to High', value: 'fullPrice' }
    ];
  } 
  // Get Category
  fnGetDishCategoy() {
    this.dishService.getDishCategory(this.sendId).subscribe((x: DishCategory[]) => {
      this.rawDishCategoyItems = x;
      this.dishCategory = x.map(cItem => {
        return { label: cItem.name, value: cItem.name }
      })
    });
  }
  onCategoryFilter(category) {
    // this.toggle = !this.toggle;
    // this.status = category;
    // this.categoryFilter = this.dishes.filter((categoryVal) => categoryVal.dishCategory === category.value);
    console.log(this.dishes)
    //this.table.filter(category.value, 'category', 'in');
    debugger
  }
  onCategoryChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = -1;
      this.sortField = value;
    }

  }
}
