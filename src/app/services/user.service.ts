import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserDto, UserToken } from '../models/user.dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlSlice: string = 'user';

  constructor(private httpClient: HttpClient) {}

  /*login():Observable<UserToken> {
    //return this.httpClient<UserToken>.post();
  } */

  registerUser(user: UserDto): Observable<UserDto> {
    console.log(user);
    return this.httpClient.post<UserDto>(`${environment.backend}/${this.urlSlice}/register`, user);
  }
}
