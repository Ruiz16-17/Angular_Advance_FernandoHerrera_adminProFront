import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;
  loginInfo: LoginForm = {
    email: '',
    password: '',
    rememberMe: false
  };

  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ngZone: NgZone
  ) {

    this.loginForm = this.formBuilder.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });

  }
  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {

    google.accounts.id.initialize({
      client_id: "698021552801-l7a0fcups0i9ii9uuprjnvd72q2md7cb.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });

    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    this.userService.loginGoogle(response.credential)
      .subscribe(response => this.ngZone.run(() => this.router.navigateByUrl('/')));
  }

  ngOnInit(): void {
  }

  login() {

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value)
      .subscribe(response => {
        console.log(response);
        if (this.loginForm.get('rememberMe')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/');
      }, error => {
        Swal.fire('Error', error.error.msg, 'error');
      });

  }

}
