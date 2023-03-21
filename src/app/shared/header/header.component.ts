import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public user: User = {
    name: 'user',
    email: 'user@gmail.com',
    imageUrl: ''
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }

  search(search: string): void {
    if (search.length > 0) {
      this.router.navigateByUrl(`/dashboard/search/${search}`);
    }
  }

}
