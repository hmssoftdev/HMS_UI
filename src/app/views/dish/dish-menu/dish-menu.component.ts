import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { from, Subscription } from 'rxjs';
import { Admin } from '../../../models/admin';
import { Dish, DishCategory } from '../../../models/dish';
import { User } from '../../../models/user';
import { AdminService } from '../../../service/admin.service';
import { AuthService } from '../../../service/auth.service';
import { CartService } from '../../../service/cart.service';
import { CommonService } from '../../../service/common.service';
import { DishService } from '../../../service/dish.service';
import { UserService } from '../../../service/user.service';
import { ShareDataService } from '../../../service/share-data.service';
import { ShoppingCart } from '../../../models/shopping-cart';
@Component({
  selector: 'app-dish-menu',
  templateUrl: './dish-menu.component.html',
  styleUrls: ['./dish-menu.component.scss']
})
export class DishMenuComponent implements OnInit {
  //Test
  shoppingCart: ShoppingCart;
  dishes: Dish[];
  selectedUserId: number;
  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;
  dishCategory: { label: string; value: string; }[];
  cartItems: Array<any> = [];
  cities: any;
  states: any;
  selectedUser: number;
  userList: User[];
  sendId:number;
  userDialog: boolean;
  submitted: boolean;
  user: any;
  userID: any;
  userData: any; 
  CategoryList: DishCategory[];
  billingDialog: boolean;
  users: { label: number, value: number }[];
  rawDishCategoyItems: DishCategory[];
  admin: Admin;
  obs: Subscription;
  text: string = "Text1";
  // activeIndex1: number;
  // activeIndex2: number;
  // scrollableTabs: any[];
  activeIndex1: number = 0;

    activeIndex2: number = 0;

    scrollableTabs: any[] = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }));
  @Output() toDish = new EventEmitter();
  constructor(
    private dishService: DishService, 
    private primengConfig: PrimeNGConfig,
    private cartService:CartService,
    public commonSvc: CommonService,
    private msgService: MessageService,
    public userSvc: UserService,
    private authServive: AuthService,
    public adminService: AdminService,
    public data: ShareDataService
    ) { }
  ngOnInit() {
      this.data.sendObject('Hello from dish menu!');
      this.data.currentDiallog.subscribe(dialog => this.userDialog = dialog);
      this.data.currentMessage.subscribe(message => this.selectedUser = message);
      this.data.currentId.subscribe(id => this.sendId = id);
      this.dishService.getList(this.sendId).subscribe(data => {this.dishes = data;
        // this.activeIndex1 = 0;

        // this.activeIndex2 = 0;
    
        // this.scrollableTabs = Array.from({ length: 50 }, (_, i) => ({ title: `Tab ${i + 1}`, content: `Tab ${i + 1} Content` }));
     // this.dishes.map(x => x.isFull = true);
      });
      this.sortOptions = [
          {label: 'Price High to Low', value: '!fullPrice'},
          {label: 'Price Low to High', value: 'fullPrice'}
      ];
      this.userData = this.authServive.userData(); 
      this.primengConfig.ripple = true;
      this.fnGetDishCategoy();
      this.loadData()
      // this.getCities();
      // this.getStates();
      this.loadClient();

  }

  userSelection(user){
    this.data.changeMessage(this.selectedUser);
  }

  fnBTN1(){
    alert('Full button is pressed');
  }

  fnBTN2(){
    alert('Half button is pressed');
  }

  loadClient(){
   this.obs = this.adminService.getAdmin().subscribe(resp => {
      if(resp.length > 0){  
        this.admin = resp[0];
      }
    });
  }
  loadCategory(){
    this.dishService.getDishCategory(this.sendId).subscribe(x => {
      this.CategoryList = x;
      console.log(this.CategoryList); 
    });
  }
  
  loadData() {
    this.userSvc.getUserList().subscribe(res => {
      

      this.user = res.map(CItem => {
        return { label: CItem.contact, value: CItem.id}
      })
    });
  }
  getCities() {
    this.commonSvc.getCities().subscribe(x => {
      this.cities = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      })
    });
  }
  getStates() {
    this.commonSvc.getStates().subscribe(x => {
      this.states = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      })
    });
  }
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }
  saveUser() {
    this.submitted = true;
    console.log(this.user);
    if (this.user.userName.trim()) {
      this.userSvc.AddUser(this.user).subscribe(() => {
        this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000 });
      })
    }
    this.userDialog = false;
  }
  onSortChange(event) {
      let value = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
      }
  }
  // Get Category
  fnGetDishCategoy() {
    this.dishService.getDishCategory(this.sendId).subscribe((x:DishCategory[]) => {
      this.rawDishCategoyItems = x;
      this.dishCategory = x.map(cItem => { 
        return { label:cItem.name, value:cItem.name}
         }) 
    });
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
  // Bookmark the menu Item

  fnBookmarkMenu(dish:Dish){
      dish.bookmark =  !dish.bookmark;
  }
  
  //Add to cart Function
  fnAddtoCart(cartItem:Dish){
   const selCategory =  this.rawDishCategoyItems.filter(dItem => dItem.id === cartItem.mainCategoryId)[0];
   console.log(cartItem);
   cartItem.userId = this.userID;
   console.log(cartItem);
    // console.log(selCategory.gstCompliance, "GST C");
    this.cartService.addItem(cartItem,1, selCategory.gstCompliance);
  //   if(this.cartItems.length > 0) { 
  //   this.cartItems.push({Id:cartItem.id,price:cartItem.fullPrice,name:cartItem.name,quantity:1})

  // } else {
  //   this.cartItems.push({Id:cartItem.id,price:cartItem.fullPrice,name:cartItem.name, quantity:1})

  // }

  
}
  fnGetTotal(){
  const totVal = (accumulator:any, curVal:any) => accumulator + curVal.price;
  return this.cartItems.reduce(totVal);
  }
  fnMakePayment(shoppingCart:ShoppingCart){
    this.shoppingCart = shoppingCart;
    this.billingDialog = true;
  }

  ngOnDestroy() {
    console.log("Component Destroyed ");
    this.obs.unsubscribe();
  }

  onCategoryFilter(event){
    console.log(event);
  }
}
