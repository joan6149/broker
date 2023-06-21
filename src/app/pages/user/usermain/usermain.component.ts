import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from '@domo/domo-commons-lib';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usermain',
  templateUrl: './usermain.component.html',
  styleUrls: ['./usermain.component.scss']
})
export class UsermainComponent implements OnInit {

  menuItems: MenuItem[] = [
    {
      name: 'Panel Principal',
      isActive: false,
      routerLink: 'mainPanel'
    },
    {
      name: 'Mis solicitudes',
      isActive: false,
      routerLink: 'myrequests'
    },
    {
      name: 'Mis Documentos',
      isActive: false,
      routerLink: 'mydocuments'
    },
    {
      name: 'Nueva Solicitud',
      isActive: false,
      routerLink: 'newrequest'
    },
    {
      name: 'Mi Perfil',
      isActive: false,
      routerLink: 'myprofile'
    },
    {
      name: 'Cerrar sessión',
      isActive: false,
      routerLink: 'login'
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
  }

  goToRoute(item: MenuItem) {
    if(item.routerLink === 'login') {
      this.userService.logout();
      this.router.navigate([item.routerLink]);
    } else {
      this.router.navigate([item.routerLink], {relativeTo: this.route})
    }
    
  }

}
