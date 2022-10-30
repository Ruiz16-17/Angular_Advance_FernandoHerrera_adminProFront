import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IncomeExpenses } from 'src/app/models/income-expenses.model';

@Injectable({
  providedIn: 'root'
})
export class IncomeExpenseService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  saveIncomeExpense(incomeExpense: IncomeExpenses) {

    delete incomeExpense.uid;

    return this.firestore.collection<IncomeExpenses>('income-expenses')
      .doc('items')
      .collection(`${this.authService.user.uid}`)
      .add({ ...incomeExpense });
  }

  initIncomeExpense(uid: string){
    return this.firestore.collection<IncomeExpenses>(`income-expenses/items/${uid}`).valueChanges({ idField: 'uid' });
  }

  deleteIncomeExpense(uid: string){
    return this.firestore.doc(`income-expenses/items/${this.authService.user.uid}/${uid}`).delete();
  }

}
