import { Component } from '@angular/core';
import { TimeclockService } from './services/timeclock.service';
import { Observable } from 'rxjs';
import { DialogData } from '@domo/domo-commons-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AvanteHipoteca';
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
