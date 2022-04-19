import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from './../../../models/user';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from './../../../service/user.service';
import { CommonService } from './../../../service/common.service'
import { ShareDataService } from '../../../service/share-data.service';
import { FormsModule  } from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

export class UserFormComponent implements OnInit {
  @Input() user?: User;
  @Output() saveEvent = new EventEmitter();
  // user: User;
  submitted: boolean; 
  userDialog: boolean;
  selectedUsers: User[];
  cities: any;
  states: any;
  cityFilter: [];
  userData = JSON.parse(sessionStorage.getItem('HMSUserData'));
  constructor(public userSvc: UserService,
     public commonSvc: CommonService, 
     private msgService: MessageService, 
     private confirmationService: ConfirmationService,
     private shareData: ShareDataService) { }

  ngOnInit(): void {
    this.shareData.currentDiallog.subscribe(dialog => this.userDialog = dialog);
    this.getStates();
    this.getCities();
     this.user.contact='0';
  }
  getCities() {
    this.commonSvc.getCities().subscribe(x => {
      this.cities = x;
      this.onStateChange();
    });
  }
  getStates() {
    this.commonSvc.getStates().subscribe(x => {
      this.states = x.map(cItem => {
        return { label: cItem.name, value: cItem.id }
      })
    });
  }
  onStateChange() {
    this.cityFilter = this.cities.filter((city) => city.stateId === this.user.stateId);
  }
  saveUser() {
    this.submitted = true;
    // console.log(this.user);
    if (this.user.userName.trim()) {
      if (this.user.id) {
        this.user.id = Number(this.user.id)
        this.user.userType = this.userData.userType;
        this.userSvc.updateUser(this.user).subscribe(() => { 
          this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'user Updated', life: 3000 });
          this.saveEvent.emit(this.user);
        })

      } else {
        this.user.userType = this.userData.userType;
        this.userSvc.AddUser(this.user).subscribe(() => {  
          this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000 });
          this.saveEvent.emit(this.user);
        })
      }
      // this.shareData.changeDialog(false);
    }
  }

  reset(){
    this.user = {};
  }

  // deleteUser(user: User) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + user.userName + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.userSvc.deleteUserData(user.id).subscribe(() => {
  //         this.userList = this.userList.filter(val => val.userName !== user.userName);
  //         this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
  //       });
  //     }
  //   });
  // }
  // deleteSelectedUser() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected Users?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.userList = this.userList.filter(val => !this.selectedUsers.includes(val));
  //       this.selectedUsers.map((userId: User) => {
  //         this.userSvc.deleteUserData(userId.id).subscribe(() => {
  //           this.selectedUsers = null;
  //           this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 })
  //         })
  //       })
  //     }
  //   });
  // }

  // findIndexById(id: number) {
  //   let index = -1;
  //   for (let i = 0; i < this.userList.length; i++) {
  //     if (this.userList[i].id == id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

  // createId(): string {
  //   let id = '';
  //   var chars = '0123456789';
  //   for (var i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }
}
