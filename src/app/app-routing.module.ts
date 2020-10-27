import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchesComponent } from './components/branches/branches.component';
import { CalendarNotificationComponent } from './components/calendar-notification/calendar-notification.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { LoginComponent } from './components/login/login.component';
import { OfflineUsersComponent } from './components/offline-users/offline-users.component';
import { OnlineUsersComponent } from './components/online-users/online-users.component';
import { RecordingsComponent } from './components/recordings/recordings.component';
import { HomeComponent } from './home.component';
import { AuthAdminGuard } from './services/auth-admin.guard';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  { path: '', redirectTo: '/branches', pathMatch: 'full' },
  // { path: 'register', pathMatch: 'full', component: RegisterComponent },
  {
    path: '',                       // {1}
    component: SideBarComponent,
    canActivate: [AuthAdminGuard],       // {2}
    children: [
      // {
      //   path: '',
      //   component: HomeComponent   // {3}
      // },
      {
        path: 'branches',
        // canActivate  : [AuthGuardUtil],
        component: BranchesComponent,
      },
      {
        path: 'online',
        component: OnlineUsersComponent,
      },
      {
        path: 'offline',
        component: OfflineUsersComponent,
      },
      {
        path: 'recordings',
        component: RecordingsComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      {
        path: 'notifications',
        component: CalendarNotificationComponent,
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent   // {5}
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
