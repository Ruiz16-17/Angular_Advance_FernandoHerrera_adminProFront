import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

export const setUSer = createAction(
    '[Auth] setUSer',
    props<{ user: User}>()
);

export const unSetUser = createAction('[Auth] unSetUser');