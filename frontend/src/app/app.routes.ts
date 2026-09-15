import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { EmployeeListComponent } from './employee-list/employee-list';
import { EmployeeFormComponent } from './employee-form/employee-form';
import { EmployeeDetailsComponent } from './employee-details/employee-details';
import { MyProfileComponent } from './my-profile/my-profile';

import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'employee-form',
    component: EmployeeFormComponent,
    canActivate: [authGuard, adminGuard]
  },

  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];