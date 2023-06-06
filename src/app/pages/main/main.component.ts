import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, map, tap } from 'rxjs';
import { MailService, MenuItem } from '@domo/domo-commons-lib';
import { TimeclockService } from 'src/app/services/timeclock.service';
import { DialogData } from '@domo/domo-commons-lib';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  menuItems: MenuItem[] = [
    {
      name: 'Register',
      isActive: false
    },
    {
      name: 'Login',
      isActive: false
    }
  ];
  showForm$: Observable<Boolean> = new Observable<Boolean>();
  subscriptions: Subscription[] = [];


  constructor(private mailService: MailService,
              private timeclockService: TimeclockService) { }


  ngOnInit(): void {
    this.showForm$ = this.timeclockService.getShowForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  showForm(isShow: boolean) {
    this.timeclockService.setShowForm(isShow);
  }

  submit(event: any) {
    if(event instanceof Error) {
      this.timeclockService.setShowDialog({
        msg: event.message,
        correct: false,
        show: true
      } as DialogData)
    }
  }

}
