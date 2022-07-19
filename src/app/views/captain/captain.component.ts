import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { captain } from '../../models/franchise';
import { Hotel } from '../../models/tabelConfiguration.model';
import { AuthService } from '../../service/auth.service';
import { CapnfranService } from '../../service/capnfran.service';
import { TableService } from '../../service/table.service';
import { PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-captain',
  templateUrl: './captain.component.html',
  styleUrls: ['./captain.component.scss']
})
export class CaptainComponent implements OnInit {
  captainDialog :boolean;
  tablelist:Hotel[];
  tables:string[];
  tabsele:boolean
  captain:captain;
  cap:captain[]=[];
  id:number
  submitted: boolean;
  cols:any[];
  exportColumns:any[];
  colss:any[]
  forms: FormGroup;
  pdfobj:any[]
  constructor(private primengConfig: PrimeNGConfig,
    public tableSvc: TableService,public capnfran :CapnfranService,public msgser:MessageService,public auth:AuthService,private fb: FormBuilder) { 
      // this.createForm();
    }
    // createForm() {
    //   this.forms = this.fb.group({
    //     userName: ['', Validators.required ]
    //   });
    // }
  value1:string;
  ngOnInit(): void {

    this.primengConfig.ripple = true;
    this.id=this.auth.userData().adminId
    this.captain={
      // id:,
      user:{

      },
      tableList:[{

      }]
    }
    // this.tablelist=[
    //   {
    //     name:"",
    //   }
    // ]
    this.cols = [
      { field: 'userName', header: 'Name' },
      { field: 'contact', header: 'Contact' },
      { field: 'email', header: 'Email' },
     { field: 'tableList', header: 'Table' }, 
   


   
  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

    this.tableSvc.getTableData().subscribe(res => {
      this.tablelist = res;
  })
  this.getCaptain()
  }

  openNew(){
    this.captain={
      user:{

      },
      tableList:[{

      }]
    }
    this.captainDialog=true;
    console.log("Hello")
    this.submitted=false
  }
  tableSelection(){
    this.tabsele=true;
  //   this.tableSvc.getTableData().subscribe(res => {
  //     this.tablelist = res;
  // })
  }
  onSubmit(captainForm){
    this.submitted=true
    console.log(this.captain,"data hceck")
    this.capnfran.AddCaptain(this.captain).subscribe(x=>{
      if(x.result==='Data Added'){
        this.msgser.add({severity:'info',
        summary:'SuccessFully Added', detail: 'Captain',life: 2000});
        this.getCaptain()
      }
    })
    this.captainDialog=false
  }
  getCaptain() {
    this.capnfran.ReadCaptain(this.id).subscribe(x=>{
      this.cap=x

      this.colss=this.cap.map(res=> 
        ({
          Name:res.user.userName,
          Contact:res.user.contact,
          Email:res.user.email,
          Table:res.tableList,
        }))

        this.pdfobj =this.cap.map(x=>({
          userName:x.user.userName,
          contact:x.user.contact,
          email:x.user.email,
          tableList:x.tableList
        }))
        console.log(this.pdfobj)
    })
    // .map(x=>{x.name})
  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default();
            (doc as any).autoTable(this.exportColumns, this.pdfobj);
            doc.save('Captain_list.pdf');
        })
    })
}
exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.colss);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Captain");
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


