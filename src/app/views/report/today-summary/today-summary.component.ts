import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-summary',
  templateUrl: './today-summary.component.html',
  styleUrls: ['./today-summary.component.scss']
})
export class TodaySummaryComponent implements OnInit {
  powercount:number=0;
  constructor() { }
  dateValue:Date;
  dateValuee:Date;

  powercountstop:any= setInterval(()=>{
    this.powercount++;
    if(this.powercount==10)
    {
      clearInterval(this.powercountstop);

    }
  },1000)
  ngOnInit(): void {

  }

}
