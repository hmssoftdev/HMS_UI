import { Component, OnInit, ViewChild } from '@angular/core'; 
import { ModalDirective } from 'ngx-bootstrap/modal'; 
import { Admin } from '../../models/admin';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CommonService } from '../../service/common.service';
import { AdminService } from '../../service/admin.service';
import { Form } from '@angular/forms';
import { CommonMethodsService } from '../../service/common-methods.service';

@Component({
  selector: 'app-hotel-admin',
  templateUrl: './hotel-admin.component.html',
  styleUrls: ['./hotel-admin.component.scss']
})
export class HotelAdminComponent implements OnInit {
  @ViewChild('largeModal') public largeModal: ModalDirective;
  @ViewChild('f') form: any;
  admin: Admin;
  adminList: Admin[] = [];
  selectedAdmins: Admin[] = [];
  states: any;
  cities: any;
  adminDialog: boolean;
  submitted: boolean;
  dataId: number;
  cityFilter: [];
  constructor(
    public adminService: AdminService,
    private msgService: MessageService,
    private commonService: CommonService,
    private confirmationService: ConfirmationService,
    private commonMethod: CommonMethodsService
  ) {
    this.admin = new Admin();
    // this.admin.bankDetails = new Bankdetails();
   }
   categories:any;
   isEdit: boolean;
  ngOnInit(): void {
    this.admin.id = 0;
    this.admin.subscriptionStatus = 2;
    this.admin.startDate = new Date().toLocaleDateString();
    this.admin.endDAte = new Date('02-10-2021').toLocaleDateString();
    this.loadClient();
    this.getClientCategory();
    this.fnGetCitiesList();
    this.fnGetStatesList();
  }

  openNew() {
    // this.admin = {};
    this.submitted = false;
    this.adminDialog = true;
  }

  editAdmin(admin: Admin) {
    this.admin = { ...admin };
    this.adminDialog = true;
  }

  hideDialog() {
    this.adminDialog = false;
    this.submitted = false;
  }

  loadClient(){
    this.adminService.getAdmin().subscribe(resp => {
      if(resp.length > 0){  
       const adminItm = resp.find(x => x.id == x.id);
       this.admin = adminItm;    
      }
    });
  }
  getClientCategory() {
    this.adminService.getClientCategory().subscribe(x => {
      this.categories = x.map(cItem => { 
        return { label:cItem.name, value:cItem.id}
         })  
    });
   
  }
  logoFile(e){
    this.admin.RestaurentLogoFile = this.commonMethod.limitFileSize(e , 200 , 500);
  }
  signFile(e){
    this.admin.SignatureFile = this.commonMethod.limitFileSize(e , 200 , 500);
  }
  sealFile(e){
    this.admin.RestaurentSealFile = this.commonMethod.limitFileSize(e , 200 , 500);
  }
  upiFile(e){
    this.admin.UpiImageFile = this.commonMethod.limitFileSize(e , 200 , 500);
  }

  onSubmit(fData){
    debugger;
    if(fData.invalid) return;
    console.log(fData);
    if(!this.admin.id){
      const dFormData = this.convertFormdata(this.admin);
      // this.admin.id = this.adminList[this.adminList.length - 1].id + 1;
      this.adminService.AddClient(dFormData).subscribe(() => {
        debugger;
          this.msgService.add({severity:'success', summary: 'Successful', detail: 'Admin Details Added!', life: 3000});
          this.loadClient();  
          this.getClientCategory();                                                                                                         
      });
    } else {
      const dFormData = this.convertFormdata(this.admin);
      
      this.adminList[this.findIndexById(this.admin.id)] = this.admin;
      this.adminService.updateCLient(dFormData).subscribe(() => {
        this.msgService.add({severity:'success', summary: 'Successful', detail: 'Admin Details Updated!', life: 3000});
        this.loadClient();
        this.getClientCategory();
      });
    }
    
    this.adminList = [...this.adminList];
    this.adminDialog = false;
    this.dataId = this.admin.id;
  }

  fnGetCitiesList(){
    this.commonService.getCities().subscribe(x => {
      // if(this.admin.stateId){
      //   this.cities = x.filter((city) => city.id === this.admin.stateId).map( cItem => {
      //     return { label: cItem.name, value: cItem.id }
      //   })
      // }
      this.cities = x;
      if(this.admin.stateId){
      this.onStateChange();
      }
    });
  }
  fnGetStatesList(){
    this.commonService.getStates().subscribe(x => {
      this.states = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      }) 
    }); 
  }

  onStateChange(){
    debugger;
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
  convertFormdata(admin:Admin){
    const fd = new FormData();
    for (const [key, value] of Object.entries(admin)) {
      fd.append(key,value);
    }
    return fd;
  }


}
