import { Component, OnInit, OnDestroy } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public since: number = 0;
  public loading: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchsService,
    private modalImageService: ModalImageService
  ) { }

  ngOnInit(): void {
    this.listUsers();
    this.imgSubs = this.modalImageService.newImageChanged.pipe(
      delay(500)
    )
      .subscribe(() => this.listUsers());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  listUsers() {
    this.userService.listUsers(this.since)
      .subscribe(({ total, users }) => {
        this.totalUsers = total;
        this.users = users;
        this.loading = false;
      });
  }

  changePage(value: number): void {
    this.since += value;

    if (this.since < 0) {
      this.since = 0;
    } else if (this.since >= this.totalUsers) {
      this.since -= value;
    }
    this.listUsers();
  }

  search(search: string) {

    if (search.length > 0) {
      this.searchService.search('users', search)
        .subscribe(response => {
          this.users = response;
        });
    }
  }

  deleteUser(user: User): void {

    if (user.uid === this.userService.user.uid) {
      Swal.fire('Error', 'You cannot delete yourself', 'error');
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.userService.deleteUser(user)
          .subscribe(response => {
            Swal.fire(
              'Deleted!',
              `The user ${user.name} has been deleted.`,
              'success'
            );
            this.listUsers();
          });
      }
    })
  }

  changeRole(user: User) {
    this.userService.updateRole(user)
      .subscribe();
  }

  openModal(user: User) {
    this.modalImageService.openModal('users', user.uid!, user.img);
  }

}
