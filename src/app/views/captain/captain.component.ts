import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { captain } from '../../models/franchise';
import { Hotel } from '../../models/tabelConfiguration.model';
import { CapnfranService } from '../../service/capnfran.service';
import { TableService } from '../../service/table.service';

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
  constructor(public tableSvc: TableService,public capnfran :CapnfranService,public msgser:MessageService) { }
  value1:string;
  ngOnInit(): void {
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
    this.tableSvc.getTableData().subscribe(res => {
      this.tablelist = res;
  })
  }
  openNew(){
    this.captainDialog=true;
    console.log("Hello")
  }
  tableSelection(){
    this.tabsele=true;
  //   this.tableSvc.getTableData().subscribe(res => {
  //     this.tablelist = res;
  // })
  }
  onSubmit(captainForm){
    console.log(this.captain,"data hceck")
    this.capnfran.AddCaptain(this.captain).subscribe(x=>{
      if(x.result==='Data Added'){
        this.msgser.add({severity:'info',
        summary:'SuccessFully Updated', detail: 'Captain',life: 2000});
      }
    })
  }

}
