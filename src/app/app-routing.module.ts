import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SideBarComponent } from './side-bar/side-bar.component';

const routes: Routes = [
  // { path: '', pathMatch: 'full', component: LoginComponent },
  // { path: 'register', pathMatch: 'full', component: RegisterComponent },
  // {
  //   path: '',
  //   // canActivate  : [AuthGuardUtil],
  //   component: SideBarComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
