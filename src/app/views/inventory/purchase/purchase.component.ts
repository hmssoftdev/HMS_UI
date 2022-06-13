import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  purchmodal:boolean;
  constructor() { }

  ngOnInit(): void {
  }
  openNew(){
    this.purchmodal=true
  }
}
