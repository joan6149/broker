import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/models/user.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  sumbit(user: any) {
    this.userService.registerUser(user).subscribe((registeredUser: UserDto) => {
      console.log(registeredUser);
    })
  }

}
