import { Component, OnInit } from '@angular/core';
import { TableService } from "../../../service/table.service";
import { Hotel } from "../../../models/tabelConfiguration.model";

@Component({
  selector: 'app-hotel-setting',
  templateUrl: './hotel-setting.component.html',
  styleUrls: ['./hotel-setting.component.scss']
})
export class HotelSettingComponent implements OnInit {
  currentView:string = "advTblBooking";
  tableList:Hotel[];
  constructor(public tableSvc: TableService) { }

  ngOnInit(): void {
    this.loadTabaleData();
  }

  loadTabaleData() {
    this.tableSvc.getTableData().subscribe(res => {
        this.tableList = res;
    })
}
  fnTblBook(tblItem){ 
    this.tableList.map((res:any) => { 
        if(res.name === tblItem.name ){
         res.isBooked = true;
        }
      });
  }
}
