import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import {
  EmployeeService,
  Employee
} from '../services/employee.service';


@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css'
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee | null = null;

  isLoading = false;
  errorMessage = '';

 constructor(
  private route: ActivatedRoute,
  private router: Router,
  private employeeService: EmployeeService,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    console.log('EmployeeDetailsComponent loaded');

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    console.log('Employee ID from URL:', id);

    if (!id) {
      this.errorMessage = 'Invalid employee ID.';
      return;
    }

    this.loadEmployee(id);
  }

  loadEmployee(id: number): void {

    console.log('Calling API for employee:', id);

    this.isLoading = true;
    this.errorMessage = '';

    this.employeeService.getEmployeeById(id).subscribe({

      next: (employee: Employee) => {

        console.log('Employee API response:', employee);

        this.employee = employee;
this.isLoading = false;

this.cdr.detectChanges();

        console.log('Loading stopped');
      },

      error: (error: any) => {

        console.error('Employee API error:', error);

        this.isLoading = false;
        this.errorMessage =
          'Unable to load employee details.';
      }

    });
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}