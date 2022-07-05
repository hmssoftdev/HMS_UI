import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { franchis } from '../../models/franchise';
import { AuthService } from '../../service/auth.service';
import { CapnfranService } from '../../service/capnfran.service';
import { CommonService } from '../../service/common.service';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseComponent implements OnInit {
modal:boolean;
 states: any;
 cities: any;
 cityFilter: [];
 franch:franchis;
 franchise:franchis[];
 loading:boolean=true;
 exportColumns:any[];
 cols:any[];
  colss:any[];
  constructor( public commonService:CommonService,public capnfran:CapnfranService,private messageServie: MessageService,
    public auth:AuthService) { }

  ngOnInit(): void {
    this.commonService.getStates().subscribe(x => {
      this.states = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      }) 
    }); 
    this.cols = [
      { field: 'userName', header: 'UserName' },
      { field: 'password', header: 'Password' },
      { field: 'contact', header: 'MobileNo' },
      { field: 'email', header: 'Email' },
      { field: 'city', header: 'Location' },
  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));
  //   this.franch={
  //     // id: ,
  //     userName:'',
      

  // };
    this.commonService.getCities().subscribe(x => {
      // if(this.admin.stateId){
      //   this.cities = x.filter((city) => city.id === this.admin.stateId).map( cItem => {
      //     return { label: cItem.name, value: cItem.id }
      //   })
      // }
      this.cities = x;
      // if(this.admin.stateId){
      // this.onStateChange();
      // }
    });
    this.frachiseget()
  }
  frachiseget(){
    this.capnfran.GetFranchise(this.auth.userData().adminId).subscribe(x=>{
      this.franchise=x
      this.loading=false
      this.colss=this.franchise.map(res=> ({Username:res.userName, Password:res.password,
        Contact:res.contact,Email:res.email,Location:res.city}))
      return this.franchise;
    })
  }
  editFranchise(fran:franchis) {
    this.franch = { ...fran };
    this.modal = true;
  }
   
  
  savefranchData(franchForm){
    // console.log(franchForm,"values")
    //  console.log(this.franch,"values")
    if(this.franch.id!==undefined){

      this.capnfran.UpdateFranchsie(this.franch).subscribe(x=>{
        if(x.result=='Data updated')
          
        {
          this.messageServie.add({severity:'success',
          summary:'SuccessFully Updated', detail: 'Franchise',life: 2000});
          this.frachiseget()
        }
      })
    }
    else{
      this.capnfran.AddFranchise(this.franch).subscribe(x=>{
        console.log(x)
        if(x.result=='Data Added'){
        this.messageServie.add({severity:'info',
       summary:'SuccessFully Added', detail: 'Franchise',life: 2000});
        }
        this.frachiseget()
      })
    }

    this.franchise= [...this.franchise];
    this.modal=false

  }
  exportPdf() {
    import("jspdf").then(jsPDF => {
        import("jspdf-autotable").then(x => {
            const doc = new jsPDF.default();
            (doc as any).autoTable(this.exportColumns, this.franchise);
            doc.save('Franchise_list.pdf');
        })
    })
}
exportExcel() {
  import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.colss);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Franchise");
  });
}
saveAsExcelFile(buffer: any, Category: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, Category + '_List_' + + EXCEL_EXTENSION);
}
  onStateChange(){ 
    // this.cityFilter = this.cities.filter((city) => city.stateId === this.admin.stateId);
  }
  fnFreez(data){

  }
  fnWrkAdmin(data){
    
  }
  openNew(){
    this.franch=new franchis()
    this.modal=true
  }
}
