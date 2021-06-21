import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSettingComponent } from './views/admin-setting/admin-setting.component';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/userLogin.component';
import { MenuItemComponent } from './views/menu-item/menu-item.component';
import { RegisterComponent } from './views/register/register.component'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'admin-setting',
    component: AdminSettingComponent,

  },
  {
    path: 'menuItem',
    component: MenuItemComponent,
  },
  
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    
      {
        path: 'dish',
        loadChildren: () => import('./views/dish/dish.module').then(m => m.DashboardModule)
      },
      {
        path: 'admin-config',
        loadChildren: () => import('./views/admin-setting/admin.module').then(m => m.AdminModule)
      },
    {
        path: 'users',
        loadChildren: () => import('./views/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'masterAdmin',
        loadChildren: () => import('./views/master-admin/master-admin.module').then(m => m.MasterAdminModule)
      },
      {
        path: 'userLogin',
        loadChildren: () => import('./views/login/user-module.module').then(m => m.UserModuleModule)
      },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
export const routingComponents = [MenuItemComponent];
