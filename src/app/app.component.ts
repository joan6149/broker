import { Component } from '@angular/core';
import { TimeclockService } from './services/timeclock.service';
import { Observable } from 'rxjs';
import { DialogData } from '@domo/domo-commons-lib';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = environment.appName;
  showDialog$: Observable<DialogData> = new Observable<DialogData>();

  constructor(private timeClockService: TimeclockService) {
    this.showDialog$ = this.timeClockService.getShowDialog();
  }

  closeDialog() {
    this.timeClockService.setShowDialog({
      show: false
    })
  }
}
