import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncomeExpenses } from 'src/app/models/income-expenses.model';
import Swal from 'sweetalert2';
import { IncomeExpenseService } from '../services/income-expense.service';
import * as actionsUI from 'src/app/shared/redux/ui.actions';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/redux/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.css']
})
export class IncomeExpenseComponent implements OnInit {

  incomeExpenseForm: FormGroup;
  type: string = 'income';
  isLoading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private incomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>
  ) {

    this.incomeExpenseForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe(); //This removes the subscription from the store and prevents a memory leak, beacuse when page is closed, the subscription is still available
  }

  save(): void {
    if (!this.incomeExpenseForm.invalid) {
      this.store.dispatch(actionsUI.isLoading());
      const { description, amount } = this.incomeExpenseForm.value;
      const incomeExpense = new IncomeExpenses(description, amount, this.type);
      this.incomeExpenseService.saveIncomeExpense(incomeExpense)
        .then(() => {
          this.store.dispatch(actionsUI.stopLoading());
          this.incomeExpenseForm.reset();
          Swal.fire('Saved', description, 'success');
        })
        .catch(error => Swal.fire('Error', error.message, 'error'));
    }
  }

}
