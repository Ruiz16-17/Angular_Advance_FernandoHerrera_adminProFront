import { createAction, props } from '@ngrx/store';
import { IncomeExpenses } from '../../models/income-expenses.model';

export const setItems = createAction(
    '[ICOME_EXPENSE] setItems',
    props<{items: IncomeExpenses[]}>()
);

export const unsetItems = createAction('[ICOME_EXPENSE] unsetItems');
