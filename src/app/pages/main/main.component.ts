import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, tap } from 'rxjs';
import { TimeclockService } from 'src/app/services/timeclock.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  showForm$: Observable<Boolean> = new Observable<Boolean>();
  subscriptions: Subscription[] = [];
  isVisible: Boolean = false;


  constructor(private timeClockService: TimeclockService) { }


  ngOnInit(): void {
    this.showForm$ = this.timeClockService.getShowForm();
    this.subscriptions.push(this.showForm$.subscribe((res: Boolean) => {
      this.isVisible = res;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  showForm() {
    this.isVisible = !this.isVisible;
    this.timeClockService.setShowForm(this.isVisible);
  }

}
