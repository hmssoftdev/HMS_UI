import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver'; 
import { AuthService } from '../../../service/auth.service';
import { CapnfranService } from '../../../service/capnfran.service';
@Component({
  selector: 'app-captainreport',
  templateUrl: './captainreport.component.html',
  styleUrls: ['./captainreport.component.scss']
})
export class CaptainreportComponent implements OnInit {
  cols:any[];
  exportColumns:any[];
  colss:any[];
  display: boolean;
  constructor(public capfran:CapnfranService,public auth:AuthService) { }

  ngOnInit(): void {
    // this.capfran.ReadCaptain(this.auth.userData().adminId).subscribe(x=>{
    //   if(x.length > 0)
    //   this.display=true
    // })
  }
  exportExcel(){

  }
  exportPdf(){

  }
}
