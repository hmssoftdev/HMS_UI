import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { roleConfig } from '../../constant/rolesConfig';
import { AuthGuard } from '../../helpers/auth.guard';
import { UserConfigComponent } from './user-config/user-config.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { TranslateModule } from '@ngx-translate/core';
const routes: Routes = [
  {
    path:'',component:UserConfigComponent, 
    data:{
      title:"User Configuration",
      roles: roleConfig.authRoles.captain
    },
    canActivate: [AuthGuard]
  },
  {
    path:'user-feedback', component:UserFeedbackComponent,  
    data:{
      title: "User Feedback",
      roles: roleConfig.authRoles.captain
    },
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
