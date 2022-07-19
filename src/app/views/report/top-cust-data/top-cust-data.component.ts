import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { graph, graphs } from '../../../models/graphs';
import { TodaySale } from '../../../models/report';
import { AuthService } from '../../../service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { updateConstructor } from 'typescript';
import { UserService } from '../../../service/user.service';
import { Historydata } from '../../../models/historydata';
import * as FileSaver from 'file-saver'; 
@Component({
  selector: 'app-top-cust-data',
  templateUrl: './top-cust-data.component.html',
  styleUrls: ['./top-cust-data.component.scss']
})
export class TopCustDataComponent implements OnInit {
  data: graph;
   datagraph:graphs;
   @Input() ID:number[]
  ids:number;
  startdate:string='';
  monthenddate:string='';
  date= new Date;
  historydata:Historydata[];
  visit:number;
  cols:any[];
  exportColumns:any[];
  colss:any[];
  // cust1:string='';
  // cust2:string='';
  // cus3:string='';
  // ct1:number;
 
  // hist:Historydata={
  //   visitCount:1,
  // }
 
  constructor(private auth: AuthService ,private translate:TranslateService,public user:UserService) {
    // this.datagraph={
    //   labeldine:"Dinning",
    //   labelhd:"Home Delivery",
    //   labeltakeaway:"TakeAway",
    //   bgdine:"#42A5F5",
    //   bgdh:"#66BB6A",
    //   bgtake:"#FFA726"
    // }
    
  }
  
  ngOnInit(): void {
    this.cols = [
      { field: 'userName', header: 'User Name' },
      { field: 'userMobileNumber', header: 'Contact' },
      { field: 'visitCount', header: 'Visited' } ,
      { field: 'grossTotal', header: 'Total' }  
  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
    this.startdate=moment(this.date).format('YYYY-MM-DD').toString();
    // this.id=this.auth.userData().adminId;
   
  
 var currentDate = new Date();
  var dated = currentDate.getDate()
    var pastDate = new Date(currentDate)
    pastDate.setDate(pastDate.getDate() - dated);
    this.monthenddate =moment(pastDate).format('YYYY-MM-DD').toString();
    this.getRepeatedHistorydata()
  }
  getRepeatedHistorydata(){
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
                  if(helper[key].hasOwnProperty('visitCount')===true)
                    helper[key].visitCount ++;
                    else{
                      helper[key].visitCount=1; 
                    }
               
                  }
                  return r;
                     }, []);
                     console.log(result,"Result")
                     this.historydata=result;

                     this.datagraph={
                      labeldine: this.historydata.find(x => x.userName).userName,
                      labelhd:'HD',
                      labeltakeaway:'TA',
                      data:this.historydata.find(x => x.visitCount).visitCount,
                      bgdine:"#42A5F5",
                      bgtake:"#42A5S8"
                     }

                     this.data = {
                      labels:[this.datagraph.labeldine,this.datagraph.labelhd,this.datagraph.labeltakeaway ],
                      datasets: [
                          {
                              label: 'Customer Name',
                              borderColor: this.datagraph.bgdine,
                              data:[this.datagraph.data],
                          },
                          {
                              label: 'Customer Name',
                              data: [this.datagraph.data],
                              borderColor: this.datagraph.bgtake,
                          
                          }
                      ]
                  }      
this.historydata=this.historydata.filter(function(){
  return function(items, property, min, max) {
    return items.filter(function(item){
      return item[property] >= min && item[property] <= max;
    }  )    ;
  }  } ) ;
     
  this.colss=this.historydata.map(res=> 
    ({
      username:res.userName,
      contact:res.userMobileNumber,
      visit:res.visitCount,
      total:res.grossTotal
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
            doc.save('Repeated_Customer.pdf');
        })
    })
}
exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.colss);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Repeated_Customer");
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

}
