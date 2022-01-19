import { Component, OnInit } from '@angular/core';
import { routingComponents } from '../../app.routing';
import { roleConfig } from '../../constant/rolesConfig';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sidebar-new',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  lblMenuToggle = 0;
  navMenu: Array<any>;
  userType:number;
  lblsidebar = true;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
     const user = this.authService.userData();
     this.userType = user.userType;
    this.navMenu = [
      {
        name:'Dish',
        routing:'',
        access:roleConfig.authRoles.guest,
        icon:'pi pi-money-bill',
        subItems: [
          {
            name:'Dish Config',
            routing:'/dish',
            access:roleConfig.authRoles.admin,
          },
          {
            name:'Dish Menu',
            routing:'/dish/dish-menu',
            access:roleConfig.authRoles.guest,
          },
          {
            name:'Dish Category Config',
            routing:'/dish/dish-category-config',
            access:roleConfig.authRoles.admin,
          },
          {
            name:'Order List',
            routing:'/dish/order-list',
            access:roleConfig.authRoles.admin,
          }
        ]
      },
      {
        name:'Users',
        routing:'',
        access:roleConfig.authRoles.user,
        icon:'pi pi-user',
        subItems: [
          {
            name:'User Config',
            routing:'/users',
            access:roleConfig.authRoles.admin,
          },
          {
            name:'Table Config',
            routing:'/table-configuration',
            access:roleConfig.authRoles.admin,
          },
          {
            name:'User Feedback',
            routing:'/users/user-feedback',
            access:roleConfig.authRoles.user,
          },
          {
            name:'Order Status',
            routing:'/order-status',
            access:roleConfig.authRoles.user,
          } 
        ]
      },
      {
        name:'Report',
        routing:'/report',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-inbox',
        subItems: []
      },
     
      {
        name:'Hotel Admin',
        routing:'/hotel-admin',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-users',
        subItems: []
      }, 
     
    
      {
        name:'Master Admin',
        routing:'/admin-setting',
        access:roleConfig.authRoles.sa,
        icon:'pi pi-id-card',
        subItems: []
      }
    ]
  }

  fnToggle(n:number){
    this.lblMenuToggle = this.lblMenuToggle == n ? 0 : n;
  }
  fnToggleSidebar(){
    this.lblsidebar = !this.lblsidebar;
  }
  
}
