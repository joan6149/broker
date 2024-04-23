import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Role, UserDto } from 'src/app/models/user.dto';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BrokerGuard  {
  constructor(private userService: AuthService,
              private cookieService: CookieService,
              private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> {
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;

    if(userId === null) {
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

    return this.userService.checkRole(userId, Role.BROKER);
    
  }
  canMatch(route: Route,segments: UrlSegment[]): Observable<boolean> {
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;
    if(userId === null) {
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

    return this.userService.checkRole(userId, Role.BROKER);
  }

  canLoad(route: Route, segments:UrlSegment[]): Observable<boolean> {
    const userId: string | null = this.cookieService.check('token') ? JSON.parse(this.cookieService.get('token')).userId : null;
    if(userId === null) {
      this.router.navigate(['login']);
      return of(false);
    }

    console.log('RutasCanLoadBroker', route);
    console.log('SegmentosCanLoadBroker', segments);

    if(this.userService.currentUser && this.userService.currentUser?.role !== Role.BROKER) {
      //this.router.navigate(['/login']);
      return of(false);
    }

    return this.userService.checkRole(userId, Role.BROKER);
  }
}
