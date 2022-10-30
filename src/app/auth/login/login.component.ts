import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/redux/app.reducer';
import * as actionsUI from 'src/app/shared/redux/ui.actions';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  isLoading: boolean = false;
  uiSubscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {

    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe(); //This removes the subscription from the store and prevents a memory leak, beacuse when page is closed, the subscription is still available
  }

  login(): void {

    if (!this.form.invalid) {

      this.store.dispatch(actionsUI.isLoading());

      // Swal.fire({
      //   title: 'Loading',
      //   didOpen: () => {
      //     Swal.showLoading();        
      //   }
      // });

      const { email, password } = this.form.value;
      this.authService.login(email, password).then(credentials => {
        // Swal.close();
        this.router.navigate(['/']);
        this.store.dispatch(actionsUI.stopLoading());
      }).catch(err => {
        this.store.dispatch(actionsUI.stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
    }

  }

}
