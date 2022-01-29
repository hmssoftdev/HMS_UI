import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historydata',
  templateUrl: './historydata.component.html',
  styleUrls: ['./historydata.component.scss']
})
export class HistorydataComponent implements OnInit {
  sales: { srno: string; cusname: string; cuscontact: string; cuscity: string; billno: string; cusamout: string; }[];

  constructor() { }

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


  
