import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchmodal:boolean;
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
    this.purchmodal=true
  }
}
