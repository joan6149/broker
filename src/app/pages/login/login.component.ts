import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogData } from '@domo/domo-commons-lib';
import { Store } from '@ngrx/store';
import { Subscription, catchError, of } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as Action from 'src/app/appStore/Actions';
import { LoginDto, UserToken } from 'src/app/models/user.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  msg: DialogData = {
    correct: false,
    msg: '',
    show: false
  }

  subscriptions: Subscription[] = [];


  constructor(private store: Store<AppState> , private router: Router) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  submit(event: LoginDto) {
    this.store.dispatch(Action.LOGIN({login: event}));
  }

  okey() {
    this.msg.show = false;
  }

}
