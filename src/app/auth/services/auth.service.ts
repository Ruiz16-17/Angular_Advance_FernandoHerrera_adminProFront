import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/redux/app.reducer';
import * as actionsAuth from '../redux/auth.actions';
import * as actionsIncomeExpense from '../../incomeExpense/redux/income-expenses.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription();
  private _user: User = new User('', '', '');

  
  public get user() : User {
    return {...this._user};
  }
  

  constructor(
    public authFirebase: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  createUser(name: string, email: string, password: string) {
    return this.authFirebase.createUserWithEmailAndPassword(email, password)
      .then(firebaseUser => {

        const newUser = new User(firebaseUser.user?.uid!, name, firebaseUser.user?.email!);

        return this.firestore.collection<User>('users').doc(newUser.uid).set({ ...newUser });
      });
  }

  login(email: string, password: string) {
    return this.authFirebase.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.authFirebase.signOut();
  }

  initAuthListener() {
    this.authFirebase.authState.pipe()
      .subscribe(firebaseUser => {
        if (firebaseUser) {
          this.userSubscription = this.firestore.doc(`users/${firebaseUser?.uid}`).valueChanges()
            .subscribe((firestoreUser: any) => {
              const user = User.fromFirebase(firestoreUser);
              this._user = user;
              this.store.dispatch(actionsAuth.setUSer({ user: user }))
            });
        } else {
          this._user = new User('', '', '');
          this.userSubscription.unsubscribe();
          this.store.dispatch(actionsAuth.unSetUser());
          this.store.dispatch(actionsIncomeExpense.unsetItems());
        }
      });
  }

  isAuth() {
    return this.authFirebase.authState.pipe(
      map(firebaseUser => firebaseUser != null)
    );
  }

}
