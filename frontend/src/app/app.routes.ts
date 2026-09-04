import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { EmployeeListComponent } from './employee-list/employee-list';
import { EmployeeFormComponent } from './employee-form/employee-form';
import { EmployeeDetailsComponent } from './employee-details/employee-details';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent
  },

  {
    path: 'employees',
    component: EmployeeListComponent
  },

  {
    path: 'employee-form',
    component: EmployeeFormComponent
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