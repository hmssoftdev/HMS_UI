import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { TableService } from "../../../service/table.service";
import { Hotel } from "../../../models/tabelConfiguration.model";
import * as FileSaver from 'file-saver';
import { AuthService } from "../../../service/auth.service";
import { TranslateService } from "@ngx-translate/core";
@Component({
    selector: 'app-table-configuration',
    templateUrl: './table-configuration.component.html',
    styleUrls:['./table-configuration.compoent.scss']
})
export class TableConfigurationComponent implements OnInit {
    table: Hotel;
   
    tableList: Hotel[] = [];
    hallType: { label: string; value: boolean; }[];
    tableShape: { label: string; value: string; }[];
    tableDialog: boolean;
    submitted: boolean;
    selectedTables: Hotel[];
    cols:any[];
     exportColumns:any[];
      colss:any[]
    constructor(public tableSvc: TableService,
        private msgService: MessageService,
        private confirmationService: ConfirmationService,
        private authService: AuthService,public translate: TranslateService
    ) {
    //     translate.addLangs(['english', 'hindi','gujrati','marathi','bengali']);
    // translate.setDefaultLang('english');
     }
    ngOnInit(): void {

         this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'seat', header: 'Seat' },
      { field: 'shape', header: 'Shape' },
     { field: 'isAc', header: 'Type' },

      

   
  ];
  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

        this.authService.showLoader = true;
        this.hallType = [{ label: 'AC', value: true },
        { label: 'Non AC', value: false }];
        this.tableShape = [{ label: 'Square', value: 'square' },
        { label: 'Circle', value: 'circle' }];
        this.loadTabaleData();
    }

    loadTabaleData() {
        this.tableSvc.getTableData().subscribe(res => {
            this.tableList = res;
            this.authService.showLoader = false;
            this.colss=this.tableList.map(x=>({Name:x.name,Seat:x.seat,Shape:x.shape,Type:x.isAc=== true?'AC' :'Non AC'}))
        })
    }

    saveTableData(tableForm) {
        console.log(tableForm);
        this.submitted = true;
        if (tableForm.invalid) return;
        console.log(this.table);
        if (this.table.id) {
            this.tableSvc.updateTable(this.table).subscribe(() => {
                this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Table Updated', life: 30000 });
                this.loadTabaleData();
            })
        } else {
            this.tableSvc.addTable(this.table).subscribe(() => {
                this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Table Created', life: 3000 });
                this.loadTabaleData();
            })
        }

        this.tableDialog = false;
    }

    exportPdf() {
        import("jspdf").then(jsPDF => {
            import("jspdf-autotable").then(x => {
                const doc = new jsPDF.default();
                (doc as any).autoTable(this.exportColumns, this.tableList);
                doc.save('Table_list.pdf');
            })
        })
    }
    
    exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.colss);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "Table");
      });
    }
    saveAsExcelFile(buffer: any, Category: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, Category + '_List_' + EXCEL_EXTENSION);
    }
    deleteTable(table: Hotel) {
        debugger
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected Users?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
            alert('TESTING')
            }
          });
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + table.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.tableSvc.deleteData(table.id).subscribe(() => {
                    // this.tableList = this.tableList.filter(val => val.id !== table.id);
                    this.loadTabaleData()
                    this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Table Deleted', life: 3000 });
                })
            }
        });
    }


    reset() {

    }
    openNew() {
        this.table = {};
        this.submitted = false;
        this.tableDialog = true;
        this.table.seat=0;
    }
    editDish(table: Hotel) {
        this.table = { ...table };
        this.tableDialog = true;
    }

}