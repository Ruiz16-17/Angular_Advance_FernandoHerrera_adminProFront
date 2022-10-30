import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'incomeExpensesApp';

  constructor(private authService: AuthService){
    this.authService.initAuthListener();// Every time the application loads, it goes through on this component
  }

}
