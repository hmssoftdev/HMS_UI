import { Component, OnInit } from '@angular/core';
import { TableService } from '../../service/table.service';

@Component({
  selector: 'app-captain',
  templateUrl: './captain.component.html',
  styleUrls: ['./captain.component.scss']
})
export class CaptainComponent implements OnInit {
  captainDialog :boolean;
  tablelist:string[];
  tables:string[];
  tabsele:boolean
  constructor(public tableSvc: TableService) { }
  value1:string;
  ngOnInit(): void {
    // this.tablelist=[
    //   {
    //     name:"",
    //   }
    // ]
    this.tableSvc.getTableData().subscribe(res => {
      this.tablelist = res.map(res=>res.name);
  })
  }
  openNew(){
    this.captainDialog=true;
    console.log("Hello")
  }
  tableSelection(){
    this.tabsele=true;
  }
}
