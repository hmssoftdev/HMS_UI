import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { roleConfig } from '../../constant/rolesConfig';
import { AuthGuard } from '../../helpers/auth.guard';
import { HotelAdminComponent } from './hotel-admin.component';
import { HotelSettingComponent } from './hotel-setting/hotel-setting.component';
import { TableConfigurationComponent } from './table-configuration/table-configuration.component';


const routes: Routes = [
  {
    path: 'profile',
    component: HotelAdminComponent,
    data: {
      title: 'Hotel Admin Profile',
      roles: roleConfig.authRoles.franchise
    },
    canActivate:[AuthGuard]
  },
  {
  path: 'billingcategory',
  component: HotelSettingComponent,
  data: {
    title: 'Hotel Admin Setting',
    roles: roleConfig.authRoles.franchise
  },
  canActivate:[AuthGuard]
},
{
  path: 'table-configuration',
  component: TableConfigurationComponent,
  data: {
    title: 'Table Configuration',
    roles: roleConfig.authRoles.franchise
  },
  canActivate:[AuthGuard]
}
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [
    RouterModule
  ]
})
export class HotelAdminRoutingModule { }
