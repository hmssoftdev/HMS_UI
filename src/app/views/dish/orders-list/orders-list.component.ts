import { Component, OnInit } from '@angular/core';
import { Dish } from '../../../models/dish';
import { DishService } from '../../../service/dish.service';
import { CartService } from '../../../service/cart.service';
import { OrderStatus, ShoppingCart } from '../../../models/shopping-cart';
import { OrderList } from '../../../models/orderList';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../service/auth.service';

import { Historydata } from '../../../models/historydata';
import * as FileSaver from 'file-saver';
import { TranslateService } from "@ngx-translate/core";
import { LanguageComponent } from '../../language/language.component';
import { UserService } from '../../../service/user.service';
import { CommonService } from '../../../service/common.service';
import { setting } from '../../../models/setting';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {
  orderList: OrderList[] = [];
  statusValue: string;
  selectedDishes: Dish[];
  orderStatus: OrderStatus = new OrderStatus();
  selectedOrderId: number = 0;
  selectedOrderTotal: number = 0;
  orderStatusDialog:boolean;
  cartData: OrderList;
  lang:any;
  data:setting;
  show=true;
  cols:any[];
  exportColumns:any[];
  colss:any[]
  constructor(
    private dishSvc: DishService,
    private orderService: CartService,
    private msgService: MessageService,
    public user:UserService,
    private authService: AuthService,public translate:TranslateService,
    public comset:CommonService
    ) {
      
       
     }


  ngOnInit(): void {
    this.comset.obsSetData.subscribe(x=>{
      this.data=x;
      if(this.data.activeOrderFlow===0)
      this.show=false;
    })
    this.authService.showLoader = true;
    this.loadData();
    this.comset.obsSetData.subscribe(x=>{
      this.translate.use(x.language);
    })
    // this.comset.Obslangauge.subscribe(x=>{
    //   this.lang=x;
    //   this.translate.use(this.lang);
    //   console.log(this.lang)
    // })
    // this.user.langdata.subscribe((x:any)=>{
    //   this.translate.use(x);
    // })
    this.cols = [
      { field: 'userName', header: 'Name' },
      { field: 'userMobileNumber', header: 'Contact' },
      { field: 'grossTotal', header: 'Total' },
     { field: 'status', header: 'Status' },
      

   
  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    
  }
  loadData() {
    this.orderService.getOrder().subscribe(res => {
      this.orderList = res;
     this.colss=this.orderList.map(res=>
      ({
       Name:res.userName,Contact:res.userMobileNumber,Total:res.grossTotal,
       Status:this.getstatus(parseInt(res.status))
     }) );
    this.authService.showLoader = false;
    });
  }
  getstatus(num:Number){
    var strVal= '-';
    switch(num){
      case 1:
        strVal = 'Ordered';
        break;
      case 2:
        strVal = 'Processing';
        break; 
     case 3:
        strVal = 'Shipped';
        break;  
          case 4:
        strVal = 'Delivered';
        break;
         case 10:
        strVal = 'Cancelled';
        break;   
    }
    return strVal;
  }
  fnViewOrder(order: Historydata){

    this.selectedOrderId = order.id;
    this.selectedOrderTotal = order.grossTotal;
    this.cartData = order;
    this.orderStatusDialog =true;
  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default();
            (doc as any).autoTable(this.exportColumns, this.orderList);
            doc.save('Order_list.pdf');
        })
    })
}

exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.colss);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Order");
  });
}
saveAsExcelFile(buffer: any, Category: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, Category + '_List_' + EXCEL_EXTENSION);
}
  fnProcessing(order: OrderList){ 
    this.processStatus(order.id, 2);
  }
  fnShipping(order: OrderList){  
    this.processStatus(order.id, 3);
  }
  fnCompleted(order: OrderList){ 
    this.processStatus(order.id, 4);
  }
  fnCancelOrder(order: OrderList){
    this.processStatus(order.id, 10);

  }

  processStatus(id: number, status: number){
    this.orderStatus.orderId = id;
    this.orderStatus.status = status;
    this.orderService.postOrderStatus(this.orderStatus).subscribe(() => {
      this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Order Processed', life: 3000 });
      this.loadData();
    })
  }
  getDeliveryOptStr(n:number){
    let strVal= '';
    switch(n){
      case 1:
        strVal = 'Dining';
        break;
      case 2:
        strVal = 'Home Delivery';
        break;                  
      case 3:
        strVal = 'Take Away'
    }
    return strVal;
  }

  getPaymentMode(n:number){
    let strVal= '-';
    switch(n){
      case 1:
        strVal = 'Cash';
        break;
      case 2:
        strVal = 'UPI';
        break;   
    }
    return strVal;
  }
}