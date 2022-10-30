import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State {
    isLoading: boolean;
};

const initialState: State = {
    isLoading: false
};

export const _uiReducer = createReducer(
    initialState,
    on(isLoading,(state) => ({...state, isLoading: true})),
    on(stopLoading,(state) => ({...state, isLoading: false}))
);

export function uiReducer(state: State = initialState, action: Action){
    return _uiReducer(state, action);
}