import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { IncomeExpenses } from 'src/app/models/income-expenses.model';
import { ChartData, ChartType } from 'chart.js';
import { AppStateWithIcomeExpenses } from '../redux/income-expenses.reducers';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  incomes: number = 0;
  expenses: number = 0;

  totalIncomes: number = 0;
  totalExpenses: number = 0;

  //@ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  public doughnutChartLabels: string[] = ['Income', 'Expenses'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [this.totalIncomes, this.totalExpenses] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private store: Store<AppStateWithIcomeExpenses>
  ) { }

  ngOnInit(): void {
    this.store.select('incomeExpense').subscribe(({ items }) => this.generateStatistics(items))
  }

  generateStatistics(items: IncomeExpenses[]): void {

    this.incomes = 0;
    this.expenses = 0;
    this.totalIncomes = 0;
    this.totalExpenses = 0;

    this.totalExpenses += 1000;
    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncomes += item.amount;
        this.incomes++;
      } else {
        this.totalExpenses += item.amount;
        this.expenses++;
      }
    }

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [this.totalIncomes, this.totalExpenses] }
      ]
    };

    //both ways are valid

    // this.doughnutChartData.datasets = [{ data: [this.totalIncomes, this.totalExpenses] }];
    // this.chart?.chart?.update();
  }


}
