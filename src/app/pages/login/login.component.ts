import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DialogData } from '@domo/domo-commons-lib';
import { Subscription, catchError, of } from 'rxjs';
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


  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }

  submit(event: LoginDto) {
    this.subscriptions.push(
      this.userService.login(event).pipe(
        catchError((err: HttpErrorResponse) => {
          this.msg = {
            correct: false,
            msg: err.error.message,
            show: true
          }
          return of(null);
        })
      ).subscribe((token: UserToken | null) => {
        localStorage.setItem('token', JSON.stringify(token));
        /** Aqui deberiamos navegar a la pagina principal de user */
        token?.role === 'User' ? this.router.navigate(['/user']) : this.router.navigate(['/user-broker'])
      })
    )
  }

  okey() {
    this.msg.show = false;
  }

}
