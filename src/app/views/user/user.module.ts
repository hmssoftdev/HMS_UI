import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from './../../shared/shared.module'
import { UserConfigComponent } from './user-config/user-config.component'
import { TranslateModule } from '@ngx-translate/core';

import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
// import { UserFormModuleModule } from '../user/user-form/user-form-module.module'
import { UserDetailComponent } from './user-detail/user-detail.component';
@NgModule({
  declarations: [UserConfigComponent, UserFeedbackComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    TranslateModule,
  ],
  exports:[TranslateModule]
})
export class UserModule { }
