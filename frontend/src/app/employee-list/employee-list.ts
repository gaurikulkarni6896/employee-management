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
    console.error('Department chart canvas not found.');
    return;
  }

  const canvas =
    this.departmentChartCanvas.nativeElement;

  const context = canvas.getContext('2d');

  if (!context) {
    console.error('Unable to get chart canvas context.');
    return;
  }

 // ========================================
// COUNT DEPARTMENTS
// ========================================

const departmentCounts: {
  [key: string]: number
} = {};

this.employees.forEach(employee => {

  const department =
    employee.department?.trim().toLowerCase() || 'unknown';

  departmentCounts[department] =
    (departmentCounts[department] || 0) + 1;

});

const departments =
  Object.keys(departmentCounts).map(department =>
    department.charAt(0).toUpperCase() + department.slice(1)
  );

const counts =
  Object.values(departmentCounts);
  
  // ========================================
  // DESTROY OLD CHART
  // ========================================

  if (this.departmentChart) {
    this.departmentChart.destroy();
  }

  // ========================================
  // MODERN COLORS
  // ========================================

  const chartColors = [
    '#6366F1',
    '#06B6D4',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
    '#14B8A6'
  ];

  // ========================================
  // CREATE CHART
  // ========================================

 this.departmentChart = new Chart(context, {
  type: 'bar',

  data: {
    labels: departments,

    datasets: [
      {
        label: 'Employees',
        data: counts,

        backgroundColor: [
          '#4F46E5',
          '#06B6D4',
          '#10B981',
          '#F59E0B',
          '#EF4444',
          '#8B5CF6',
          '#EC4899',
          '#14B8A6'
        ],

        borderWidth: 0,

        borderRadius: 10,

        borderSkipped: false,

    
       barPercentage: 0.90,
categoryPercentage: 0.95,

        maxBarThickness: 50
      }
    ]
  },

  options: {
    responsive: true,
    maintainAspectRatio: false,

    animation: {
      duration: 800
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 1,
          precision: 0,
          padding: 10
        },

        grid: {
          color: '#E5E7EB'
        },

        border: {
          display: false
        },

        title: {
          display: true,
          text: 'Number of Employees',
          font: {
            size: 13
          },
          color: '#64748B'
        }
      },

      x: {
        grid: {
          display: false
        },

        border: {
          display: false
        },

        title: {
          display: true,
          text: 'Department',
          font: {
            size: 13
          },
          color: '#64748B'
        },

        ticks: {
          color: '#475569',

          font: {
            size: 12
          },

          padding: 10
        }
      }
    },

    plugins: {
      legend: {
        display: false
      },

      tooltip: {
        backgroundColor: '#0F172A',
        titleColor: '#FFFFFF',
        bodyColor: '#E2E8F0',

        padding: 12,

        cornerRadius: 8,

        displayColors: true,

        callbacks: {
          label: (context) => {
            const value = context.parsed.y ?? 0;
            return ` Employees: ${value}`;
          }
        }
      }
    }
  }
});

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