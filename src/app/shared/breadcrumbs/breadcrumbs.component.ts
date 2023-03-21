import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy{

  public title: string = '';
  public titleSubscription$: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.titleSubscription$ = this.getRouteArgs()
      .subscribe((event: any) => {
        this.title = event.title;
        document.title = `AdminPro - ${this.title}`;
      });
  }
  ngOnDestroy(): void {
    this.titleSubscription$.unsubscribe();
  }

  getRouteArgs() {
    return this.router.events.pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    )
  }

}
