import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { EmployeeService, CreateEmployee } from '../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent {

  employee: CreateEmployee = {

    name: '',
    email: '',
    department: '',
    city:''

  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
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

    console.log(
      'Creating employee:',
      this.employee
    );

    this.employeeService
      .createEmployee(this.employee)
      .subscribe({

        next: (response) => {

          console.log(
            'Employee created:',
            response
          );

          alert(
            'Employee added successfully'
          );

          this.router.navigate([
            '/employees'
          ]);

        },

        error: (error) => {

          console.error(
            'Create employee error:',
            error
          );

          alert(
            'Error adding employee'
          );

        }

      });

  }

  goToEmployeeList(): void {

    this.router.navigate([
      '/employees'
    ]);

  }

}