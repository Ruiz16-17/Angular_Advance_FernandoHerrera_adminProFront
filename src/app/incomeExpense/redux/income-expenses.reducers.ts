import { AppState } from 'src/app/redux/app.reducer';
import { Action, createReducer, on } from '@ngrx/store';
import { IncomeExpenses } from 'src/app/models/income-expenses.model';
import { setItems, unsetItems } from './income-expenses.actions';

export interface State {
    items: IncomeExpenses[];
}

export interface AppStateWithIcomeExpenses extends AppState {
    incomeExpense: State
}

const initialState: State = {
    items: []
};

export const _incomeExpenseReducer = createReducer(
    initialState,
    on(setItems, (state, {items} ) => ({...state, items: [...items]})),
    on(unsetItems, (state) => ({...state, items: []})),
);

export function incomeExpenseReducer( state: State = initialState, action: Action){
    return _incomeExpenseReducer(state, action);
}