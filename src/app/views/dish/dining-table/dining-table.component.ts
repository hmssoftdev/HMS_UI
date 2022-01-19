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
  displayModal:boolean ;
  displayBasic:boolean;
  @Output() tableSelection = new EventEmitter<any>();
  selectedTableID:Array<any> = [];
  tablesname :any[];
  constructor(public tableSvc: TableService, private cartService: CartService) { }

  ngOnInit(){
    this.selectedTableID = [];
    this.loadTabaleData();
    this.tablesname = [
      { label: '{{tblItem.name}}', value: '!fullPrice' },
      { label: 'Price Low to High', value: 'fullPrice' }
      ];
  }

  loadTabaleData() {
    this.tableSvc.getTableData().subscribe(res => {
        this.tableList = res;
    })
}
  fnTblBook(tblItem){  
      this.selectedTableID = [];
    if(tblItem.isBooked){
      this.tableSvc.getOrderDataBytblId(tblItem.id).subscribe(resp => {
        if(resp){
          console.log(resp);
          this.cartService.save(resp); 
        }
      })
    } else {
      tblItem.isBooked = true;
      this.tableSvc.updateSeat(tblItem).subscribe(resp =>{
    });
    this.tableOperation(tblItem);
  } 
 
}
fnTblRelease(tblItem){
    tblItem.isBooked = false;
    this.tableSvc.updateSeat(tblItem).subscribe(resp =>{
  });
  
}
tableOperation(tblItem){
  this.tableList.map((res:any) => { 
    if(res.name === tblItem.name ){
      tblItem.isBooked = true; 
      this.selectedTableID.push(tblItem.name)
     this.cartService.addTable(tblItem); 
    }
  }); 
    
  this.tableSelection.emit(this.selectedTableID)
}

showBasicDialog() {
  this.displayBasic = true;
}
}
