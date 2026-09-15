import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { ChartComponent }
  from '../shared/chart/chart';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from '../services/employee.service';
import { Employee } from '../employee';
import { DepartmentChartComponent } from '../shared/department-chart/department-chart';
import { EmployeeDetailsComponent } from '../employee-details/employee-details';

@Component({
  selector: 'app-employee-list',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    DepartmentChartComponent,
    ChartComponent
  ],

  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  isLoading = true;

  errorMessage = '';

  activeSearchColumn: string | null = null;

  idSearch = '';
  nameSearch = '';
  emailSearch = '';
  departmentSearch = '';
  citySearch = '';

 constructor(
  private employeeService: EmployeeService,
  private router: Router,
  private dialog: MatDialog,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit(): void {

    console.log('EMPLOYEE LIST INIT');

    this.loadEmployees();

  }


  loadEmployees(): void {

    console.log('GET EMPLOYEES START');

    this.isLoading = true;

    this.errorMessage = '';

    this.employeeService.getEmployees().subscribe({

    next: (data: Employee[]) => {

  console.log('API RESPONSE:', data);
  console.log('API COUNT:', data?.length);

  this.employees = Array.isArray(data)
    ? [...data]
    : [];

  console.log(
    'EMPLOYEES IN COMPONENT:',
    this.employees
  );

  console.log(
    'FINAL COUNT:',
    this.employees.length
  );

  this.isLoading = false;

  // Force Angular to update the template
  this.cdr.detectChanges();

  console.log(
    'LOADING:',
    this.isLoading
  );

},

      error: (error) => {

        console.error(
          'EMPLOYEE API ERROR:',
          error
        );

        this.employees = [];

        this.errorMessage =
          'Unable to load employees from server.';

        this.isLoading = false;

      },

      complete: () => {

        console.log(
          'EMPLOYEE API COMPLETE'
        );

        // Safety: never remain stuck on loading
        this.isLoading = false;

      }

    });

  }

  //citywise

  get cityChartLabels(): string[] {

  const cities = new Map<string, string>();

  for (const employee of this.employees) {

    const rawCity =
      employee.city?.trim() || 'Unknown';

    const key =
      rawCity.toLowerCase();

    if (!cities.has(key)) {

      const displayCity =
        key === 'unknown'
          ? 'Unknown'
          : key.charAt(0).toUpperCase() +
            key.slice(1);

      cities.set(
        key,
        displayCity
      );

    }

  }

  return Array.from(
    cities.values()
  );

}


get cityChartValues(): number[] {

  const counts =
    new Map<string, number>();

  for (const employee of this.employees) {

    const city =
      employee.city?.trim() || 'Unknown';

    const key =
      city.toLowerCase();

    counts.set(
      key,
      (counts.get(key) || 0) + 1
    );

  }

  return Array.from(
    counts.values()
  );

}


  get filteredEmployees(): Employee[] {

    const id =
      this.idSearch.trim().toLowerCase();

    const name =
      this.nameSearch.trim().toLowerCase();

    const email =
      this.emailSearch.trim().toLowerCase();

    const department =
      this.departmentSearch.trim().toLowerCase();

    const city =
      this.citySearch.trim().toLowerCase();


    return this.employees.filter(
      (employee: Employee) => {

        return (

          String(employee.id ?? '')
            .toLowerCase()
            .includes(id)

          &&

          String(employee.name ?? '')
            .toLowerCase()
            .includes(name)

          &&

          String(employee.email ?? '')
            .toLowerCase()
            .includes(email)

          &&

          String(employee.department ?? '')
            .toLowerCase()
            .includes(department)

          &&

          String(employee.city ?? '')
            .toLowerCase()
            .includes(city)

        );

      }
    );

  }


  get departmentCount(): number {

    return new Set(

      this.employees

        .map(
          employee =>
            String(
              employee.department ?? ''
            )
              .trim()
              .toLowerCase()
        )

        .filter(Boolean)

    ).size;

  }


  toggleSearch(column: string): void {

    this.activeSearchColumn =
      this.activeSearchColumn === column
        ? null
        : column;

  }


  resetFilters(): void {

    this.idSearch = '';

    this.nameSearch = '';

    this.emailSearch = '';

    this.departmentSearch = '';

    this.citySearch = '';

    this.activeSearchColumn = null;

  }


  getInitial(
    name: string | null | undefined
  ): string {

    return (
      name
        ?.trim()
        ?.charAt(0)
        ?.toUpperCase()
      || '?'
    );

  }


  goToEmployeeForm(): void {

    this.router.navigate([
      '/employee-form'
    ]);

  }


  viewEmployee(
    employee: Employee
  ): void {

    this.dialog.open(
      EmployeeDetailsComponent,
      {
        width: '500px',
        maxWidth: '90vw',
        data: employee
      }
    );

  }

}