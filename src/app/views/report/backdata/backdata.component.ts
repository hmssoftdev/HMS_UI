
import { Component, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Historydata } from '../../../models/historydata';
import { AuthService } from '../../../service/auth.service';
import { EnumService } from '../../../service/enum.service';
import { UserService } from '../../../service/user.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-backdata',
  templateUrl: './backdata.component.html',
  styleUrls: ['./backdata.component.scss']
})
export class BackdataComponent implements OnInit {
  @Input() maxDate :string;
  @Input() minDate :string;
  @Input() ID :number;
  @Input() deliveryMode : number = 0;
  @Input() cartItems;

 
  historydata: Historydata[] = [];
  order: Historydata[]=[];
  cartData:Historydata[]=[];
  loading :boolean = true;
  date =new Date();
  selectedOrderId: number = 0;
  selectedOrderTotal: number=0;
  Dialog: boolean;
  num:number;
  invoice:number;
  cols:any[];
  exportColumns:any[];
  colss:any[];
  strVal:string;
  constructor(private msgService:MessageService,
    private auth :AuthService,private user:UserService,
     private enumService:EnumService,private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    console.log(this.ID,"id check")
    this.getHistorydata();
    this.ID=this.auth.userData().adminId;
    console.log(this.auth.userData(),"id")
    this.cols = [
      { field: 'userName', header: 'name' },
      { field: 'userMobileNumber', header: 'contact' },
      { field: 'itemCount', header: 'ItemCount' },
     { field: 'grossTotal', header: 'Amount' },
   
   
  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  }
  getHistorydata(){
    let maxnewDate = moment(this.maxDate).format('YYYY-MM-DD').toString();
    let minnewDate = moment(this.minDate).format('YYYY-MM-DD').toString();
  

  this.user.getBillHistory(this.ID,maxnewDate,minnewDate).subscribe(
    x=>{
       this.historydata = x;

        console.log(this.historydata)
       this.loading  = false;
      this.colss=this.historydata.map(res=> 
        ({
          userName:res.userName,
          userMobileNumber:res.userMobileNumber,
          itemCount:res.itemCount,
          grossTotal:res.grossTotal,
          mode:this.getPaymentMode(res.paymentMode)
        }))
    
      return this.historydata;

    }
  )


  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default();
            (doc as any).autoTable(this.exportColumns, this.historydata);
            doc.save('History-Data.pdf');
        })
    })
}
exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.colss);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "History-Data");
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
  getPaymentMode(n:number){
    this.num=n
  this.strVal= '-';
    switch(n){
      case 1:
        this.strVal = 'Cash';
        break;
      case 2:
        this.strVal = 'UPI';
        break;   
    }
    return this.strVal;
  }
  fnhide(){
    this.Dialog=false
    this.getHistorydata();
 this.getPaymentMode(this.num); 
  }
  deleteOrder(id:number) {
   this.user.DeleteUserHistorydata(id).subscribe(()=>
         {

          this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Bill Deleted', life: 3000 });
           this.getHistorydata();
         })

    // let maxnewDate = moment(this.maxDate).format('YYYY-MM-DD').toString();
    // let minnewDate = moment(this.minDate).format('YYYY-MM-DD').toString();
    // this.user.getBillHistory(this.ID,maxnewDate,minnewDate).subscribe(res=>{
    //   let bill;
    //  bill=res

    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to delete '+ '?',
    //   header: 'Confirm',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     let number=2236;
    //     this.user.DeleteUserHistorydata(number).subscribe(()=>
    //     {
    //       this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Bill Deleted', life: 3000 });
    //     })
    

    //   }
    // // })
    //   });
    }


  fnViewOrder(data){

   this.selectedOrderId=data.id;
   this.invoice=data.invoiceNumber;
  this.selectedOrderTotal = data.grossTotal;
  this.cartData=data;
  
  this.Dialog=true;
  }
  
}

