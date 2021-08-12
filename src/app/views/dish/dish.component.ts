import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dish, DishCategory } from '../../models/dish';
import { DishService } from '../../service/dish.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'dish-Component',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  dishDialog: boolean;
  checked: boolean = true;
  isEdit: boolean;
  status: { label: string; value: string; }[];
  selectedFile: File;
  constructor(public dishSvc: DishService, 
    private confirmationService: ConfirmationService, 
    private msgService: MessageService,
    private http: HttpClient) { }
  dishList: Dish[] = [];
  uploadedFiles: any[] = [];
  dish: Dish;
  dishCategory: any;
  isChecked: boolean;
  selectedDishes: Dish[];
  selectedDish: number[] = [];
  displayModel = false;
  submitted: boolean;
  nonVegTypes: Array<any>;
  isVeg = true;
  ngOnInit(): void {
    this.loadData();
    this.status = [{ label: 'Active', value: 'active' },
    { label: 'InActive', value: 'inactive' }];
    this.nonVegTypes = [
      { label: "Chicken", value: "chicken" },
      { label: "Mutton", value: "mutton" },
      { label: "Sea Food", value: "seaFood" }
    ];
    this.fnGetDishCategoy();
  }

  loadData() {
    this.dishSvc.getList().subscribe(res => {
      this.dishList = res;
    });
  }
  files;
  dealWithFiles(event) {
     this.files = event.originalEvent.files;
    // Deal with your files
    // e.g  assign it to a variable, and on submit add the variable to your form data
}

  fnGetDishCategoy() {
    this.dishSvc.getDishCategory().subscribe(x => {
      this.dishCategory = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      })
    });
  }
  onUpload(event,id) {
    this.selectedFile = event.files[0];
    const fd = new FormData();
   // name="imageUploader" url="http://webapplication121-dev.us-east-2.elasticbeanstalk.com/api/FileUpload/Upload"
    fd.append('image', this.selectedFile, this.selectedFile.name);
    const fData = {
      dishId:id,
      added_by:"user",
      imageUploader:this.selectedFile
    }
    this.dishSvc.fileUpload(fData).subscribe(resp => {
      this.msgService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });

    })
    //this.http.post('assets/img/dishes', fd);

    // for (let file of event) {
    //   this.dish.imageUrl.push(file);
    // }
  }
  // to Open fresh form  
  openNew() {
    this.dish = {};
    this.submitted = false;
    this.dishDialog = true;
  }

  // edit the dish item
  editDish(dish: Dish) {
    this.dish = { ...dish };
    this.dishDialog = true;
  }

  //to delete dish item 
  deleteDish(dish: Dish) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + dish.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dishSvc.deleteData(dish.id).subscribe(() => {
            this.dishList = this.dishList.filter(val => val.id !== dish.id);
            this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Dish Deleted', life: 3000 });
        })
      }
    });
  }
  deleteSelectedDishes() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected dishes?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.dishList = this.dishList.filter(val => !this.selectedDishes.includes(val));
        this.selectedDishes.map((dishId: Dish) => {
          this.dishSvc.deleteData(dishId.id).subscribe(() => {
              this.selectedDishes = null;
              this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Dishes Deleted', life: 3000 });
          })
        })
      }
    });
  }


  hideDialog() {
    this.dishDialog = false;
    this.submitted = false;
  }

  // add/ update dish 
  onSubmit(f) {
    this.submitted = true;
    if (f.invalid) return;
    if (this.dish.id) {
      this.dishList[this.findIndexById(this.dish.id)] = this.dish;
     // this.dish.imageUrl = './assets/img/dishes/img-menu-placeholder.jpg';
      const dFormData = this.convertFormdata(this.dish);
      this.dishSvc.update(f).subscribe(() => {
        this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Dish Updated', life: 30000 });
        this.loadData();
      });

    } else {
      this.dish.id = this.dishList[this.dishList.length - 1].id + 1;
     // this.dish.imageUrl = './assets/img/dishes/img-menu-placeholder.jpg';
      const dFormData = this.convertFormdata(this.dish);
      this.dishSvc.Add(dFormData).subscribe(resp => {
        if (resp) {
          this.dishList.push(this.dish);
          this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Dish Created', life: 3000 });
          this.loadData();
        }
      });


    }

    this.dishList = [...this.dishList];
    this.dishDialog = false;
  }
    convertFormdata(dish:Dish){
      const fd = new FormData();
      for (const [key, value] of Object.entries(dish)) {
        fd.append(key,value);
      }
      return fd;
    }
    fileChange(e){
      debugger
      this.dish.files = e.target.files[0]
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


  createId(): string {
    let id = '';
    var chars = '0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  // onCheckboxChange(id, e) {
  //   if (e.target.checked) {
  //     if (this.selectedDish.indexOf(id) === -1) {
  //       this.selectedDish.push(id);
  //     }
  //   } else {
  //     const index = this.selectedDish.indexOf(id, 0);
  //     if (index > -1) {
  //       this.selectedDish.splice(index, 1);
  //     }
  //   }
  //   if (this.selectedDish.length > 1) {
  //   }
  // }
}
