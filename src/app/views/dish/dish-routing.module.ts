import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { DishMenuComponent } from './dish-menu/dish-menu.component';
import { DishComponent } from './dish.component';
import { DishCategoryConfigComponent } from './dish-category-config/dish-category-config.component';
import { AuthGuard } from '../../helpers/auth.guard';
import { roleConfig } from '../../constant/rolesConfig';
import { BillingComponent } from './billing/billing.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
const routes: Routes = [
  {
    path: '',
    component: DishComponent,
    data: {
      title: 'Dish Configuration',
      roles: roleConfig.authRoles.admin
    },
    canActivate:[AuthGuard]
  },
  {
    path:'dish-menu',
    component:DishMenuComponent,
    data:{
      title:"Dish Menu",
      roles:roleConfig.authRoles.guest
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'dish-category-config',
    component: DishCategoryConfigComponent,
    data: {
      title: 'Dish Category Config',
      roles: roleConfig.authRoles.admin
    },
    canActivate:[AuthGuard]
  },
  // {
  //   path:'checkout',
  //   component:CheckoutComponent,
  //   data:{
  //     title:"Checkout",
  //     roles:roleConfig.authRoles.user
  //   },
  //   canActivate:[AuthGuard]
  // },
  {
    path:'order-list',
    component:OrdersListComponent,
    data:{
      title:"Order List",
      roles:roleConfig.authRoles.admin
    },
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule {

}
