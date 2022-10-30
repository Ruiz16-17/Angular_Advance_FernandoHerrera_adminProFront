import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { setUSer, unSetUser } from './auth.actions';

export interface State {
    user: User | null;
};

const initialState: State = {
    user: null,
};

export const _authReducer = createReducer(
    initialState,
    on(setUSer, (state, { user } ) => ({...state, user: { ...user} })),
    on(unSetUser, (state) => ({...state, user: null }))
);

export function authReducer(state: State = initialState, action: Action){
    return _authReducer(state, action);
}