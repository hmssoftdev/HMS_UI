import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Dish, DishCategory } from '../../../models/dish';
import { AuthService } from '../../../service/auth.service';
import { DishService } from '../../../service/dish.service';
import { ShareDataService } from '../../../service/share-data.service';
import { TranslateService } from "@ngx-translate/core";
import { UserService } from '../../../service/user.service';
import { CommonService } from '../../../service/common.service';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
// import { title } from 'process';
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
  exportColumns: any[];
  cols:any[]
  colss:any[]
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

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
    this.todayWithPipe = this.pipe.transform(Date.now(), 'h:mm a');
   
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'gstCompliance', header: 'GST Compliance' },
      { field: 'status', header: 'Status' },
   
  ];
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
    this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
   
  }
  loadCategory() {
    this.shareData.currentId.subscribe(id => this.sendId = id);
    this.categorySvc.getDishCategory(this.sendId).subscribe(x => {
      this.CategoryList = x;
      this.colss=this.CategoryList.map(res=> ({name:res.name, gst:res.gstCompliance,status:res.status}))
    this.authService.showLoader = false;
    // this.exportColumns=this.CategoryList.map(res=>)
    });
  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default();
            (doc as any).autoTable(this.exportColumns, this.CategoryList);
            doc.save('Category_list.pdf');
        })
    })
}
exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.colss);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Category");
  });
}
saveAsExcelFile(buffer: any, Category: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, Category + '_List_' + this.todayWithPipe + EXCEL_EXTENSION);
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