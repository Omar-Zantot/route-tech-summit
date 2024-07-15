import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-trans-chart',
  standalone: true,
  imports: [],
  templateUrl: './trans-chart.component.html',
  styleUrl: './trans-chart.component.scss',
})
export class TransChartComponent
  implements AfterViewInit, OnChanges, OnDestroy, OnInit
{
  @Input() customerTransaction!: { date: string; amount: number }[];

  myChart: Chart<'line', number[], string> | null = null;

  chartData: { labels: string[]; data: number[] } = { labels: [], data: [] };

  ngOnInit(): void {
    if (!this.customerTransaction || this.customerTransaction.length === 0) {
      console.error('customerTransaction is undefined or empty');
      return;
    }
  }

  ngAfterViewInit(): void {
    if (this.customerTransaction.length > 0) {
      this.renderChart();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.myChart) {
      this.myChart.destroy();
    }

    if (this.customerTransaction.length > 0) {
      this.renderChart();
    }
  }
  ngOnDestroy(): void {
    if (this.myChart) {
      this.myChart.destroy();
    }
  }

  renderChart() {
    this.chartData = {
      labels: this.customerTransaction.map((transaction) => transaction.date),
      data: this.customerTransaction.map((transaction) => transaction.amount),
    };
    if (this.myChart) {
      this.myChart.destroy();
    }
    this.myChart = new Chart('Transactions', {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            label: 'Customer Transaction',
            data: this.chartData.data,
            fill: false,
            borderColor: '#0d6efd',
            tension: 0.1,
            pointRadius: 5,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: 'darked',
              font: {
                weight: 'bold',
              },
            },
            onClick: () => {},
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Amount',
            },
            beginAtZero: true,
          },
        },
      },
    });
  }
}
