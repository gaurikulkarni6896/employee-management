import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  Chart,
  registerables
} from 'chart.js';

import {
  EmployeeService,
  Employee
} from '../services/employee.service';


Chart.register(...registerables);


@Component({
  selector: 'app-employee-list',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './employee-list.html',

  styleUrl: './employee-list.css'
})


export class EmployeeListComponent implements OnInit {

  @ViewChild('departmentChart')
  departmentChartCanvas?: ElementRef<HTMLCanvasElement>;

  private departmentChart?: Chart;

  employees: Employee[] = [];

  isLoading = false;

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
  private cdr: ChangeDetectorRef
) {}




  ngOnInit(): void {

    this.loadEmployees();

  }

viewEmployee(employeeId: number): void {
  console.log('Viewing employee:', employeeId);

  this.router.navigate([
    '/employees',
    employeeId
  ]);
}

  loadEmployees(): void {

    console.log('GET employees API called');

    this.isLoading = true;

    this.errorMessage = '';

  this.employeeService.getEmployees().subscribe({

  next: (data: Employee[]) => {

    console.log('Employees received:', data);

    this.employees = data;
    this.isLoading = false;

    this.cdr.detectChanges();

    this.createDepartmentChart();
  },

  error: (error: any) => {

    console.error(
      'Failed to load employees:',
      error
    );

    this.errorMessage =
      'Unable to load employees from server.';

    this.isLoading = false;
  }

});
  }

  // ==========================================
  // DEPARTMENT COUNT
  // ==========================================

  get departmentCount(): number {

    const departments = this.employees

      .map(
        employee => employee.department
      )

      .filter(
        department => department
      );


    return new Set(
      departments
    ).size;

  }


  // ==========================================
  // TOGGLE SEARCH
  // ==========================================

  toggleSearch(column: string): void {

    if (
      this.activeSearchColumn === column
    ) {

      this.activeSearchColumn = null;

    } else {

      this.activeSearchColumn = column;

    }

  }


  // ==========================================
  // FILTERED EMPLOYEES
  // ==========================================

  get filteredEmployees(): Employee[] {

    return this.employees.filter(
      employee => {

        const id =
          String(
            employee.id ?? ''
          ).toLowerCase();


        const name =
          String(
            employee.name ?? ''
          ).toLowerCase();


        const email =
          String(
            employee.email ?? ''
          ).toLowerCase();


        const department =
          String(
            employee.department ?? ''
          ).toLowerCase();


        const city =
          String(
            employee.city ?? ''
          ).toLowerCase();


        return (

          id.includes(
            this.idSearch.toLowerCase()
          )

          &&

          name.includes(
            this.nameSearch.toLowerCase()
          )

          &&

          email.includes(
            this.emailSearch.toLowerCase()
          )

          &&

          department.includes(
            this.departmentSearch.toLowerCase()
          )

          &&

          city.includes(
            this.citySearch.toLowerCase()
          )

        );

      }
    );

  }


  // ==========================================
  // CREATE DEPARTMENT CHART
  // ==========================================

  createDepartmentChart(): void {

    if (!this.departmentChartCanvas) {

      console.log(
        'Chart canvas is not available yet.'
      );

      return;

    }


    const canvas =
      this.departmentChartCanvas.nativeElement;


    const context =
      canvas.getContext('2d');


    if (!context) {

      console.error(
        'Unable to get chart context.'
      );

      return;

    }


    // Destroy existing chart

    if (this.departmentChart) {

      this.departmentChart.destroy();

      this.departmentChart = undefined;

    }


    // ========================================
    // DEPARTMENT COUNTS
    // ========================================

    const departmentCounts: {
      [key: string]: number
    } = {};


    this.employees.forEach(
      employee => {

        const department =
          employee.department?.trim()
          || 'Unknown';


        departmentCounts[department] =
          (departmentCounts[department] || 0) + 1;

      }
    );


    console.log(
      'Department counts:',
      departmentCounts
    );


    const departments =
      Object.keys(
        departmentCounts
      );


    const counts =
      Object.values(
        departmentCounts
      );


    // ========================================
    // CREATE CHART
    // ========================================

    this.departmentChart =
      new Chart(
        context,
        {

          type: 'bar',

          data: {

            labels: departments,

            datasets: [

              {

                label: 'Employees',

                data: counts,

                borderWidth: 1

              }

            ]

          },

          options: {

            responsive: true,

            maintainAspectRatio: false,

            animation: false,

            scales: {

              y: {

                beginAtZero: true,

                ticks: {

                  stepSize: 1

                },

                title: {

                  display: true,

                  text: 'Number of Employees'

                }

              },

              x: {

                title: {

                  display: true,

                  text: 'Department'

                }

              }

            },

            plugins: {

              legend: {

                display: true

              }

            }

          }

        }

      );


    console.log(
      'Department chart created successfully.'
    );

  }


  // ==========================================
  // EMPLOYEE INITIAL
  // ==========================================

  getInitial(
    name: string
  ): string {

    if (!name) {

      return '?';

    }


    return name
      .charAt(0)
      .toUpperCase();

  }


  // ==========================================
  // GO TO EMPLOYEE FORM
  // ==========================================

  goToEmployeeForm(): void {

    this.router.navigate([
      '/employee-form'
    ]);

  }

}