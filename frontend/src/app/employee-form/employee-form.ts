import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent {

  @Output() employeeAdded = new EventEmitter<void>();

  employee: Employee = {
    name: '',
    email: '',
    department: ''
  };

  constructor(
    private employeeService: EmployeeService
  ) {}

  addEmployee(): void {

    if (
      !this.employee.name ||
      !this.employee.email ||
      !this.employee.department
    ) {
      alert('Please enter all fields');
      return;
    }

    this.employeeService.createEmployee(this.employee).subscribe({

      next: () => {

        alert('Employee added successfully');

        this.employee = {
          name: '',
          email: '',
          department: ''
        };

        this.employeeAdded.emit();
      },

      error: (error) => {
        console.error('Error adding employee:', error);
      }

    });
  }
}