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
    return this.httpClient.post<UserDto>(`${environment.backend}/${this.urlSlice}/register`, user);
  }

  checkUserToken(token: string): Observable<UserDto> {
    return this.httpClient.post<UserDto>(`${environment.backend}/${this.urlSlice}/checkUserToken`, {token});
  }

  getuserById(userId: string): Observable<UserDto> {
    return this.httpClient.get<UserDto>(`${environment.backend}/${this.urlSlice}/user/${userId}`);
  }

  checkRole(userId: string, role: Role):Observable<boolean> {
    return this.getuserById(userId).pipe(
      tap((user: UserDto) => {
        this.currentUser = {...user};
      }),
      map((user: UserDto) => user.role && user.role === role ? true : false)
    )
  }

  logout() {
    localStorage.removeItem('token');
  }


}
