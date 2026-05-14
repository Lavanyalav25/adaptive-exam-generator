import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { DashboardComponent as StudentDashboard } from './pages/student/dashboard/dashboard';
import { DashboardComponent as InstructorDashboard } from './pages/instructor/dashboard/dashboard';
import { DashboardComponent as AdminDashboard } from './pages/admin/dashboard/dashboard';
import { TakeQuizComponent } from './pages/quiz/take-quiz/take-quiz';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { 
    path: 'student/dashboard', 
    component: StudentDashboard, 
    canActivate: [authGuard], 
    data: { roles: ['STUDENT'] } 
  },
  { 
    path: 'student/quiz/:id', 
    component: TakeQuizComponent, 
    canActivate: [authGuard], 
    data: { roles: ['STUDENT'] } 
  },
  { 
    path: 'instructor/dashboard', 
    component: InstructorDashboard, 
    canActivate: [authGuard], 
    data: { roles: ['INSTRUCTOR'] } 
  },
  { 
    path: 'admin/dashboard', 
    component: AdminDashboard, 
    canActivate: [authGuard], 
    data: { roles: ['ADMIN'] } 
  },
];
