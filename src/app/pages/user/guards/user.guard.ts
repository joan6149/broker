import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, tap, map } from 'rxjs';
import { Role, UserDto } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanMatch, CanLoad, CanActivateChild {
  constructor(private userService: AuthService,
              private cookieService: CookieService,
              private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {    
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;
    if(userId === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.USER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkRole(userId, Role.USER);
    
  }
  canMatch(route: Route,segments: UrlSegment[]): Observable<boolean> {
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;

    if(userId === null) {
      this.router.navigate(['login']);
      return of(false);
    }


    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.USER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkRole(userId, Role.USER);
    
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;

    if(userId === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.USER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkRole(userId, Role.USER);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;

    if(userId === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.USER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkRole(userId, Role.USER);
  }
}
