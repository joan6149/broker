import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, catchError, map, of } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Message } from 'src/app/models/message.model';
import { UserDto } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';
import * as UserActions from '../../appStore/Actions/Auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  msg: Message = {
    check: false,
    isCorrect: false,
    message: ''
  };

  subscriptions:Subscription[] = [];

  constructor(private store: Store<AppState>,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  sumbit(user: any) {
    this.store.dispatch(UserActions.REGISTER({user}));
  }

  okey() {
    this.msg.check = false;
    if(this.msg.isCorrect === true) {
      this.router.navigate(['/']);
    }
  }

}
