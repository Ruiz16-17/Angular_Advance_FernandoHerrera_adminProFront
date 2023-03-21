import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProgressComponent } from '../progress/progress.component';
import { Graph1Component } from '../graph1/graph1.component';
import { AccountSettingsComponent } from '../account-settings/account-settings.component';
import { PromisesComponent } from '../promises/promises.component';
import { RxjsComponent } from '../rxjs/rxjs.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchComponent } from '../search/search.component';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { UsersComponent } from '../maintenance/users/users.component';
import { HospitalsComponent } from '../maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from '../maintenance/doctors/doctors.component';
import { DoctorComponent } from '../maintenance/doctors/doctor/doctor.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress'} },
            { path: 'graph1', component: Graph1Component, data: { title: 'Graph1'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'AccountSettings'} },
            { path: 'promises', component: PromisesComponent, data: { title: 'Promises'} },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs'} },
            { path: 'profile', component: ProfileComponent, data: { title: 'User profile'} },
            { path: 'search/:search', component: SearchComponent, data: { title: 'Searchs'} },
            //maintenance
            { 
                path: 'users', 
                canActivate: [AdminGuard],
                component: UsersComponent, 
                data: { title: 'Users maintenance'} 
            },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Hospitals maintenance'} },
            { path: 'doctors', component: DoctorsComponent, data: { title: 'Doctors maintenance'} },
            { path: 'doctor/:id', component: DoctorComponent, data: { title: 'Doctors maintenance'} }
];

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
