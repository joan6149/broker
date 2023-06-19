import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Message } from 'src/app/models/message.model';
import { UserDto } from 'src/app/models/user.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  msg: Message = {
    check: false,
    isCorrect: false,
    message: ''
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  sumbit(user: any) {
    this.userService.registerUser(user).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err.error.message);
        this.msg.isCorrect = false;
        this.msg.message = err.error.message;
        this.msg.check = true;
        return of(null)
      })
    ).subscribe((registeredUser: UserDto | null) => {
      if(registeredUser != null) {
        this.msg = {
          isCorrect: true,
          message: `Usuario ${registeredUser?.email} creado!`,
          check: true
        }
      }
    })
  }

}
