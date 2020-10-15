import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BranchesComponent } from './components/branches/branches.component';
import { CalendarNotificationComponent } from './components/calendar-notification/calendar-notification.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { OfflineUsersComponent } from './components/offline-users/offline-users.component';
import { OnlineUsersComponent } from './components/online-users/online-users.component';
import { RecordingsComponent } from './components/recordings/recordings.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', component: LoginComponent },
  // { path: 'register', pathMatch: 'full', component: RegisterComponent },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
