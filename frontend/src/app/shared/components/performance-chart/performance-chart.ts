import { Component, Input, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  template: '<canvas #chartCanvas></canvas>',
  styles: ['canvas { max-height: 300px; width: 100% !important; }']
})
export class PerformanceChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() data: any[] = [];
  @Input() type: 'line' | 'bar' | 'pie' = 'line';
  
  chart: any;

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: this.type,
      data: {
        labels: this.data.map(d => d.label),
        datasets: [{
          label: 'Performance Score',
          data: this.data.map(d => d.value),
          borderColor: '#6366f1',
          backgroundColor: this.type === 'pie' ? ['#6366f1', '#10b981', '#f59e0b', '#ef4444'] : 'rgba(99, 102, 241, 0.2)',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: this.type === 'pie', labels: { color: '#94a3b8' } }
        },
        scales: this.type !== 'pie' ? {
          y: { 
            beginAtZero: true, 
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#94a3b8' }
          },
          x: { 
            grid: { display: false },
            ticks: { color: '#94a3b8' }
          }
        } : {}
      }
    });
  }
}
