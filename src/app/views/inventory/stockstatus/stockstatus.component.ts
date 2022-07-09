import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stockstatus',
  templateUrl: './stockstatus.component.html',
  styleUrls: ['./stockstatus.component.scss']
})
export class StockstatusComponent implements OnInit {
stoclmodal:boolean
  constructor() { }
  wei:any[]
  weigth:string;
  ngOnInit(): void {
    this.wei=[
      {name:"Kg",value:"kilo"},
      {name:'Gms',value:'grams'}
    ]
  }
openNew(){
  this.stoclmodal=true
}
}
