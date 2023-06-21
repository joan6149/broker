import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of, tap, map } from 'rxjs';
import { Role, UserDto } from 'src/app/models/user.dto';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate, CanMatch, CanLoad, CanActivateChild {
  constructor(private userService: UserService,
              private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    const token: string | null = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token') || '').token : null;

    if(token === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    console.log('Activate', token);

    console.log('RutasACTI_user', route);
    console.log('Segmentos_acti_user', state.url);

    console.log('currentUser', this.userService.currentUser);

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.USER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkToken(token, Role.USER);
    
  }
  canMatch(route: Route,segments: UrlSegment[]): Observable<boolean> {
    const token: string | null = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token') || '').token : null;

    if(token === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    console.log('Rutas', route);
    console.log('Segmentos', segments);

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.USER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkToken(token, Role.USER);
    
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    const token: string | null = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token') || '').token : null;

    if(token === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    console.log('RutasCLOAD', route);
    console.log('SegmentosCLOAD', segments);

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.USER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkToken(token, Role.USER);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const token: string | null = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token') || '').token : null;

    if(token === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.USER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkToken(token, Role.USER);
  }
}
