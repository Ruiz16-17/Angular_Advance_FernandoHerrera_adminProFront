import { SharedModule } from './../shared/shared.module';
import { DashboardRoutingModule } from './../dashboard/dashboard-routing.module';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics/statistics.component';
import { OrderIncomeExpensePipe } from './pipes/order-income-expense.pipe';
import { DetailComponent } from './detail/detail.component';
import { IncomeExpenseComponent } from 'src/app/incomeExpense/income-expense/income-expense.component';
import { DashboardComponent } from './../dashboard/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from './redux/income-expenses.reducers';



@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpenseComponent,
    DetailComponent,
    OrderIncomeExpensePipe,
    StatisticsComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer),
    ReactiveFormsModule,
    NgChartsModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class IncomeExpenseModule { }
