import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { config } from 'rxjs';
import { roleConfig } from './constant/rolesConfig';
import { AuthGuard } from './helpers/auth.guard';
import { AdminSettingComponent } from './views/admin-setting/admin-setting.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/userLogin.component'; 
import { RegisterComponent } from './views/register/register.component'; 
import { InvoiceComponent } from './views/invoice/invoice.component'
import { TableConfigurationComponent } from '../app/views/hotel-admin/table-configuration/table-configuration.component'
import { OrderStatusComponent } from './shared/order-status/order-status.component';
export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page',
      roles: roleConfig.authRoles.guest
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page',
      roles: roleConfig.authRoles.guest
    }
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    data: {
      title: 'invoice',
      roles: roleConfig.authRoles.guest
    }
  },
  {
    path: 'dish',
    loadChildren: () => import('./views/dish/dish.module').then(m => m.DishModule),
  }, 
  {
    path: 'admin-setting',
    component: AdminSettingComponent,
    data: {
    roles: roleConfig.authRoles.sa
    },
    canActivate: [AuthGuard]

  }, 
      {
        path: 'hotel-admin',
        loadChildren: () => import('./views/hotel-admin/hotel-admin.module').then(m => m.HotelAdminModule),
      },
      {
        path: 'bankDetail',
        loadChildren: () => import('./views/client/client.module').then(m => m.ClientModule)
  },
    {
        path: 'users',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule),
     
      },
      {path:'order-status', component:OrderStatusComponent, 
      data: {
        title: "Order Status",
        roles: roleConfig.authRoles.user
      },
        canActivate:[AuthGuard]},
      {
        path: '404',
        component: P404Component,
        data: {
          title: 'Page 404',
          roles: roleConfig.authRoles.guest
        }
      },
      {
        path: '500',
        component: P500Component,
        data: {
          title: 'Page 500',
          roles: roleConfig.authRoles.guest
        }
  },
  {
    path: '',
    redirectTo: '/dish/dish-menu',
    pathMatch: 'full',

      },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [];
