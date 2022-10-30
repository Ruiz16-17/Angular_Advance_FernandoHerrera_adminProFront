import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap(state => {
          if (!state) {
            this.router.navigate(['/login']);
          }
        })
      );
  }

  canLoad(): Observable<boolean> {
    return this.authService.isAuth()
      .pipe(
        tap(state => {
          if (!state) {
            this.router.navigate(['/login']);
          }
        }),
        take(1) //Because we must cancel the subscription, and every time we want to acces this module, we must to make a new subscription with the verification
      );
  }
  
}
