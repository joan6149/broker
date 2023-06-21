import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Role, UserDto } from 'src/app/models/user.dto';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class BrokerGuard implements CanActivate, CanMatch, CanLoad {
  constructor(private userService: UserService,
              private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    const token: string | null = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token') || '').token : null;

    if(token === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    console.log('Rutas_broker_acti', route);
    console.log('Segmentos_broker_activate', state);
    console.log('currentUser', this.userService.currentUser);
    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.BROKER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkToken(token, Role.BROKER);
    
  }
  canMatch(route: Route,segments: UrlSegment[]): Observable<boolean> {
    const token: string | null = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token') || '').token : null;

    if(token === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    console.log('Rutas', route);
    console.log('Segmentos', segments);

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.BROKER) {
      this.router.navigate(['login']);
      return of(false);
    }

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.BROKER) {
      this.router.navigate(['login']);
      return of(false);
    }

    return this.userService.checkToken(token, Role.BROKER);
  }

  canLoad(route: Route, segments:UrlSegment[]): Observable<boolean> {
    const token: string | null = localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token') || '').token : null;

    if(token === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    console.log('RutasCanLoadBroker', route);
    console.log('SegmentosCanLoadBroker', segments);

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.BROKER) {
      //this.router.navigate(['/login']);
      return of(false);
    }

    return this.userService.checkToken(token, Role.BROKER);
  }
}
