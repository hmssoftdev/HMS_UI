import { Component, Input, OnInit, Output} from '@angular/core'; 
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Dish, DishCategory } from '../../../models/dish';
import { ShoppingCart } from '../../../models/shopping-cart';
import { User } from '../../../models/user';
import { AuthService } from '../../../service/auth.service';
import { CartService } from '../../../service/cart.service';
import { DishService } from '../../../service/dish.service';
import { ShareDataService } from '../../../service/share-data.service'; 
import { UserService } from '../../../service/user.service';
import { Admin } from '../../../models/admin';
import { AdminService } from '../../../service/admin.service';
import { OrderList } from '../../../models/orderList';
import { DiningTableComponent } from '../dining-table/dining-table.component';
import { CommonService } from '../../../service/common.service';
import { setting } from '../../../models/setting';
import { TranslateService } from '@ngx-translate/core';
import {DialogModule} from 'primeng/dialog';


// import { EventEmitter } from 'stream';

@Component({
  selector: 'app-dish-menu-new',
  templateUrl: './dish-menu-new.component.html',
  styleUrls: ['./dish-menu-new.component.scss']
})
 

  


export class DishMenuNewComponent implements OnInit {
  event:Event
  dishes: Dish[];
  sendId: number; 
  rawDishCategoyItems: DishCategory[];
  dishCategory: any;

  caty:string[]=[];


  
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
  selectedUsers='';
  selectedUser: number;
  userDialog: boolean;
  submitted: boolean;
  usersList: any;
  user: User;
  billingDialog:boolean;
  cartItems: ShoppingCart;
  shoppingCart: ShoppingCart; 
  selectedOrderTotal: number = 0;
  // subUserList: Subscription;
  subDishList: Subscription;
  selectedPrintType:string;
  isKOTdone: boolean = false;
  KOTEnabled: boolean = false;
  selectedOrderId: number = 0;
  selectedTableNames: Number[];
  subCartItems: Subscription;
  showKOTItems: boolean;
  showKOTnBill:Boolean;
  currentOrderId: any;
  invoiceno:any;
  admin: Admin;
  obs: Subscription;
  cartToggle:boolean;
  lblCartToggle = ''
  cartData: OrderList;
  orderList: OrderList[] = [];
  selectedTableID : string[] = [];
 selectedTableidd : DiningTableComponent;
  selectedTableid:Array<any> = [];
    userLists:User[] = [];
  // usercimbine: string[];
  usercombine:  Array<any>;
  image:boolean=true;
  lang:string;
   data:setting;
   show=false;
   both:boolean;
   displayBasic=false;
   customer:boolean;
  //  userdata:boolean=false;
   fstPayment:boolean=false
   droperror:boolean=false;
   gst:boolean;
  //  customLabel:string="KOT Print"
  constructor(
    private comset:CommonService,
    private dishService: DishService,
    private primengConfig: PrimeNGConfig,
    private dataService: ShareDataService,
    private userService: UserService,
    private authService: AuthService,
    private cartService: CartService,
    private msgService: MessageService,
    public adminService: AdminService,
    public userSvc: UserService,
    private auth:AuthService,
    public translate:TranslateService
    ) { }

  ngOnInit(): void {
    // this.categori={

    // }
    this.comset.Obslangauge.subscribe(res=>{
      this.translate.use(res);
    })

    this.userService.getusersetting(this.auth.userData().adminId).subscribe(resp =>{
      if(resp){
        const d = resp;
        this.image = d.menuDisplay ? true : false;
        this.both = d.billPrintAndKOT ? true : false;
        this.customer=d.customerDataForBilling ?true : false;
        this.fstPayment=d.paymentFirst ?true:false;
        this.gst=d.billWithGST?true:false;
        // console.log( this.both = d.billPrintAndKOT ? true : false,"check")
        // this.both = d.billPrintAndKOT?true : false; 
    }
    if(this.customer===true){
      this.droperror=true
    }
   
    })
    console.log(this.customer,"true")
   
    this.userSvc.langdata.subscribe( (x:any)=>{
     
      this.translate.use(x);
      console.log(x)

    })


      
    this.loadData();
    this.loadClient();
    this.dataService.currentId.subscribe(resp => this.sendId = resp)
    this.subDishList = this.dishService.getList(this.sendId).subscribe(data => {
      this.dishesRaw = data;
      this.dishes = data;
    });
    this.fnGetDishCategoy();
    this.emptyCart();
    this.fnLoadCartData();
    this.loadUserData();
   
    this.userData = this.authService.userData();
    this.sortOptions = [
    { label: 'Price High to Low', value: '!fullPrice' },
    { label: 'Price Low to High', value: 'fullPrice' }
    ];
    this.cartService.tableSubject.subscribe(x=>{
        console.log(x);
        this.selectedTableID = x;
    });
  } 
//   onBlur(value){
//    if(value==''){
//      console.log("error dropdown")
//    }
// }
  loadData(){
    this.userSvc.getUserList().subscribe(res => {

      this.userLists = res;
      this.usercombine = this.userLists.map(itm =>
        {
          const nObj = {contact : itm.userName + " - "+ itm.contact, id:itm.id}  
          return nObj;
          
        }
      ) 
    });
  }
 
  loadClient(){
    this.obs = this.adminService.getAdmin().subscribe(resp => {
      if (resp.length > 0) {
        this.admin = resp[0];
      }
    });
  }


  // Get Category
  fnGetDishCategoy() {
    this.dishService.getDishCategory(this.sendId).subscribe((x: DishCategory[]) => {
      this.rawDishCategoyItems = x;
           // const cat=x.copyWithin(0,1,2).map(res=> res.name)
      // console.log(cat,"var category")
     

for (var _i = 0; _i < x.length; _i++) {

    if(_i===5){
      break;
    }
    this.caty.push(x.map(x=> x.name)[_i])

}
      this.dishCategory = x.map(cItem => {
        return { label: cItem.name, value: cItem.name }
      })
      
   
    });
  }
  onCategoryFilter(category:string) { 
    this.selCategory = category;
    this.dishes = category === 'All' ? this.dishesRaw : this.dishesRaw.filter((categoryVal) => categoryVal.dishCategory === category);
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
      if(this.gst==false){
        selCategory.gstCompliance = 0
      }
      this.cartService.addItem(cartItem, 1, selCategory.gstCompliance); 
      this.fnLoadCartData();
     
    }
    addItem(item:Dish){
      // const selCategory = this.rawDishCategoyItems.filter(dItem => dItem.name === item.name)[0];
      // if(this.gst==false){
      //   selCategory.gstCompliance = 0
      // }
      this.cartService.addItem(item,1);
      this.fnLoadCartData();
      console.log(this.cartItems.orderItems,"value")
    } 
    removeItem(item){
      // const selCategory = this.rawDishCategoyItems.filter(dItem => dItem.id === item.mainCategoryId)[0];
      // if(this.gst==false){
      //   selCategory.gstCompliance = 0
      // }
      this.cartService.addItem(item,-1)
      this.fnLoadCartData();
    }
    emptyCart(){
      this.cartService.empty();
      //this.subCartItems.unsubscribe();
      this.fnLoadCartData();
      this.selectedUser = null;
      this.selectedUsers = '';
      this.deliveryMode = '';
      this.KOTEnabled = false;
      this.isKOTdone = false;
  
    }
  fnDeliveryMode(s:string){
    this.deliveryMode = s;
    this.isKOTdone = false;
    if(s =='Dining'){
      this.diningTableDialog = true;
      this.KOTEnabled = false;
    } else {
      this.KOTEnabled = true;
    }
    if(!this.selectedUser && this.userData.userType == 2){ 
      this.cartService.addUser(this.userData);
    }
    this.cartService.addDeliveryMode(s); 
  }
  
  loadUserData() {
   this.usersList = this.userService.getUserList();
  }
  userSelection(selectedUserId) 
  {
     let uContact = this.usercombine.filter((uItm:any) => selectedUserId== uItm.id) 
     this.selectedUsers = uContact[0].contact;
     const uData = {id:parseInt(selectedUserId)} 
     this.cartService.addUser(uData);
     this.droperror=false
  }
 
//   onBlurHandler(event){
//     if(this.customer===true)
//     {
//      if(event == ''){
//       this.droperror=true
//       this.KOTEnabled=false
//    }
//   }
// }
  // onBlur(value:string){
  //   if(value=='' || value=='null'){
  //     console.log(value,"error")
  //   }
  // }
  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
   

  }
  fnSaveUser(event){
    //this.usersList = event;
    this.userDialog = false;
    this.loadData();
  }

  // Cart 
  fnLoadCartData(){
    let count = 0; 
   this.subCartItems = this.cartService.get().subscribe(resp =>{
    this.cartItems = resp;
    if(this.cartItems.userId !== undefined || this.usercombine !== undefined)
    this.selectedUsers =  this.usercombine.filter(x=>x.id==this.cartItems.userId)[0]?.contact;
   }); 
   if(this.cartItems.id){
     this.isKOTdone = true;
   } 

  }

  fnMakePayment(){
    this.fnLoadCartData();
    this.cartItems.userId = this.selectedUser; 
    this.cartItems.adminId = this.userData.adminId;
    this.billingDialog = true;

    // this.emptycart.emit('this.emptyCart()');
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
   fnDiscountCall(event){
    const perr = parseInt(event.target.value) | 0;
    this.cartItems.discountInrupes  = perr;
    this.cartService.calcDiscountRupeess(this.cartItems); 
   }
  fnAdditionalAmount(event){
    const amt = parseInt(event.target.value) | 0;
    this.cartItems.additionalAmount  = amt;
    this.cartService.calcAdditionalAmount(this.cartItems); 
   }

  fnKOTPrint(resp) { 
    this.fnLoadCartData(); 
    this.showKOTItems = true; 
    const orderS = {status:1}
    this.cartItems.orderStatus = this.cartItems.orderStatus ? this.cartItems.orderStatus : [];
    this.cartItems.orderStatus.push(orderS) 
    if(this.cartItems.deliveryMode===undefined ){
      switch(this.cartItems.deliveryOptionId){
        case 1:
         this.cartItems.deliveryMode = "Dining"; break;
        case 2:
            this.cartItems.deliveryMode = "Home Delivery";
            
            
            break;
          case 3:
            this.cartItems.deliveryMode = "Takeaway"; break;
      }
    }
 
 // }) 
 this.currentOrderId = null 
//  this.cartItems.userName=this.selectedUsers;
 if(this.cartItems.id === undefined)
 {
    this.cartService.postOrder(this.cartItems).subscribe((resp:any) => {
    console.log(this.cartItems,"Post")
      
    this.currentOrderId = resp.orderId;
    this.invoiceno =resp.invoice;
    this.cartService.addOrderId(this.currentOrderId);
    // this.KOTitems = this.cartItems;
    this.selectedPrintType = 'KOTPrintUI';
    this.isKOTdone = true; 
    setTimeout(() => {
      window.print();
     this.deliveryMode === 'Dining' ? this.emptyCart() : '';
    },1000)

  });
 }
else if(this.deliveryMode ==='Dining' && this.cartItems.id !== undefined){
  this.cartService.PutOrder(this.cartItems).subscribe(res=>{
    console.log(this.cartItems,"Put")

    this.selectedPrintType = 'KOTPrintUI';
    this.isKOTdone = true; 
    setTimeout(() => {
      window.print();
      // this.msgService.add({ severity: 'info', summary: 'Table Selection', detail: 'To proceed your order, Kindly select table first!',life:3000 });
     this.deliveryMode === 'Dining' ? this.emptyCart() : '';
    },1000)
   })
}

else{
  if(this.deliveryMode !=='Dining' && this.cartItems.id !== undefined){
     // && this.cartItems.id == undefined
    this.cartService.postOrder(this.cartItems).subscribe((resp:any) => {
      console.log(this.cartItems,"Post")
        
      this.currentOrderId = resp.orderId;
      this.invoiceno =resp.invoice;
      this.cartService.addOrderId(this.currentOrderId);
      // this.KOTitems = this.cartItems;
      this.selectedPrintType = 'KOTPrintUI';
      this.isKOTdone = true; 
      setTimeout(() => {
        window.print();
      //  this.deliveryMode === 'Dining' ? this.emptyCart() : '';
      },1000)
  
    });
  }
  // else if(this.deliveryMode !=='Dining' && this.cartItems.id !== undefined){
  //   this.cartService.PutOrder(this.cartItems).subscribe(res=>{
  //     console.log(this.cartItems,"Put")
  //     this.selectedPrintType = 'KOTPrintUI';
  //     this.isKOTdone = true; 
  //    })
  // }
  // else if(this.deliveryMode !=='Dining' && this.cartItems.id !== undefined){
  //   this.cartService.PutOrder(this.cartItems).subscribe(res=>{
  //     console.log(this.cartItems,"Put")
  
  //     this.selectedPrintType = 'KOTPrintUI';
  //     this.isKOTdone = true; 
  //     // setTimeout(() => {
  //     //   window.print();
  //     //  this.deliveryMode === 'Dining' ? this.emptyCart() : '';
  //     // },1000)
  //    })
  // }
  // if(this.deliveryMode === 'Dining' && this.cartItems.id == undefined){
  //   this.cartService.PutOrder(this.cartItems).subscribe(res=>{
  //     console.log(this.cartItems,"Put")
  
  //     this.selectedPrintType = 'KOTPrintUI';
  //     this.isKOTdone = true; 
  //     // setTimeout(() => {
  //     //   window.print();
  //     //  this.deliveryMode === 'Dining' ? this.emptyCart() : '';
  //     // },1000)
  //    })
  // } 
  //  if(this.deliveryMode !== 'Dining' && this.cartItems.id !== undefined){
  //   this.cartService.postOrder(this.cartItems).subscribe((resp:any) => {
  //     console.log(this.cartItems,"Post")
        
  //     this.currentOrderId = resp.orderId;
  //     this.invoiceno =resp.invoice;
  //     this.cartService.addOrderId(this.currentOrderId);
  //     // this.KOTitems = this.cartItems;
  //     this.selectedPrintType = 'KOTPrintUI';
  //     this.isKOTdone = true; 
  //     setTimeout(() => {
  //       window.print();
  //     //  this.deliveryMode === 'Dining' ? this.emptyCart() : '';
  //     },1000)
  
  //   });
  // }
}


  // else{
  //  this.cartService.postOrder(this.cartItems).subscribe(res=>{
  //   console.log(this.cartItems,"Put")

  //   this.selectedPrintType = 'KOTPrintUI';
  //   this.isKOTdone = true; 
  //   setTimeout(() => {
  //     window.print();
  //    this.deliveryMode === 'Dining' ? this.emptyCart() : '';
  //   },1000)
  //  })
  // }
  // this.cartService.PutOrder(this.cartItems).subscribe(res=>{
  //       console.log(this.cartItems,"Put")
    
  //       this.selectedPrintType = 'KOTPrintUI';
  //       this.isKOTdone = true; 
  //       // setTimeout(() => {
  //       //   window.print();
  //       //  this.deliveryMode === 'Dining' ? this.emptyCart() : '';
  //       // },1000)
  //      })
    }
    fnDirectPayment(){
      this.fnLoadCartData(); 
     const orderS = {status:1}
     this.cartItems.orderStatus = this.cartItems.orderStatus ? this.cartItems.orderStatus : [];
     this.cartItems.orderStatus.push(orderS) 
    //  if(this.cartItems.deliveryMode===undefined ){
    //    switch(this.cartItems.deliveryOptionId){
    //      case 1:
    //       this.cartItems.deliveryMode = "Dining"; break;
    //      case 2:
    //          this.cartItems.deliveryMode = "Home Delivery"; break;
    //        case 3:
    //          this.cartItems.deliveryMode = "Takeaway"; break;
    //    }
    //  }

   this.currentOrderId = null;
   this.cartService.postOrder(this.cartItems).subscribe((resp:any) => {
    this.currentOrderId = resp.orderId;
     this.cartService.addOrderId(this.currentOrderId);
 
    //  this.selectedPrintType = 'KOTPrintUI';

     this.fnMakePayment();
    
   });


   }
  fnBillPrint(order: OrderList){
    
    this.selectedPrintType = 'BillPrintUI';
   
    this.selectedOrderId = order.id;
    this.selectedOrderTotal = order.grossTotal;
    this.cartData = order;
    setTimeout(function () {
      window.print();
    },2000)
  }

  fnKOTnBillPrint(order:OrderList,resp){
    this.fnKOTPrint(resp)
    this.fnBillPrint(order);
  }
  ngOnDestroy(){
   // this.subUserList.unsubscribe();
    this.subDishList.unsubscribe();
    this.subCartItems.unsubscribe();
    console.log("Component Destroyed ");
    this.obs.unsubscribe();
  }

  fnTableSelection(arr:any){
      const tblArr = arr.tblArr;
      this.KOTEnabled = true; 
      this.selectedTableNames = tblArr;
      if(arr.tblSelectionType != 'releaseTbl'){ 
      this.diningTableDialog = false;
      }
            this.fnLoadCartData();
      // console.log(this.fnLoadCartData(),"Cart Item Check")
  }
  fnHideDiningTableM(event){ 
    if(!this.selectedTableNames || this.selectedTableNames.length == 0){
      this.msgService.add({ severity: 'info', summary: 'Table Selection', detail: 'To proceed your order, Kindly select table first!',life:3000 });
    }     
    else {
      this.fnLoadCartData();
    }
    // console.log(this.cartItems.orderItems,"Order check")
  }
  fnCartToggle(){
    this.lblCartToggle = this.lblCartToggle == 'Active' ? 'inActive':'Active'
  }
  closeBillingModal(){
    this.billingDialog = false;
  }

showBasicDialog(){
  this.displayBasic = true;
}
}