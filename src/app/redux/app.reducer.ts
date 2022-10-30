import { ActionReducerMap } from '@ngrx/store';
import * as uiReducer from '../shared/redux/ui.reducer';
import * as authReducer from '../auth/redux/auth.reducer'
import * as incomeExpenseReducer from '../incomeExpense/redux/income-expenses.reducers'

export interface AppState {
    ui:  uiReducer.State,
    auth: authReducer.State
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: uiReducer.uiReducer,
    auth: authReducer.authReducer
}