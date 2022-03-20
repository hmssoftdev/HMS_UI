import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Dish, DishCategory } from '../../models/dish';
import { DishService } from '../../service/dish.service';
import { HttpClient } from '@angular/common/http';
import { ShareDataService } from '../../service/share-data.service';
import { CommonMethodsService } from '../../service/common-methods.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../../service/user.service';
import { language } from '../../models/setting';
@Component({
  selector: 'dish-Component',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
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
  subDish: Subscription;
   language:language;
  selectedUser: string;
  sendId: number;
  dishDialog: boolean;
  checked: boolean = true;
  isEdit: boolean;
  status: { label: string; value: string; }[];
  selectedFile: File;
  lang:string='';
  constructor(public dishSvc: DishService, 
    private confirmationService: ConfirmationService, 
    private msgService: MessageService,
    private shareData: ShareDataService,
    private http: HttpClient,
    private commonMethod: CommonMethodsService,
    private authService: AuthService,
    public translate:TranslateService,
    public userservice:UserService) { 
     
      
      userservice.langdata.subscribe(x=>{
        this.lang=x
        console.log("1",this.lang,"2",x)
      }
      )
translate.use(this.lang);
translate.use('hindi');
    }
    // switchLang(lang) {
    //   this.translate.use(lang);
    // }
  
 
  ngOnInit(): void {

  //  this.lang=this.userservice.getlanguage();
  //  console.log("dish check",this.lang)
    // .subscribe(x=>{
    //   // this.lang=x;
    //   // console.log("dish check",this.lang)
    // })

 
    // this.translate.use(this.language.lang);


    this.authService.showLoader = true;
    this.shareData.currentId.subscribe(id => this.sendId = id);
    console.log(this.sendId);
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

  receivedValue($event){
    this.selectedUser = $event;
  }

  loadData() {
    this.subDish = this.dishSvc.getList(this.sendId).subscribe(res => {
      this.dishList = res; 
    this.authService.showLoader = false;
    });
  }
  files;
  dealWithFiles(event) {
     this.files = event.originalEvent.files;
    // Deal with your files
    // e.g  assign it to a variable, and on submit add the variable to your form data
}

  fnGetDishCategoy() {
    this.dishSvc.getDishCategory(this.sendId).subscribe(x => {
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
    this.dish.fullPrice=0;
    this.dish.halfPrice=0;
    this.dish.quantity=0;
    this.dish.timeForCook=0;
    this.submitted = false;
    this.dishDialog = true;
  }

  // edit the dish item
  editDish(dish: Dish) {
    debugger;
    dish.imageUrl = dish.imageUrl ? dish.imageUrl : '';
    // dish.oldImageUrl = dish.imageUrl;
    // dish.imageUrl = '';
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
      if(this.dish.imageUrl==""){
        this.dish.imageUrl = this.dish.oldImageUrl;
      }
      const dFormData = this.convertFormdata(this.dish);
      this.dishSvc.update(dFormData).subscribe(() => {
        this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Dish Updated', life: 30000 });
        this.loadData();
      });

    } else {
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
      this.dish.files = this.commonMethod.limitFileSize(e , 500);
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
  ngOnDestroy(){
    this.subDish.unsubscribe();
  }
}
