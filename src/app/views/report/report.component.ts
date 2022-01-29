import { Component, OnInit } from '@angular/core';
import { graphs } from '../../models/graphs';
import { TodaySale } from '../../models/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  datagraph:graphs={
    labeldine:"Dinning",
    labelhd:"Home Delivery",
    labeltakeaway:"TakeAway",
    bgdine:"#42A5F5",
    bgdh:"#66BB6A",
    bgtake:"#FFA726"
  }
    dateValuee:Date;
    dateValue:Date;

    todaySale: TodaySale = {
      Dining: 20, HD: 41, Takeaway: 25,
      dine: 100,
      hd: 320,
      takeaway: 250
    }

    dataa: any;

    chartOptionss: any;
datadoughnut: any;
data: any;
chartOptions: any;
    sales: { srno: string; cusname: string; cuscontact: string; cuscity: string; billno: string;cusamout:string;}[];
    constructor() {
        this.chartOptions = {
            responsive: true,
            title: {
                display: true,
                text: 'Combo Bar Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        }
    }
ngOnInit() {
   
    this.sales = [
        { srno: '1', cusname: 'Mubashir', cuscontact: '8693045277', cuscity: 'Mumbai', billno: '17010002',cusamout:'10000' },
        { srno: '2', cusname: 'Owais',    cuscontact: '993021364', cuscity: 'Mumbai', billno: '17010006',cusamout:'1500' },
        { srno: '3', cusname: 'Abrar',    cuscontact: '3322665599', cuscity: 'Mumbai', billno: '17010010',cusamout:'1930' },
        { srno: '4', cusname: 'Musab',    cuscontact: '7788996655', cuscity: 'Mumbai', billno: '17010062',cusamout:'5360' },
        { srno: '5', cusname: 'Sadiq',    cuscontact: '3322665599', cuscity: 'Mumbai', billno: '17010100',cusamout:'1320' },
       
    ];
    
  }

  //excel button click functionality
 


}
    

