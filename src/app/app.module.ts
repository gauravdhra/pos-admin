import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BranchesComponent } from './components/branches/branches.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ChartModule } from 'primeng/chart';
import { PanelModule } from 'primeng/panel';
import { ReactiveFormsModule } from '@angular/forms';





import { ChartComponent } from './components/charts/chart.component';
import { RecordingsComponent } from './components/recordings/recordings.component';
import { OnlineUsersComponent } from './components/online-users/online-users.component';
import { OfflineUsersComponent } from './components/offline-users/offline-users.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarNotificationComponent } from './components/calendar-notification/calendar-notification.component';
import { DatePipe ,SlicePipe } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home.component';
import { RegisterComponent } from './components/register/register.component';
import { PaginatorModule } from 'primeng/paginator';


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    BranchesComponent,
    ChartComponent,
    RecordingsComponent,
    OnlineUsersComponent,
    OfflineUsersComponent,
    EmployeesComponent,
    CalendarNotificationComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    PanelModule,
    ChartModule,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ReactiveFormsModule,
    ContextMenuModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    DropdownModule,
    CheckboxModule,
    PaginatorModule
  ],
  providers: [DatePipe, SlicePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
