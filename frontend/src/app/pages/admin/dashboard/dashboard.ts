import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PerformanceChartComponent } from '../../../shared/components/performance-chart/performance-chart';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatTableModule, 
    MatIconModule,
    PerformanceChartComponent
  ],
  templateUrl: './dashboard.html',
  styles: [`
    .dashboard-container { padding: 2rem; max-width: 1200px; margin: 0 auto; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
    .stat-card { text-align: center; padding: 1.5rem; }
    .stat-value { font-size: 2.5rem; font-weight: 800; margin: 0.5rem 0; }
  `]
})
export class DashboardComponent implements OnInit {
  stats = [
    { label: 'Total Students', value: 1250, icon: 'person', color: '#6366f1' },
    { label: 'Total Instructors', value: 45, icon: 'badge', color: '#10b981' },
    { label: 'Active Courses', value: 320, icon: 'auto_stories', color: '#f59e0b' },
    { label: 'Avg Score', value: '78%', icon: 'insights', color: '#ef4444' }
  ];

  pieData = [
    { label: 'Beginner', value: 40 },
    { label: 'Intermediate', value: 35 },
    { label: 'Advanced', value: 25 }
  ];

  ngOnInit() {}
}
