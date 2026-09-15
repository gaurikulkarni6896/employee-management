import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetailsComponent {

  employee: Employee;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.employee = data;

    console.log('Employee Details Dialog:', this.employee);
  }
}