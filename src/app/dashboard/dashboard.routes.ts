import { Routes } from "@angular/router";
import { StatisticsComponent } from '../incomeExpense/statistics/statistics.component';
import { DetailComponent } from '../incomeExpense/detail/detail.component';
import { IncomeExpenseComponent } from "src/app/incomeExpense/income-expense/income-expense.component";

export const dashboardRoutes: Routes = [
    {path: '', component: StatisticsComponent},
    {path: 'income-expenses', component: IncomeExpenseComponent},
    {path: 'detail', component: DetailComponent},
]