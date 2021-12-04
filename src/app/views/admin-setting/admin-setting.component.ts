import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Admin } from '../../models/admin';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from '../../service/common.service';
import { AdminService } from '../../service/admin.service';
import { Router } from '@angular/router';
import { ShareDataService } from '../../service/share-data.service';
import { CommonMethodsService } from '../../service/common-methods.service';
import { AuthService } from '../../service/auth.service';
import { Registration } from '../../models/registration';
import { RegisterService } from '../../service/register.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-admin-setting',
  templateUrl: './admin-setting.component.html',
  styleUrls: ['./admin-setting.component.scss']
})
export class AdminSettingComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('f') form: any;
  admin: Admin;
  adminList: Admin[] = [];
  selectedAdmins: Admin[] = [];
  states: any;
  cities: any;
  adminDialog: boolean;
  submitted: boolean;
  cityFilter: [];
  users: Registration;
  // status: { label: string; value: string; }[];
  statusString: string;
  sendId: number;
  regAdminDialog: boolean;
  constructor(
    public adminService: AdminService,
    private msgService: MessageService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private shareData: ShareDataService,
    private commonMethod: CommonMethodsService,
    private authServive: AuthService,
    private registerService: RegisterService
  ) {
    this.admin = new Admin();
    // this.admin.bankDetails = new Bankdetails();
  }

  categories: any;
  isEdit: boolean;

  ngOnInit(): void {
    this.authServive.showLoader = true;
    this.shareData.currentId.subscribe(id => this.sendId = id);
    console.log(this.sendId);
    this.users = {};
    // this.status = [
    // { label: 'Lead', value: 'lead' },
    // { label: 'Pending', value: 'pending' },
    // { label: 'Approved', value: 'approved' }];
    this.loadClient();
    this.getClientCategory();
    this.fnGetCitiesList();
    this.fnGetStatesList();
  }

  openNew() {
    this.admin = {};
    this.submitted = false;
    this.adminDialog = true;
  }
  editAdmin(admin: Registration) {
    this.users = { ...admin };
    this.regAdminDialog = true;
  }

  hideDialog() {
    this.adminDialog = false;
    this.submitted = false;
  }
  
  loadClient() {
    this.adminService.getClientList().subscribe(res => {
      this.adminList = res;
      this.adminList.map(aItem => {
        let sDate = new Date();
        let eDate = new Date(aItem.endDAte);
        const diffTime = Math.abs(eDate.getTime() - sDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        aItem.age = diffDays;
        console.log(diffTime + " milliseconds");
        console.log(diffDays + " days");
        this.authServive.showLoader = false;
      })
    });
  }
  getClientCategory() {
    this.adminService.getClientCategory().subscribe(x => {
      this.categories = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      })
    });

  }
  logoFile(e) {
    this.admin.RestaurentLogoFile = this.commonMethod.limitFileSize(e, 500);
  }
  signFile(e) {
    this.admin.SignatureFile = this.commonMethod.limitFileSize(e, 500);
  }
  sealFile(e) {
    this.admin.RestaurentSealFile = this.commonMethod.limitFileSize(e, 500);
  }
  upiFile(e) {
    this.admin.UpiImageFile = this.commonMethod.limitFileSize(e, 500);
  }
  onSubmit(fData) {
    debugger;
    if (fData.invalid) return;
    if (!this.admin.id) {
      // this.admin.id = this.adminList[this.adminList.length - 1].id + 1;
      const dFormData = this.convertFormdata(this.admin);
      console.log(dFormData);
      this.adminService.AddClient(dFormData).subscribe(() => {
        this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Admin Details Added!', life: 3000 });
        this.loadClient();
        this.getClientCategory();
        this.fnGetCitiesList();
        this.fnGetStatesList();
      });
    } else {

      this.adminList[this.findIndexById(this.admin.id)] = this.admin;
      const dFormData = this.convertFormdata(this.admin);
      console.log(dFormData);
      this.adminService.updateCLient(dFormData).subscribe(() => {
        this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Admin Details Updated!', life: 3000 });
        this.loadClient();
        this.getClientCategory();
        this.fnGetCitiesList();
        this.fnGetStatesList();
      });
    }

    this.adminList = [...this.adminList];
    this.adminDialog = false;
  }

  approve(admin: Admin) {
    this.admin = admin;
    this.admin.subscriptionStatus = 3;
    console.log(this.admin)
    this.adminService.updateSubscription(this.admin).subscribe((res) => {
      this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Admin Details Updated!', life: 3000 });
      console.log(this.admin.subscriptionStatus);
    })
  }

  deleteAdmin(admin: Admin) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + admin.businessName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminService.deleteAdminData(admin.id).subscribe(() => {
          this.adminList = this.adminList.filter(val => val.businessName !== admin.businessName);
          this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Admin Deleted', life: 3000 });
        });
      }
    });
  }
  deleteSelectedAdmin() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.adminList = this.adminList.filter(val => !this.selectedAdmins.includes(val));
        this.selectedAdmins.map((adminId: Admin) => {
          this.adminService.deleteAdminData(adminId.id).subscribe(() => {
            this.selectedAdmins = null;
            this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Admins Deleted', life: 3000 })
          })
        })
      }
    });
  }
  fnGetCitiesList() {
    this.commonService.getCities().subscribe(x => {
      this.cities = x;
      if (this.admin.stateId) {
        this.onStateChange();
      }
    });
  }
  fnGetStatesList() {
    this.commonService.getStates().subscribe(x => {
      this.states = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      })
    });
  }

  onStateChange() {
    this.cityFilter = this.cities.filter((city) => city.stateId === this.admin.stateId);
  }
  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.adminList.length; i++) {
      if (this.adminList[i].id == id) {
        index = i;
        break;
      }
    }

    return index;
  }
  convertFormdata(admin: Admin) {
    const fd = new FormData();
    for (const [key, value] of Object.entries(admin)) {
      fd.append(key, value);
    }
    return fd;
  }
  fnWorkAsAdmin() {
    this.router.navigate(['/dish']);
    this.shareData.sendId(14);
  }
  fnAddAdmin(){
    this.regAdminDialog = true;
  }
  
  fnRegisterAdmin(users:Registration){
    this.users.userType = 2;
    // this.users.id = parseInt(this.users.id)
    debugger
    if(!this.users.id){
    this.registerService.addAdmin(this.users).subscribe(res => { 
      this.regAdminDialog = false;
      this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Admin Registration done!', life: 3000 });
      this.loadClient();
    })
  } else{
    this.registerService.updateAdmin(this.users).subscribe(res => { 
      this.regAdminDialog = false;
      this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Admin Registration done!', life: 3000 });
      this.loadClient();
    })
  }
  }
  fnHideAdminDig(){
    this.regAdminDialog = false;
  }
  fnBusinessInfo(id:number){
    this.adminService.getAdminById(id).subscribe((resp:Admin) => {
      this.admin = resp ? resp : {};
      this.adminDialog = true;
    })
   
  }

}
