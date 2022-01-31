import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-today-summary',
  templateUrl: './today-summary.component.html',
  styleUrls: ['./today-summary.component.scss']
})
export class TodaySummaryComponent implements OnInit {
  powercount:number=0;
  sales: { srno: string; cusname: string; cuscontact: string; cuscity: string; billno: string; cusamout: string; }[];

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
    this.sales = [
      { srno: '1', cusname: 'Mubashir', cuscontact: '8693045277', cuscity: 'Mumbai', billno: '17010002',cusamout:'10000' },
      { srno: '2', cusname: 'Owais',    cuscontact: '993021364', cuscity: 'Mumbai', billno: '17010006',cusamout:'1500' },
      { srno: '3', cusname: 'Abrar',    cuscontact: '3322665599', cuscity: 'Mumbai', billno: '17010010',cusamout:'1930' },
      { srno: '4', cusname: 'Musab',    cuscontact: '7788996655', cuscity: 'Mumbai', billno: '17010062',cusamout:'5360' },
      { srno: '5', cusname: 'Sadiq',    cuscontact: '3322665599', cuscity: 'Mumbai', billno: '17010100',cusamout:'1320' },
     
  ];
  
}
  }


