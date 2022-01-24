import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-summary',
  templateUrl: './today-summary.component.html',
  styleUrls: ['./today-summary.component.scss']
})
export class TodaySummaryComponent implements OnInit {

  constructor() { }
  dateValue:Date;
  dateValuee:Date;


  ngOnInit(): void {

  }

}
