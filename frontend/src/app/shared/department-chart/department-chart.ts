import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import Chart from 'chart.js/auto';

import { Employee } from '../../employee';

@Component({
  selector: 'app-department-chart',
  standalone: true,
  templateUrl: './department-chart.html',
  styleUrl: './department-chart.css'
})
export class DepartmentChartComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  @Input() employees: Employee[] = [];

  @ViewChild('departmentChart')
  departmentChartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  private viewReady = false;

  private renderPending = false;


  // --------------------------------------------------
  // Angular lifecycle
  // --------------------------------------------------

  ngAfterViewInit(): void {

    this.viewReady = true;

    this.scheduleChartRender();

  }


  ngOnChanges(changes: SimpleChanges): void {

    if (changes['employees']) {

      console.log(
        'CHART INPUT CHANGED:',
        this.employees.length
      );

      if (this.viewReady) {

        this.scheduleChartRender();

      }

    }

  }


  ngOnDestroy(): void {

    this.destroyChart();

  }


  // --------------------------------------------------
  // Schedule chart rendering
  // --------------------------------------------------

  private scheduleChartRender(): void {

    if (this.renderPending) {
      return;
    }

    this.renderPending = true;

    setTimeout(() => {

      this.renderPending = false;

      this.renderChart();

    }, 0);

  }


  // --------------------------------------------------
  // Render chart
  // --------------------------------------------------

  private renderChart(): void {

    if (!this.departmentChartCanvas) {
      return;
    }


    console.log(
      'CHART RENDER DATA:',
      this.employees.length
    );


    /*
     * Map structure:
     *
     * "it" -> {
     *   label: "It",
     *   count: 4
     * }
     *
     * This allows:
     *
     * IT
     * it
     * It
     * iT
     *
     * to be treated as the same department.
     */

    const departmentMap =
      new Map<
        string,
        {
          label: string;
          count: number;
        }
      >();


    // --------------------------------------------------
    // Count employees by department
    // --------------------------------------------------

    for (const employee of this.employees) {

      const rawDepartment =
        employee.department?.trim() || 'Unknown';


      // Normalize for comparison

      const normalized =
        rawDepartment.toLowerCase();


      // Create a clean display name

      const displayName =
        normalized === 'unknown'
          ? 'Unknown'
          : normalized.charAt(0).toUpperCase() +
            normalized.slice(1);


      // First occurrence

      if (!departmentMap.has(normalized)) {

        departmentMap.set(
          normalized,
          {
            label: displayName,
            count: 0
          }
        );

      }


      // Increase employee count

      departmentMap.get(normalized)!.count++;

    }


    // --------------------------------------------------
    // Prepare chart data
    // --------------------------------------------------

    const labels =
      Array.from(
        departmentMap.values()
      ).map(
        item => item.label
      );


    const values =
      Array.from(
        departmentMap.values()
      ).map(
        item => item.count
      );


    console.log(
      'Department chart data:',
      labels,
      values
    );


    // --------------------------------------------------
    // Destroy previous chart
    // --------------------------------------------------

    this.destroyChart();


    // --------------------------------------------------
    // Create new chart
    // --------------------------------------------------

    this.chart = new Chart(
      this.departmentChartCanvas.nativeElement,
      {

        type: 'bar',


        data: {

          labels,


          datasets: [

            {

              label: 'Employees',

              data: values,


              // Bar color

              backgroundColor: '#6366f1',


              // Color when hovering

              hoverBackgroundColor: '#4f46e5',


              // Rounded corners

              borderRadius: 8,


              borderWidth: 0,


              /*
               * Controls individual bar width.
               *
               * Smaller value = thinner bars
               * Larger value = wider bars
               */

              barPercentage: 0.55,


              /*
               * Controls space between categories.
               */

              categoryPercentage: 0.7

            }

          ]

        },


        options: {

          responsive: true,


          maintainAspectRatio: false,


          plugins: {

            // Hide legend because only one dataset exists

            legend: {
              display: false
            }

          },


          scales: {

            // ------------------------------------------
            // X AXIS
            // ------------------------------------------

            x: {

              grid: {
                display: false
              },


              ticks: {

                color: '#6b7280',

                font: {
                  size: 12
                }

              },


              title: {

                display: true,

                text: 'Department'

              }

            },


            // ------------------------------------------
            // Y AXIS
            // ------------------------------------------

            y: {

              beginAtZero: true,


              ticks: {

                stepSize: 1,

                color: '#6b7280'

              },


              grid: {

                color: '#e5e7eb'

              },


              title: {

                display: true,

                text: 'Employees'

              }

            }

          }

        }

      }
    );


    console.log(
      'Department chart rendered:',
      labels,
      values
    );

  }


  // --------------------------------------------------
  // Destroy chart
  // --------------------------------------------------

  private destroyChart(): void {

    if (this.chart) {

      this.chart.destroy();

      this.chart = null;

    }

  }

}