import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { TimeclockService } from 'src/app/services/timeclock.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showForm$: Observable<Boolean> = new Observable<Boolean>();
  isVisible: Boolean = false;


  constructor(private timeClockService: TimeclockService) { }

  ngOnInit(): void {
    this.showForm$ = this.timeClockService.getShowForm();
  }


  showForm() {
    this.isVisible = !this.isVisible;
    this.timeClockService.setShowForm(this.isVisible);
  }

}
