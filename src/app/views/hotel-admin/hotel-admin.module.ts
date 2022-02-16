import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HotelAdminComponent } from './hotel-admin.component';
import { HotelAdminRoutingModule } from './hotel-admin-routing.module';
import { HotelSettingComponent } from './hotel-setting/hotel-setting.component';
import { TableConfigurationComponent } from './table-configuration/table-configuration.component';
import { DatahistoryComponent } from '../datahistory/datahistory.component'


@NgModule({
  declarations: [HotelAdminComponent, HotelSettingComponent, TableConfigurationComponent, DatahistoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    HotelAdminRoutingModule
  ]
})
export class HotelAdminModule { }
