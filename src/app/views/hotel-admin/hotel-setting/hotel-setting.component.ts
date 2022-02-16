import { Hotel } from "../../../models/tabelConfiguration.model";
import {Component, EventEmitter,Input,OnInit,Output} from '@angular/core';


import {CartService} from '../../../service/cart.service';
import {TableService} from '../../../service/table.service';
import { AuthService } from "../../../service/auth.service";
import { HistorydataComponent } from "../../report/historydata/historydata.component";
import { UserService } from "../../../service/user.service";
import { Historydata } from "../../../models/historydata";
@Component({
  selector: 'app-hotel-setting',
  templateUrl: './hotel-setting.component.html',
  styleUrls: ['./hotel-setting.component.scss']
})
export class HotelSettingComponent implements OnInit {
  tableList: Hotel[];
  displayModal: boolean;
 
  maxdate :string='2022-02-14';
  mindate :string ='2022-02-01';
  adminId :number;
  date=new Date();
  displayBasic: boolean;
  
  @Output() tableSelection = new EventEmitter < any > ();
  selectedTableID: Array < any > = [];
  tablesname: any[];
  sale:any[]=[];
 
  historydata: Historydata []=[];
  constructor(public authservice: AuthService,public tableSvc: TableService, private cartService: CartService,private auth : AuthService,private user:UserService) {}
  ngOnInit() {
  //   this.sale = [
  //     { srno: '1', cusname: 'Mubashir', cuscontact: '8693045277', cuscity: 'Mumbai', billno: '17010002',cusamout:'10000' },
  //     { srno: '2', cusname: 'Owais',    cuscontact: '993021364', cuscity: 'Mumbai', billno: '17010006',cusamout:'1500' },
  //     { srno: '3', cusname: 'Abrar',    cuscontact: '3322665599', cuscity: 'Mumbai', billno: '17010010',cusamout:'1930' },
  //     { srno: '4', cusname: 'Musab',    cuscontact: '7788996655', cuscity: 'Mumbai', billno: '17010062',cusamout:'5360' },
  //     { srno: '5', cusname: 'Sadiq',    cuscontact: '3322665599', cuscity: 'Mumbai', billno: '17010100',cusamout:'1320' },
     
  // ];
  this.date=new Date();
  // this.authservice.showLoader=true;
 

  
  console.log(this.date);
this.adminId=this.auth.userData().adminId;

    this.selectedTableID = [];
    this.loadTabaleData();
    this.tablesname = [{
        label: '{{tblItem.name}}',
        value: '!fullPrice'
      },
      {
        label: 'Price Low to High',
        value: 'fullPrice'
      }
    ];
  }

  loadTabaleData() {
    this.tableSvc.getTableData().subscribe(res => {
      this.tableList = res;
    })
  }

  fnTblBook(tblItem) {
    this.selectedTableID = [];
    if (tblItem.isBooked) {
      this.tableSvc.getOrderDataBytblId(tblItem.id).subscribe(resp => {
        if (resp) {
          console.log(resp);
          this.cartService.save(resp);
        }
      })
    } else {
      tblItem.isBooked = true;
      this.tableSvc.updateSeat(tblItem).subscribe(resp => {});
      this.tableOperation(tblItem);
    }
    // this.ref.close(tblItem);
  }
  fnTblRelease(tblItem) {
    tblItem.isBooked = false;

    const index = this.selectedTableID.indexOf(tblItem.name, 0);
    if (index > -1) {
      this.selectedTableID.splice(index, 1);
      this.cartService.tableOperation(this.selectedTableID);
      this.tableSvc.updateSeat(tblItem).subscribe(resp => {});
    }
  }

  tableOperation(tblItem) {
    this.tableList.map((res: any) => {
      if (res.name === tblItem.name) {
        tblItem.isBooked = true;
        if (this.selectedTableID.indexOf(tblItem.name) == -1) {
          this.selectedTableID.push(tblItem.name)
          this.cartService.addTable(tblItem);
          this.cartService.tableOperation(this.selectedTableID);
        }
      }
    });

    this.tableSelection.emit(this.selectedTableID)
  }

  showBasicDialog() {
    this.displayBasic = true;
  }
}

