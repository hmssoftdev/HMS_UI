import { Component, OnInit } from '@angular/core';
import { TodaySale } from '../../models/report';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
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
        this.data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    borderColor: '#42A5F5',
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    borderColor: '#FFA726',
                    fill: false,
                }
            ]
        }
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
    this.dataa = {
        labels: ['Dinning','Home Delivery','Takeaway'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#42A5F5",
                    "#66BB6A",
                    "#FFA726"
                ],
                hoverBackgroundColor: [
                    "#64B5F6",
                    "#81C784",
                    "#FFB74D"
                ]
            }
        ]
    };
    this.sales = [
        { srno: '1', cusname: 'Mubashir', cuscontact: '8693045277', cuscity: 'Mumbai', billno: '17010002',cusamout:'10000' },
        { srno: '2', cusname: 'Owais',    cuscontact: '993021364', cuscity: 'Mumbai', billno: '17010006',cusamout:'1500' },
        { srno: '3', cusname: 'Abrar',    cuscontact: '3322665599', cuscity: 'Mumbai', billno: '17010010',cusamout:'1930' },
        { srno: '4', cusname: 'Musab',    cuscontact: '7788996655', cuscity: 'Mumbai', billno: '17010062',cusamout:'5360' },
        { srno: '5', cusname: 'Sadiq',    cuscontact: '3322665599', cuscity: 'Mumbai', billno: '17010100',cusamout:'1320' },
       
    ];
    
  }

  //excel button click functionality
  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.sales); // Sale Data
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "sales");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  //Bar Chart
//   this.databar = {
//           labels: ['Dinning', 'Home Delivery', 'Takeaway'],
//           datasets: [
//               {
//                   label: 'Mode',
//                   backgroundColor: '#42A5F5',
//                   data: [65,60,70]
//               }
//              ]
//       };


     //Doughnut Chart
    //   this.datadoughnut = {
    //     labels: ['Dinning','Home Delivery','Takeawy'],
    //     datasets: [
    //         {
    //             data: [300, 50, 100],
    //             backgroundColor: [
    //                 "#FF6384",
    //                 "#36A2EB",
    //                 "#FFCE56"
    //             ],
    //             hoverBackgroundColor: [
    //                 "#FF6384",
    //                 "#36A2EB",
    //                 "#FFCE56"
    //             ]
    //         }]    
    //     };


       //Line Chart
    //     this.dataline = {
    //       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //       datasets: [
    //           {
    //               label: 'First Dataset',
    //               data: [65, 59, 80, 81, 56, 55, 40],
    //               fill: false,
    //               borderColor: '#42A5F5'
    //           },
    //           {
    //               label: 'Second Dataset',
    //               data: [28, 48, 40, 19, 86, 27, 90],
    //               fill: false,
    //               borderColor: '#FFA726'
    //           }
    //       ]
    //   };

     //Polar Chart
    //   this.datapolar = {
    //       datasets: [{
    //           data: [
    //               11,
    //               16,
    //               7,
    //               3,
    //               14
    //           ],
    //           backgroundColor: [
    //               "#FF6384",
    //               "#4BC0C0",
    //               "#FFCE56",
    //               "#E7E9ED",
    //               "#36A2EB"
    //           ],
    //           label: 'My dataset'
    //       }],
    //       labels: [
    //           "Red",
    //           "Green",
    //           "Yellow",
    //           "Grey",
    //           "Blue"
    //       ]
    //   };

    //   //Pie Chart
    //   this.datapie = {
    //     labels: ['A','B','C'],
    //     datasets: [
    //         {
    //             data: [300, 50, 100],
    //             backgroundColor: [
    //                 "#FF6384",
    //                 "#36A2EB",
    //                 "#FFCE56"
    //             ],
    //             hoverBackgroundColor: [
    //                 "#FF6384",
    //                 "#36A2EB",
    //                 "#FFCE56"
    //             ]
    //         }]    
    //     };

    //     //Radar Chart
    //     this.dataradar = {
    //       labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
    //       datasets: [
    //           {
    //               label: 'My First dataset',
    //               backgroundColor: 'rgba(179,181,198,0.2)',
    //               borderColor: 'rgba(179,181,198,1)',
    //               pointBackgroundColor: 'rgba(179,181,198,1)',
    //               pointBorderColor: '#fff',
    //               pointHoverBackgroundColor: '#fff',
    //               pointHoverBorderColor: 'rgba(179,181,198,1)',
    //               data: [65, 59, 90, 81, 56, 55, 40]
    //           },
    //           {
    //               label: 'My Second dataset',
    //               backgroundColor: 'rgba(255,99,132,0.2)',
    //               borderColor: 'rgba(255,99,132,1)',
    //               pointBackgroundColor: 'rgba(255,99,132,1)',
    //               pointBorderColor: '#fff',
    //               pointHoverBackgroundColor: '#fff',
    //               pointHoverBorderColor: 'rgba(255,99,132,1)',
    //               data: [28, 48, 40, 19, 96, 27, 100]
    //           }
    //       ]
    //   };
 
    //   //Combo Chart
    //   this.datacombo = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [{
    //         type: 'line',
    //         label: 'Dataset 1',
    //         borderColor: '#42A5F5',
    //         borderWidth: 2,
    //         fill: false,
    //         data: [
    //             50,
    //             25,
    //             12,
    //             48,
    //             56,
    //             76,
    //             42
    //         ]
    //     }, {
    //         type: 'bar',
    //         label: 'Dataset 2',
    //         backgroundColor: '#66BB6A',
    //         data: [
    //             21,
    //             84,
    //             24,
    //             75,
    //             37,
    //             65,
    //             34
    //         ],
    //         borderColor: 'white',
    //         borderWidth: 2
    //     }, {
    //         type: 'bar',
    //         label: 'Dataset 3',
    //         backgroundColor: '#FFA726',
    //         data: [
    //             41,
    //             52,
    //             24,
    //             74,
    //             23,
    //             21,
    //             32
    //         ]
    //     }]
    // };

    //Chart Option For Combo
  

  }


}
    

