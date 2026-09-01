import { Component } from '@angular/core';
import { EmployeeFormComponent } from './employee-form/employee-form';
import { EmployeeListComponent } from './employee-list/employee-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    EmployeeFormComponent,
    EmployeeListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}