import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Historydata } from '../../../models/historydata';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';
import * as FileSaver from 'file-saver'; 
@Component({
  selector: 'app-topdata',
  templateUrl: './topdata.component.html',
 styleUrls: ['./topdata.component.scss']
})
export class TopdataComponent implements OnInit {
  strtdate=new Date();
  startdate:string='';
  monthenddate:string='';
  historydata:Historydata[];
  ids:number;
  cols:any[];
  exportColumns:any[];
  colss:any[];
  @Input() ID:number[]
  constructor(private auth:AuthService,public user:UserService) { }
    ngOnInit(): void {
      this.startdate=moment(this.strtdate).format('YYYY-MM-DD').toString();
      this.monthenddate=moment(this.strtdate).format('YYYY-MM-DD').toString();
      // this.id=this.auth.userData().adminId;
      var currentDate = new Date();
      var dated = currentDate.getDate()
        var pastDate = new Date(currentDate)
        pastDate.setDate(pastDate.getDate() - dated);
        this.monthenddate =moment(pastDate).format('YYYY-MM-DD').toString();
        this.getTopHistorydata();
        this.cols = [
          { field: 'userName', header: 'User Name' },
          { field: 'userMobileNumber', header: 'Contact' },
          { field: 'invoiceNumber', header: 'Invoice' } ,
          { field: 'paymentMode', header: 'Mode' },
          { field: 'grossTotal', header: 'Amount' }  
      ];
      this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
}
getTopHistorydata(){
  if(this.ID ==undefined)
  {
    this.ids=this.auth.userData().adminId;
  }
  else if(this.ID[1] == undefined){
    this.ids=this.auth.userData().adminId;
  }
else{
this.ids=this.ID[1]
}
console.log(this.ids,"top id")
  this.user.getBillHistory(this.ids,this.startdate,this.monthenddate).subscribe(
 x=>{
    this.historydata = x;

   var helper = {};
   var result = this.historydata.reduce(function(r, o) {
       var key = o.userMobileNumber + '-' + o.userName;
          if(!helper[key]) {
          helper[key] = Object.assign({}, o); // create a copy of o
               r.push(helper[key]);
             } else {
             helper[key].grossTotal += o.grossTotal;
               }
               return r;
                  }, []);
                  console.log(result,"Resulting")
                  this.historydata=result;
  
    this.colss=this.historydata.map(res=> 
      ({
        username:res.userName,
        contact:res.userMobileNumber,
        invoice:res.invoiceNumber,
        mode:this.getPaymentMode(res.paymentMode)
      })
      )
      return result;
 }
)
}
exportPdf() {
  import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
          const doc = new jsPDF.default();
          (doc as any).autoTable(this.exportColumns, this.historydata);
          doc.save('Most_bill_n_amount.pdf');
      })
  })
}
exportExcel() {
import("xlsx").then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.colss);
    const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, "Most_bill_n_amount");
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
  