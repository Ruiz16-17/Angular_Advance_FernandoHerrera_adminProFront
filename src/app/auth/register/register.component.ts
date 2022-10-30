import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import * as actionsUI from 'src/app/shared/redux/ui.actions';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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
      name: ['', Validators.required],
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

  createUser() {
    if (!this.form.invalid) {
      this.store.dispatch(actionsUI.isLoading());
      // Swal.fire({
      //   title: 'Loading',
      //   didOpen: () => {
      //     Swal.showLoading();        
      //   }
      // });
      const { name, email, password } = this.form.value;
      this.authService.createUser(name, email, password).then(credentials => {
        this.store.dispatch(actionsUI.isLoading());
        Swal.close();
        this.router.navigate(['/']);
      }).catch(err => {

        this.store.dispatch(actionsUI.isLoading());

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        })
      });
    }
  }

}
