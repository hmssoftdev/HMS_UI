import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Hotel } from '../../../models/tabelConfiguration.model';
import { CartService } from '../../../service/cart.service';
import { TableService } from '../../../service/table.service';

@Component({
  selector: 'app-dining-table',
  templateUrl: './dining-table.component.html',
  styleUrls: ['./dining-table.component.scss']
})
export class DiningTableComponent implements OnInit {
  tableList:Hotel[];
  @Output() tableSelection = new EventEmitter<any>();
  selectedTableID:Array<any> = [];
  constructor(public tableSvc: TableService, private cartService: CartService) { }

  ngOnInit(): void {
    this.selectedTableID = [];
    this.loadTabaleData();
  }

  loadTabaleData() {
    this.tableSvc.getTableData().subscribe(res => {
        this.tableList = res;
    })
}
  fnTblBook(tblItem){ 
      debugger
      this.selectedTableID = [];
    if(tblItem.isBooked){

    } else {
      tblItem.isBooked = true;
      this.tableSvc.addTable(tblItem).subscribe(resp =>{
    });
  } 
  this.tableList.map((res:any) => { 
    if(res.name === tblItem.name ){
      tblItem.isBooked = true; 
      this.selectedTableID.push(tblItem.name)
     this.cartService.addTable(tblItem); 
    }
  }); 
    
  this.tableSelection.emit(this.selectedTableID)
}
}
