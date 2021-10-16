import { Component } from "@angular/core";
import { TableService } from "../../../service/table.service";
import { Hotel } from "../../../models/tabelConfiguration.model";
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthService } from "../../../service/auth.service";
@Component({
    selector: 'app-table-configuration',
    templateUrl: './table-configuration.component.html',
})
export class TableConfigurationComponent {
    table: Hotel;
    tableList: Hotel[] = [];
    hallType: { label: string; value: boolean; }[];
    tableShape: { label: string; value: string; }[];
    tableDialog: boolean;
    submitted: boolean;
    selectedTables: Hotel[];
    constructor(public tableSvc: TableService,
        private msgService: MessageService,
        private confirmationService: ConfirmationService,
        private authServive: AuthService
    ) { }
    ngOnInit(): void {
        this.authServive.showLoader = true;
        this.hallType = [{ label: 'AC', value: true },
        { label: 'Non AC', value: false }];
        this.tableShape = [{ label: 'Square', value: 'square' },
        { label: 'Circle', value: 'circle' }];
        this.loadTabaleData();
    }

    loadTabaleData() {
        this.tableSvc.getTableData().subscribe(res => {
            this.tableList = res;
            this.authServive.showLoader = false;

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

    deleteTable(table: Hotel) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + table.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.tableSvc.deleteData(table.id).subscribe(() => {
                    this.tableList = this.tableList.filter(val => val.id !== table.id);
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
    }
    editDish(table: Hotel) {
        this.table = { ...table };
        this.tableDialog = true;
    }

}