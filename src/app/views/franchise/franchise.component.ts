import { Component, OnInit } from '@angular/core';
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
  constructor( public commonService:CommonService) { }

  ngOnInit(): void {
    this.commonService.getStates().subscribe(x => {
      this.states = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      }) 
    }); 
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
  }
  onStateChange(){ 
    // this.cityFilter = this.cities.filter((city) => city.stateId === this.admin.stateId);
  }

  openNew(){
    this.modal=true
  }
}
