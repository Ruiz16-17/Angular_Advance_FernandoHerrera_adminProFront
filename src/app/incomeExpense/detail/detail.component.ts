import { AppStateWithIcomeExpenses } from './../redux/income-expenses.reducers';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { IncomeExpenseService } from '../services/income-expense.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy{

  incomeExpenses: any[] = []; 
  incomeExpensesStoreSubscription$: Subscription = new Subscription();

  constructor(
    private store: Store<AppStateWithIcomeExpenses>,
    private incomeExpensesService: IncomeExpenseService
  ) { }

  ngOnInit(): void {
    this.incomeExpensesStoreSubscription$ = this.store.select('incomeExpense').subscribe( ({items}) => this.incomeExpenses = [...items]);
  }

  ngOnDestroy(): void {
    this.incomeExpensesStoreSubscription$.unsubscribe();
  }

  delete(uid: string){
    this.incomeExpensesService.deleteIncomeExpense(uid)
      .then( () => Swal.fire('Deleted', 'The item has been deleted', 'success') )
      .catch( error => Swal.fire('Deleted', error.message, 'success') )
  }

}
