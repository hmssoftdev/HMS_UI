import { Component, EventEmitter, OnInit, Output, VERSION } from '@angular/core';
import { routingComponents } from '../../app.routing';
import { roleConfig } from '../../constant/rolesConfig';
import { AuthService } from '../../service/auth.service';
import { ViewChild, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import { LanguageComponent } from '../../views/language/language.component';
import { MenuItem } from 'primeng/api';

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
  @Output() fnMenuSidebar = new EventEmitter();
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
     const user = this.authService.userData();
     this.userType = user.userType;
    this.navMenu = [
      {
        name:'Dish',
        badge:'Hello',
        access:roleConfig.authRoles.guest,
        icon:'pi pi-money-bill',
        style:'Font-size:1rem',
        subItems: [
          {
            name:'Dish Category Config',
            routing:'/dish/dish-category-config',
            access:roleConfig.authRoles.admin,
            title:'Dish Category Config'
          },
          {
            name:'Dish Config',
            routing:'/dish',
            access:roleConfig.authRoles.admin,
            title:'Dish Config',
          },
          {
            name:'Dish Menu',
            routing:'/dish/dish-menu',
            access:roleConfig.authRoles.guest,
            title:'Dish Menu'
          },
          
          {
            name:'Table Config',
            routing:'/table-configuration',
            access:roleConfig.authRoles.admin,
            title:'Table Config'
          },
          {
            name:'Order List',
            routing:'/dish/order-list',
            access:roleConfig.authRoles.admin,
            title:'Order List'
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
            title:'User Config'
          },
          // {
          //   name:'Table Config',
          //   routing:'/table-configuration',
          //   access:roleConfig.authRoles.admin,
          //   title:'Table Config'
          // },
          {
            name:'User Feedback',
            routing:'/users/user-feedback',
            access:roleConfig.authRoles.user,
            title:'User Feedback'
          }
          // {
          //   name:'Order Status',
          //   routing:'/order-status',
          //   access:roleConfig.authRoles.user,
          //   title:'Order Status'
          // } 
        ]
      },
      {
        name:'Report',
        routing:'/report',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-inbox',
        title:'Report',
        subItems: []
      },
      {
        name:'Setting',
        routing:'/setting',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-shield',
        title:'Setting',
        subItems: []
      },
      // {
      //   name:'Help',
      //   routing:'/help',
      //   access:roleConfig.authRoles.admin,
      //   icon:'pi pi-slack',
      //   title:'Help',
      //   subItems: []
      // },
      {
        name:'Language',
        routing:'/language',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-book',
        title:'Language',
        subItems: []
      },
      {
        name:'Help',
        routing:'/help',
        access:roleConfig.authRoles.admin,
        icon:'pi pi-slack',
        title:'Help',
        subItems: []
      },
      // {
      //   name:'Hotel Admin',
      //   routing:'/hotel-admin',
      //   access:roleConfig.authRoles.admin,
      //   icon:'pi pi-users',
      //   title:'Hotel Admin',
      //   subItems: []
      // }, 
     
    
      {
        name:'Master Admin',
        routing:'/admin-setting',
        access:roleConfig.authRoles.sa,
        icon:'pi pi-id-card',
        title:'Master Admin',
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
