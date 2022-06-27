import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { captain } from '../../models/franchise';
import { Hotel } from '../../models/tabelConfiguration.model';
import { AuthService } from '../../service/auth.service';
import { CapnfranService } from '../../service/capnfran.service';
import { TableService } from '../../service/table.service';
import { PrimeNGConfig } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  cap:captain[]=[];
  id:number
  submitted: boolean;
  
  forms: FormGroup;
  constructor(private primengConfig: PrimeNGConfig,
    public tableSvc: TableService,public capnfran :CapnfranService,public msgser:MessageService,public auth:AuthService,private fb: FormBuilder) { 
      // this.createForm();
    }
    // createForm() {
    //   this.forms = this.fb.group({
    //     userName: ['', Validators.required ]
    //   });
    // }
  value1:string;
  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.id=this.auth.userData().adminId
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
  this.getCaptain()
  }

  openNew(){
    this.captain={
      user:{

      },
      tableList:[{

      }]
    }
    this.captainDialog=true;
    console.log("Hello")
    this.submitted=false
  }
  tableSelection(){
    this.tabsele=true;
  //   this.tableSvc.getTableData().subscribe(res => {
  //     this.tablelist = res;
  // })
  }
  onSubmit(captainForm){
    this.submitted=true
    console.log(this.captain,"data hceck")
    this.capnfran.AddCaptain(this.captain).subscribe(x=>{
      if(x.result==='Data Added'){
        this.msgser.add({severity:'info',
        summary:'SuccessFully Added', detail: 'Captain',life: 2000});
        this.getCaptain()
      }
    })
    this.captainDialog=false
  }
  getCaptain() {
    this.capnfran.ReadCaptain(this.id).subscribe(x=>{
      this.cap=x
    })
  }

}


