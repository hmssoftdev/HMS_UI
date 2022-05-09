import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Hotel } from '../../../models/tabelConfiguration.model';
import { CartService } from '../../../service/cart.service';
import { TableService } from '../../../service/table.service';
import {ConfirmationService, ConfirmEventType, Message, MessageService} from 'primeng/api';
import { AuthService } from '../../../service/auth.service';
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
  msg:Message[] =[]
  constructor(
    public tableSvc: TableService, 
    private cartService: CartService,
    private confirmationService: ConfirmationService,
    private msgService: MessageService,
    public auth:AuthService) { }

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
   
    if(tblItem.isBooked){
      // console.log(tblItem.isBooked,"Table Check")
      this.tableSvc.getOrderDataBytblId(this.auth.userData().adminId).subscribe(resp => {
        if(resp){
          this.cartService.save(resp);
           this.selectedTableID = [];
          this.tableList.map((res:any,i) => { 
            
            if(res.name === tblItem.name ){ 
              tblItem.isBooked = true; 
              this.selectedTableID.push(tblItem.name)
             this.cartService.addTable(tblItem); 
            }
          });  
           const tblData = {tblArr:this.selectedTableID, tblSelectionType:'addUpdateTbl'}
           this.tableSelection.emit(tblData) 

        }
      })
    } else {
      tblItem.isBooked = true;
      this.tableSvc.updateSeat(tblItem).then(resp =>{
        this.selectedTableID = [];
        if(resp){
          this.tableList.map((res:any,i) => { 
            if(res.name === tblItem.name ){ 
              tblItem.isBooked = true; 
              this.selectedTableID.push(tblItem.name)
             this.cartService.addTable(tblItem); 
            }
          });  
           const tblData = {tblArr:this.selectedTableID, tblSelectionType:'addUpdateTbl'}
           this.tableSelection.emit(tblData) 
        }
    }, err => {console.log(err)});
  } 
  
}fnTblRelease(tblItem) {
  const index = this.selectedTableID.indexOf(tblItem.name, 0);
    if (index > -1) { 
    this.selectedTableID.splice(index, 1);
    }
    tblItem.isBooked = false;
    this.cartService.tableOperation(this.selectedTableID);
    this.tableSvc.updateSeat(tblItem).then(resp => { 
      this.msgService.add({severity:'success', summary:'Confirmed', detail:'You have accepted'});
      
      }, err => {console.log("seat upadates error", err)});;
    this.tableList.map((res:any) => { 
      if(res.name === tblItem.name ){
        tblItem.isBooked = false; 
      //   this.selectedTableID.push(tblItem.name)
      //  this.cartService.addTable(tblItem); 
      }
    }); 
    const tblData = {tblArr:this.selectedTableID, tblSelectionType:'releaseTbl'}
   this.tableSelection.emit(tblData)  
  }
fnTblReleaseConfirm(tblItem) {

  this.confirmationService.confirm({
    message: 'Once release the table all order will be cancelled. Are you sure that you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle pi-text-warning',
    accept: () => {
     this.fnTblRelease(tblItem)
    },
    reject: () => {
        this.msgService.add({severity:'info', summary:'Rejected', detail:'You have rejected'});
    }
});

  
} 
showBasicDialog() {
  this.displayBasic = true;
}

}
