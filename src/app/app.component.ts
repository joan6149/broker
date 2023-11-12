import { Component, OnInit } from '@angular/core';
import { TimeclockService } from './services/timeclock.service';
import { Observable } from 'rxjs';
import { DialogData } from '@domo/domo-commons-lib';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = environment.appName;
  showDialog$: Observable<DialogData> = new Observable<DialogData>();

  constructor(private timeClockService: TimeclockService, private store:Store<AppState>, private router: Router, private cookieService: CookieService) {
    this.showDialog$ = this.timeClockService.getShowDialog();
  }

  ngOnInit(): void {
    this.store.select('auth').subscribe( (auth) => {
      if(auth.token !== null) {
        this.cookieService.set('token', JSON.stringify(auth.token));
        auth.token?.role === 'User' ? this.router.navigate(['/user']) : this.router.navigate(['/user-broker'])
      }
    });
  }

  closeDialog() {
    this.timeClockService.setShowDialog({
      show: false
    })
  }
}
