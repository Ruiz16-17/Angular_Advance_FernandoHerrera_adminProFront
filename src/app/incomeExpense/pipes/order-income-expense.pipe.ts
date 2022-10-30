import { IncomeExpenses } from 'src/app/models/income-expenses.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderIncomeExpense'
})
export class OrderIncomeExpensePipe implements PipeTransform {

  transform(items: any[]): any[] {
    return items.sort((a) => a.type === 'income' ? -1 : 1);
  }

}
