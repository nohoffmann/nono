import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public pageTitle = "";
  public currentRoute = ""

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
    
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        this.currentRoute = router.url
        let child = this.activatedRoute.firstChild;
          while (child) {
              if (child.firstChild) {
                  child = child.firstChild;
              } else if (child.snapshot.data &&    child.snapshot.data['title']) {
                  return child.snapshot.data['title'];
              } else {
                  return null;
              }
          }
          return null;
      })
  ).subscribe( (title: string) => {
      if (title) {
        this.pageTitle = title;
      }
  });
  }
}
