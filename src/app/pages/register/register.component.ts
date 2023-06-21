import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { UserDto } from 'src/app/models/user.dto';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }

  sumbit(user: any) {
    this.subscriptions.push(this.userService.registerUser(user).pipe(
      catchError((err: HttpErrorResponse) => {
        this.msg.isCorrect = false;
        this.msg.message = err.error.message;
        this.msg.check = true;
        return of(null)
      })
    ).subscribe((registeredUser: UserDto | null) => {
      if(registeredUser != null) {
        this.msg = {
          isCorrect: true,
          message: `Usuario ${registeredUser?.email} creado!\nSe enviará un mail de confirmación al correo electronico proporcionado.`,
          check: true
        }
      }
    }));
  }

  okey() {
    this.msg.check = false;
    if(this.msg.isCorrect === true) {
      this.router.navigate(['/']);
    }
  }

}
