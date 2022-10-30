import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AppState } from 'src/app/redux/app.reducer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy{

  name: string = '';
  userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('auth').pipe(
      filter(user => user != null)
    )
    .subscribe((auth) => this.name = auth.user?.name!);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout(){
    this.authService.logout().then(() => {
      this.router.navigate(['/login']);
    }).catch(err => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message
    }));
  }

}
