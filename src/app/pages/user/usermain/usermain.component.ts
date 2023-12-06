import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '@domo/domo-commons-lib';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as UserActions from '../../../appStore/Actions/Auth.actions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usermain',
  templateUrl: './usermain.component.html',
  styleUrls: ['./usermain.component.scss']
})
export class UsermainComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      name: 'Principal',
      isActive: true,
      routerLink: '/user/mainPanel'
    },
    {
      name: 'Mis solicitudes',
      isActive: false,
      routerLink: '/user/myrequests'
    },
    {
      name: 'Mis Documentos',
      isActive: false,
      routerLink: '/user/mydocuments'
    },
    {
      name: 'Nueva Solicitud',
      isActive: false,
      routerLink: '/user/newrequest'
    },
    {
      name: 'Mi Perfil',
      isActive: false,
      routerLink: '/user/myprofile'
    },
    {
      name: 'Cerrar sessión',
      isActive: false,
      routerLink: 'login'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  goToRoute(item: MenuItem) {
    if(item.routerLink === 'login') {
      this.store.dispatch(UserActions.LOGOUT())
      this.router.navigate([item.routerLink]);
    } else {
      this.router.navigate([item.routerLink], {relativeTo: this.route})
    }
    
  }

}
