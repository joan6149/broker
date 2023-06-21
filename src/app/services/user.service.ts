import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, tap } from 'rxjs';
import { LoginDto, Role, UserDto, UserToken } from '../models/user.dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  urlSlice: string = 'user';
  currentUser?: UserDto;

  constructor(private httpClient: HttpClient) {}

  login(logindto: LoginDto):Observable<UserToken> {
    return this.httpClient.post<UserToken>(`${environment.backend}/${this.urlSlice}/login`, logindto);
  }

  registerUser(user: UserDto): Observable<UserDto> {
    console.log(user);
    return this.httpClient.post<UserDto>(`${environment.backend}/${this.urlSlice}/register`, user);
  }

  checkUserToken(token: string): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${environment.backend}/${this.urlSlice}/checkUserToken`, {token});
  }

  checkToken(token: string, role: Role):Observable<boolean> {
    return this.checkUserToken(token).pipe(
      tap((user: UserDto) => {
        this.currentUser = {...user};
        console.log('CurrentUser en servicio', this.currentUser);
      }),
      map((user: UserDto) => user.role && user.role === role ? true : false)
    )
  }

  logout() {
    localStorage.removeItem('token');
  }


}
