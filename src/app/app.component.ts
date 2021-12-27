import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { DbService } from './services/db/db.service';
import { defaultPreferences } from './sites/settings/settings.component';
import { Preferences } from './types/Preferences';
import { hexToRgb } from './utils/HexToRgb';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public pageTitle = '';
  public currentRoute = '';
  public preferences: Preferences = defaultPreferences;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dbService: DbService
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        this.currentRoute = router.url;
        let child = this.activatedRoute.firstChild;
          while (child) {
              if (child.firstChild) {
                  child = child.firstChild;
              } else if (child.snapshot.data &&    child.snapshot.data.title) {
                  return child.snapshot.data.title;
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

  public async ngOnInit() {
    this.preferences = await this.dbService.getPreferences();

    //@ts-ignore
    document.body.style.setProperty('--ion-color-primary', this.preferences.accentColor);
    document.body.style.setProperty('--ion-color-primary-rgb', hexToRgb(this.preferences.accentColor));
  }

}
