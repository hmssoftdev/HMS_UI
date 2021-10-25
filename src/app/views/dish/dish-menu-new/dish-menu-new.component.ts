import { Component, OnInit} from '@angular/core'; 
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Dish, DishCategory } from '../../../models/dish';
import { ShoppingCart } from '../../../models/shopping-cart';
import { User } from '../../../models/user';
import { AuthService } from '../../../service/auth.service';
import { CartService } from '../../../service/cart.service';
import { DishService } from '../../../service/dish.service';
import { ShareDataService } from '../../../service/share-data.service'; 
import { UserService } from '../../../service/user.service';
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
  selCategory: string= 'All';
  categoryFilter: Dish[]; 
  dishesRaw: Dish[];
  deliveryMode: string;
  diningTableDialog:boolean;
  userData:any;
  selectedUser: number;
  userDialog: boolean;
  submitted: boolean;
  usersList: any[];
  user: User;
  billingDialog:boolean;
  cartItems: ShoppingCart;
  shoppingCart: ShoppingCart;
  KOTitems: ShoppingCart;
  subUserList: Subscription;
  subDishList: Subscription;
  selectedPrintType:string;
  constructor(
    private dishService: DishService,
    private primengConfig: PrimeNGConfig,
    private dataService: ShareDataService,
    private userService: UserService,
    private authService: AuthService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.dataService.currentId.subscribe(resp => this.sendId = resp)
    this.subDishList = this.dishService.getList(this.sendId).subscribe(data => {
      this.dishesRaw = data;
      this.dishes = data;
    });
    this.loadUserData();
    this.fnLoadCartData();
    this.userData = this.authService.userData();
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
  onCategoryFilter(category:string) {
    // this.toggle = !this.toggle;
    this.selCategory = category;
    
    this.dishes = category === 'All' ? this.dishesRaw : this.dishesRaw.filter((categoryVal) => categoryVal.dishCategory === category);
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
    //Add to cart Function
    fnAddtoCart(cartItem: Dish) {
      const selCategory = this.rawDishCategoyItems.filter(dItem => dItem.id === cartItem.mainCategoryId)[0];
      console.log(cartItem);
   //   cartItem.userId = this.userID;
      console.log(cartItem);
      // console.log(selCategory.gstCompliance, "GST C");
      this.cartService.addItem(cartItem, 1, selCategory.gstCompliance);
      //   if(this.cartItems.length > 0) { 
      //   this.cartItems.push({Id:cartItem.id,price:cartItem.fullPrice,name:cartItem.name,quantity:1})
  
      // } else {
      //   this.cartItems.push({Id:cartItem.id,price:cartItem.fullPrice,name:cartItem.name, quantity:1})
  
      // }
      this.cartService.get().subscribe(resp => {
    //   this.KOTitems = resp;//.orderitems.filter(fitem => !fitem.kotPrinted)
     })
  
    }
  fnDeliveryMode(s:string){
    this.deliveryMode = s;
    if(s =='Dining'){
      this.diningTableDialog = true;
    } 
    this.cartService.addDeliveryMode(s);
  }
  
  loadUserData() {
   this.subUserList = this.userService.getUserList().subscribe(res => {
      this.usersList = res.map(CItem => {
        return { label: CItem.contact, value: CItem.id }
      })
    });
  }
  userSelection(user) {
    this.dataService.changeMessage(this.selectedUser);
  }
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
  }
  fnSaveUser(event){
    this.usersList = event;
    this.userDialog = false;
    this.loadUserData();
  }

  // Cart 
  fnLoadCartData(){
    this.cartService.empty();
    this.cartService.get().subscribe((resp:ShoppingCart)=> this.cartItems = resp);
  }
  addItem(item){
    this.cartService.addItem(item,1);
  } 
  removeItem(item){
    this.cartService.addItem(item,-1)
  }
  emptyCart(){
    this.cartService.empty();
  }
  fnMakePayment(){
    // this.fnBillingModal.emit();
    // this.cartItems.userId = this.selectedUserId;
    // this.cartItems.adminId = this.userData.adminId;

    // this.fnBillingModal.emit(this.cartItems);
    this.cartItems.userId = this.selectedUser;
    console.log(this.cartItems.userId);
    this.cartItems.adminId = this.userData.adminId;
    this.billingDialog = true;
    // console.log(this.cartItems);
    // this.cartService.postOrder(this.cartItems).subscribe(() => {
    //   this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Cart Item Posted', life: 30000 });
    // })
  }
  fnDiscountCal(event){
    const per = parseInt(event.target.value) | 0;
    this.cartItems.discountInPercent  = per;
    this.cartService.calcDiscountRupees(this.cartItems); 
   }
  fnAdditionalAmount(event){
    const amt = parseInt(event.target.value) | 0;
    this.cartItems.additionalAmount  = amt;
    this.cartService.calcAdditionalAmount(this.cartItems); 
   }

  fnKOTPrint(resp) {
   // console.log(this.cartItems,"KOT PRINT")
   this.cartService.get().subscribe(resp => {
    this.KOTitems = resp;
    this.cartItems = resp;
    const orderS = {status:1}
    this.cartItems.orderStatus = this.cartItems.orderStatus ? this.cartItems.orderStatus : [];
    this.cartItems.orderStatus.push(orderS)
    //this.cartItems.orderStatus.push({status:1,orderId:this.cartItems.id,id:this.cartItems.id})
    this.cartService.postOrder(this.cartItems).subscribe(resp => {
      debugger
    })
  }) 
  // this.KOTitems = this.cartItems;
    this.selectedPrintType = 'KOTPrintUI';
    setTimeout(function () {
      window.print();
    },2000)
  }
  fnBillPrint(billdata){
    // this.selectedPrintType = 'BillPrintUI';
    // console.log(this.cartItems,'BillPrint')
    // this.KOTitems = this.cartItems;
    // window.print();
    
    this.selectedPrintType = 'BillPrintUI';
    this.cartService.get().subscribe(resp => {
      this.KOTitems = resp;
      this.cartItems = resp;
    })
    // this.KOTitems = this.cartItems;
    setTimeout(function () {
      window.print();
    },2000)
  }
  ngOnDestroy(){
    this.subUserList.unsubscribe();
    this.subDishList.unsubscribe();
  }

  fnTableSelection(e){
  }
}
