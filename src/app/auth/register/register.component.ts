import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordConfirm: ['', [Validators.required]],
    acceptTerms: [false, [Validators.required]]
  }, {
    validators: this.samePasswords('password', 'passwordConfirm')
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
    ) { }
  
  ngOnInit(): void {
  }
  
  createUser(){

    this.formSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    } 
    this.userService.createUser(this.registerForm.value)
    .subscribe(response => {
      this.router.navigateByUrl('/')
    }, (error) => {
      Swal.fire('Error', error.error.msg, 'error');
    });

  }

  invalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmitted) {
      return true;
    }
    return false;
  }

  acceptTermsConditions(){
    return !this.registerForm.get('acceptTerms')?.value && this.formSubmitted;
  }

  invalidPasswords(){
    const password = this.registerForm.get('password')?.value;
    const passwordConfirm = this.registerForm.get('passwordConfirm')?.value;

    if(password !== passwordConfirm && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  samePasswords(password: string, passwordConfirm: string){
    return (formGroup: FormGroup) => {
      const password1Control = formGroup.get(password);
      const password2Control = formGroup.get(passwordConfirm);

      if (password1Control?.value === password2Control?.value) {
        password2Control?.setErrors(null);
      }else{
        password2Control?.setErrors({isNotSame: true});
      }

    }
  }

}
