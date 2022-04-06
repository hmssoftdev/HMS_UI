import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Dish, DishCategory } from '../../../models/dish';
import { AuthService } from '../../../service/auth.service';
import { DishService } from '../../../service/dish.service';
import { ShareDataService } from '../../../service/share-data.service';
import { TranslateService } from "@ngx-translate/core";
import { UserService } from '../../../service/user.service';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-dish-category-config',
  templateUrl: './dish-category-config.component.html',
  styleUrls: ['./dish-category-config.component.scss']
})
export class DishCategoryConfigComponent implements OnInit {
  status: {label: string; value: string;}[];
  dishCategory: DishCategory;
  category: DishCategory;
  CategoryList: DishCategory[];
  selectedCategories: Dish[];
  categoryDialog: boolean;
  submitted: boolean;
  sendId:number;
  dishList: Dish[];
  dish: Dish;
  lang:any;
  constructor(
    private categorySvc: DishService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private shareData: ShareDataService,
    private authService: AuthService,
    public translate:TranslateService,
    public user:UserService,
    public comset:CommonService
    ) {
     
       
   
     }
   

  ngOnInit(): void {
    this.authService.showLoader = true;
    this.status = [{ label: 'Active', value: 'active' },
    { label: 'InActive', value: 'inactive' }];
    // this.dishCategory = {};
    this.loadCategory();
    this.comset.Obslangauge.subscribe(x=>{
      this.lang=x;
      this.translate.use(this.lang);
    })
    // this.user.langdata.subscribe( (x:any)=>{
     
    //   this.translate.use(x);
    //   console.log(x)

    // })
    console.log("Hitting Language")
   
  }
  loadCategory() {
    this.shareData.currentId.subscribe(id => this.sendId = id);
    this.categorySvc.getDishCategory(this.sendId).subscribe(x => {
      this.CategoryList = x;
    this.authService.showLoader = false;
    });
  }

  openNew() {
    this.category = new DishCategory();
    this.submitted = false;
    this.categoryDialog = true;
    this.category.gstCompliance=0;
  }
  hideDialog() {
    this.categoryDialog = false;
    this.submitted = false;
  }

  editDish(category: DishCategory) {
    this.category = { ...category };
    this.categoryDialog = true;
  }
  //to delete dish item 
  deleteCategory(category: DishCategory) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + category.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categorySvc.deleteCategoryData(category.id).subscribe(() => {
          this.CategoryList = this.CategoryList.filter(val => val.id !== category.id);
          this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Category Deleted', life: 3000 });
        })
      }
    });
  }

  onSubmit(f) {
    this.submitted = true;
    if (f.invalid) return;
    if (this.category.id) {
      // this.CategoryList[this.findIndexById(this.category.id)] = this.category;
      // this.category.gstCompliance = Number(this.category.gstCompliance);
      this.categorySvc.updateDishCategory(this.category).subscribe(() => {
        this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Category Updated', life: 3000 });
        this.loadCategory();
      });

    } else {
      // this.category.id = this.CategoryList[this.CategoryList.length - 1].id + 1;
      // this.dish.mainCategoryId = 1;
      this.categorySvc.addDishCategory(this.category).subscribe((resp) => {
        console.log(resp)
        // this.CategoryList.push(this.category);
        this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Category Created', life: 3000 });
        this.loadCategory();
      });


    }

    this.CategoryList = [...this.CategoryList];
    this.categoryDialog = false;
  }


  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.dishList.length; i++) {
      if (this.dishList[i].id == id) {
        index = i;
        break;
      }
    }

    return index;
  }
}