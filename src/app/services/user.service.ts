import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { LoginForm } from '../interfaces/login-form.interface';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ListUser } from '../interfaces/list-user.interface';

const urlBase = environment.baseUrl;

declare const google: any;
//declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public auth2: any;
  public user: User = {
    name: 'user',
    email: 'user@gmail.com',
    imageUrl: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {
    //this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE' | undefined {
    return this.user.role;
  }

  createUser(formData: RegisterForm): Observable<any> {
    return this.http.post(`${urlBase}/users`, formData)
      .pipe(
        tap((response: any) => {
          this.saveLocalStorage(response.token, response.menu);
        }));
  }

  login(formData: LoginForm): Observable<any> {
    return this.http.post(`${urlBase}/login`, formData).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response.token, response.menu);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${urlBase}/login/google`, { token }).pipe(
      tap((response: any) => {
        this.saveLocalStorage(response.token, response.menu);
      })
    );
  }

  validateJWT(): Observable<boolean> {

    google.accounts.id.initialize({
      client_id: '698021552801-l7a0fcups0i9ii9uuprjnvd72q2md7cb.apps.googleusercontent.com'
    });

    return this.http.get(`${urlBase}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((response: any) => {

        const { name, email, img = '', role, google, uid } = response.user;
        this.user = new User(name, email, '', img, role, google, uid);

        this.saveLocalStorage(response.token, response.menu);
        return true;
      }),
      catchError((error: any) => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    // this.auth2.singOut().then( () => {
    //   this.router.navigateByUrl('/login');
    // });

    google.accounts.id.revoke('sebasruigalle62@gmail.com', () => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    });
  }

  // googleInit() {

  //   gapi.load('auth2', () => {
  //     this.auth2 = gapi.auth2.init({
  //     client_id: "698021552801-l7a0fcups0i9ii9uuprjnvd72q2md7cb.apps.googleusercontent.com",
  //     cookiepolicy: 'single_host_origin'
  //     });
  //   });
  // }

  updateProfile(data: { email: string, name: string, role: string }) {
    data = {
      ...data,
      role: this.user.role!
    };

    return this.http.put(`${urlBase}/users/${this.uid}`, data, this.headers);
  }

  listUsers(since: number = 0): Observable<any> {
    const url = `${urlBase}/users?since=${since}`;
    return this.http.get<ListUser>(url, this.headers).pipe(
      map(response => {
        const users = response.users.map(user => new User(
          user.name,
          user.email,
          user.password,
          user.img,
          user.role,
          user.google,
          user.uid
        ));

        return { total: response.total, users: users };
      })
    );
  }

  deleteUser(user: User) {
    const url = `${urlBase}/users/${user.uid}`;
    return this.http.delete(url, this.headers);
  }

  updateRole(user: User) {
    return this.http.put(`${urlBase}/users/role/${user.uid}`, user, this.headers);
  }

  saveLocalStorage(token: string, menu: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('menu',JSON.stringify(menu));
  }

}
