import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { franchis } from '../../models/franchise';
import { AuthService } from '../../service/auth.service';
import { CapnfranService } from '../../service/capnfran.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-franchise',
  templateUrl: './franchise.component.html',
  styleUrls: ['./franchise.component.scss']
})
export class FranchiseComponent implements OnInit {
modal:boolean;
 states: any;
 cities: any;
 cityFilter: [];
 franch:franchis;
 franchise:franchis;
 loading:boolean=true;
  constructor( public commonService:CommonService,public capnfran:CapnfranService,private messageServie: MessageService,
    public auth:AuthService) { }

  ngOnInit(): void {
    this.commonService.getStates().subscribe(x => {
      this.states = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      }) 
    }); 
    
    this.franch={
      userName:'',
      

  };
    this.commonService.getCities().subscribe(x => {
      // if(this.admin.stateId){
      //   this.cities = x.filter((city) => city.id === this.admin.stateId).map( cItem => {
      //     return { label: cItem.name, value: cItem.id }
      //   })
      // }
      this.cities = x;
      // if(this.admin.stateId){
      // this.onStateChange();
      // }
    });
    this.frachiseget()
  }
  frachiseget(){
    this.capnfran.GetFranchise(this.auth.userData().adminId).subscribe(x=>{
      this.franchise=x
      this.loading=false
      return this.franchise;
    })
  }
   
  
  savefranchData(franchForm){
    // console.log(franchForm,"values")
    //  console.log(this.franch,"values")

    this.capnfran.AddFranchise(this.franch).subscribe(x=>{
      console.log(x)
      if(x.result=='Data Added'){
      this.messageServie.add({severity:'info',
     summary:'SuccessFully Added', detail: 'Franchise',life: 2000});
      }
      this.frachiseget()
    })
    this.modal=false

  }
  onStateChange(){ 
    // this.cityFilter = this.cities.filter((city) => city.stateId === this.admin.stateId);
  }

  openNew(){
    this.modal=true
  }
}
