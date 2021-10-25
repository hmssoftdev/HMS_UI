import { Component, OnInit } from '@angular/core';
import { User } from './../../../models/user';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserService } from './../../../service/user.service';
import { CommonService } from './../../../service/common.service'
import { AuthService } from '../../../service/auth.service';
import { ShareDataService } from '../../../service/share-data.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.scss']
})
export class UserConfigComponent implements OnInit {
  user: User;
  submitted: boolean;
  userList: User[] = [];
  userDialog: boolean;
  selectedUsers: User[];
  cities: any;
  states: any;
  constructor(public userSvc: UserService,
    public commonSvc: CommonService,
    private msgService: MessageService,
    private confirmationService: ConfirmationService,
    private authServive: AuthService,
    private shareData: ShareDataService) { }

  ngOnInit(): void {
    this.shareData.currentDiallog.subscribe(dialog => this.userDialog = dialog);
    this.authServive.showLoader = true;
    this.loadData();
  }

  loadData() {
    this.userSvc.getUserList().subscribe(res => {
      this.userList = res;
    this.authServive.showLoader = false;
    });
  }
  openNew() {
    this.user = {};
    this.submitted = false;
    this.shareData.changeDialog(true);
  }
  reset() {
    this.user = {}
    this.submitted = false;
  }
  editUser(user: User) {
    this.user = { ...user };
    this.shareData.changeDialog(true);
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.userName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userSvc.deleteUserData(user.id).subscribe(() => {
            this.userList = this.userList.filter(val => val.userName !== user.userName);
            this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        });
      }
    });
  }
  deleteSelectedUser() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected Users?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userList = this.userList.filter(val => !this.selectedUsers.includes(val));
        this.selectedUsers.map((userId: User) => {
          this.userSvc.deleteUserData(userId.id).subscribe(() => {
            this.selectedUsers = null;
            this.msgService.add({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 })
        })
        })
      }
    });
  }

  findIndexById(id: number) {
    let index = -1;
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].id == id) {
        index = i;
        break;
      }
    }

    return index;
  }
  createId(): string {
    let id = '';
    var chars = '0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
