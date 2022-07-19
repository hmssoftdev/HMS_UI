import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { FoodItem } from '../../../models/historydata';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';
import * as FileSaver from 'file-saver'; 
@Component({
  selector: 'app-fooditem',
  templateUrl: './fooditem.component.html',
  styleUrls: ['./fooditem.component.scss']
})
export class FooditemComponent implements OnInit {
  cars: any[];
  @Input() ID:number[];
  ids:number
  cols:any[];
  exportColumns:any[];
  colss:any[];
  fooddata:FoodItem[];
  strtdate=new Date();
  startdate:string='';
  enddate:string='';
  
  constructor(private translate:TranslateService,public user:UserService,public auth:AuthService) {
  }

  ngOnInit(): void {
    this.startdate=moment(this.strtdate).format('YYYY-MM-DD').toString();
  
    this.cars = [
      { item: 'noodles', invoice: '101',amount:'1002' },
      { item: 'veg noodles', invoice: '101',amount:'1002' },
      { item: 'rice', invoice: '101',amount:'1002' },
      { field: 'color', header: 'Color' }
  ];
  this.cols = [
    { field: 'name', header: 'Food Item' },
    { field: 'count', header: 'Total Quantity' },
    { field: 'total', header: 'Total Amount' }
 
 
 
];
this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  var currentDate = new Date();
  var dated = currentDate.getDate()
    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - dated);
    this.enddate =moment(pastDate).format('YYYY-MM-DD').toString();

 this.fnGetFood()
  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default();
            (doc as any).autoTable(this.exportColumns, this.fooddata);
            doc.save('Food_Item.pdf');
        })
    })
}
exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.colss);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Food_Item");
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
  fnGetFood(){
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
  console.log(this.ids,this.startdate,this.enddate)
    // this.user.getFoodSale(this.ids,this.startdate,this.enddate).subscribe(
    //   res=>{
    //     this.fooddata=res
      
    //   console.log(res,"resp food")
    //   }
    // )
    this.user.getFoodSale(this.ids,this.startdate,this.enddate).subscribe(
      x=>{
     
        if(x)
        this.fooddata=x
        this.colss=this.fooddata.map(res=> 
          ({
            name:res.name,
            count:res.count,
            total:res.total,
          })
          )
        console.log(x,"food res")
      }
    )
    console.log(this.fooddata,"Food data")
  }

}
