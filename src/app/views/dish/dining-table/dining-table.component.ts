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
  displayBasic: boolean;
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
    this.selectedTableID = [];
    if(tblItem.isBooked){
      this.tableSvc.getOrderDataBytblId(tblItem.id).subscribe(resp => {
        if(resp){
          this.cartService.save(resp);
          this.tableList.map((res:any) => { 
            if(res.name === tblItem.name ){
              tblItem.isBooked = true; 
              this.selectedTableID.push(tblItem.name)
             this.cartService.addTable(tblItem); 
            }
          });  
         this.tableSelection.emit(this.selectedTableID)

        }
      })
    } else {
      tblItem.isBooked = true;
      this.tableSvc.updateSeat(tblItem).subscribe(resp =>{
        this.tableList.map((res:any) => { 
  this.tableList.map((res:any) => { 
        this.tableList.map((res:any) => { 
          if(res.name === tblItem.name ){
            tblItem.isBooked = true; 
      tblItem.isBooked = true; 
            tblItem.isBooked = true; 
            this.selectedTableID.push(tblItem.name)
           this.cartService.addTable(tblItem); 
     this.cartService.addTable(tblItem); 
           this.cartService.addTable(tblItem); 
          }
        }); 
  }); 
        }); 
      this.tableSelection.emit(this.selectedTableID)

    });
  } 
  
}
fnTblRelease(tblItem) {
  tblItem.isBooked = false;
  // const index = this.selectedTableID.indexOf(tblItem.name, 0);
  // if (index > -1) {
  //   this.selectedTableID.splice(index, 1);
    // this.cartService.tableOperation(this.selectedTableID);
    this.tableSvc.updateSeat(tblItem).subscribe(resp => {});
    this.tableList.map((res:any) => { 
      if(res.name === tblItem.name ){
        tblItem.isBooked = false; 
      //   this.selectedTableID.push(tblItem.name)
      //  this.cartService.addTable(tblItem); 
      }
    }); 
    this.tableSelection.emit(this.selectedTableID)
  // }
} 
showBasicDialog() {
  this.displayBasic = true;
}
}
