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

@Component({
  selector: 'app-chart',
  standalone: true,
  templateUrl: './chart.html',
  styleUrl: './chart.css'
})
export class ChartComponent
  implements AfterViewInit, OnChanges, OnDestroy {

  @Input() labels: string[] = [];

  @Input() values: number[] = [];

  @Input() title = '';

  @Input()
  chartType:
    | 'bar'
    | 'line'
    | 'pie'
    | 'doughnut' = 'bar';

  @ViewChild('chartCanvas')
  chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  private viewReady = false;


  ngAfterViewInit(): void {

    this.viewReady = true;

    this.renderChart();

  }


  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['labels'] ||
      changes['values'] ||
      changes['chartType']
    ) {

      if (this.viewReady) {

        setTimeout(() => {

          this.renderChart();

        });

      }

    }

  }


  ngOnDestroy(): void {

    this.destroyChart();

  }


  private renderChart(): void {

    if (!this.chartCanvas) {
      return;
    }


    this.destroyChart();


    this.chart = new Chart(
      this.chartCanvas.nativeElement,
      {

        type: this.chartType,

        data: {

          labels: this.labels,

          datasets: [

            {

              label: this.title,

              data: this.values,

              backgroundColor: [
                '#6366f1',
                '#22c55e',
                '#f59e0b',
                '#ef4444',
                '#06b6d4',
                '#8b5cf6',
                '#ec4899',
                '#14b8a6'
              ],

              borderColor: '#ffffff',

              borderWidth: 2,

              borderRadius:
                this.chartType === 'bar'
                  ? 8
                  : 0,

              barPercentage: 0.55,

              categoryPercentage: 0.7

            }

          ]

        },


        options: {

          responsive: true,

          maintainAspectRatio: false,

          plugins: {

            legend: {

              display: true,

              position: 'bottom'

            }

          },


          scales:

            this.chartType === 'pie' ||
            this.chartType === 'doughnut'

              ? {}

              : {

                  x: {

                    grid: {
                      display: false
                    }

                  },

                  y: {

                    beginAtZero: true,

                    ticks: {
                      stepSize: 1
                    }

                  }

                }

        }

      }

    );

  }


  private destroyChart(): void {

    if (this.chart) {

      this.chart.destroy();

      this.chart = null;

    }

  }

}