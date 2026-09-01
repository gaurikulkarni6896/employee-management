import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {

    console.log('Loading employees...');

    this.employeeService.getEmployees().subscribe({

      next: (data) => {

        console.log('Employees received:', data);

        this.employees = data;
      },

      error: (error) => {

        console.error('Error loading employees:', error);

      }

    });
  }

  deleteEmployee(id: number): void {

    console.log('Deleting employee:', id);

    this.employeeService.deleteEmployee(id).subscribe({

      next: (response) => {

        console.log('Delete response:', response);

        alert('Employee deleted successfully');

        // Reload list from database
        this.loadEmployees();

      },

      error: (error) => {

        console.error('Error deleting employee:', error);

      }

    });
  }
}