import { User } from "../models/user.model";

export interface ListUser{
    total: number;
    users: User[];
}