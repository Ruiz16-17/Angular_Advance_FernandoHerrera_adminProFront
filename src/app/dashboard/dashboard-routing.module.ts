import { AuthGuard } from './../auth/guard/auth.guard';
import { dashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [] = [
  {
    path: '', 
    component: DashboardComponent, 
    children: dashboardRoutes,
    //canActivate: [ AuthGuard ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
