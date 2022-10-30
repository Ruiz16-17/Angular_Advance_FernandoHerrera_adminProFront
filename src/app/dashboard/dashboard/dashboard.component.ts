import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, merge, mergeAll, mergeMap, Subscription, switchMap } from 'rxjs';
import * as actionsIncomeExpense from 'src/app/incomeExpense/redux/income-expenses.actions';
import { IncomeExpenseService } from 'src/app/incomeExpense/services/income-expense.service';
import { AppState } from 'src/app/redux/app.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  userStoreSubscription: Subscription = new Subscription();
  incomeExpenseSubscription: Subscription = new Subscription();

  constructor (
    private store: Store<AppState>,
    private incomeExpenseService: IncomeExpenseService
  ) { }

  ngOnInit(): void {
    this.userStoreSubscription = this.store.select('auth').pipe(
      filter(auth => auth.user != null)
    ).subscribe( auth => {
      this.incomeExpenseSubscription = this.incomeExpenseService.initIncomeExpense(auth.user?.uid!)
      .subscribe((items) => {
        this.store.dispatch(actionsIncomeExpense.setItems({items: items}))
      });
    });
  }

  ngOnDestroy(): void {
    this.incomeExpenseSubscription.unsubscribe(); //we unsubscribe all the subscriptions beacuse it is sockets
    this.userStoreSubscription.unsubscribe();
  }

}
