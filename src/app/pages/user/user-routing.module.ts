import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermainComponent } from './usermain/usermain.component';
import { NewTaxDataComponent } from './pages/new-tax-data/new-tax-data.component';
import { UserGuard } from './guards/user.guard';
import { MyDocumentsComponent } from './pages/my-documents/my-documents.component';
import { MyRequestsComponent } from './pages/my-requests/my-requests.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { MainPanelComponent } from './pages/main-panel/main-panel.component';

const routes: Routes = [
  {
    path: '',
    component: UsermainComponent,
    canActivateChild: [UserGuard],
    children: [
      {
        path: 'newrequest',
        component: NewTaxDataComponent,
      },
      {
        path: 'mydocuments',
        component: MyDocumentsComponent,
      },
      {
        path: 'myrequests',
        component: MyRequestsComponent,
      },
      {
        path: 'myprofile',
        component: MyProfileComponent,
      },
      {
        path: 'mainPanel',
        component: MainPanelComponent,
      },
      {
        path: 'newMortage',
        canLoad: [UserGuard],
        loadChildren: () => import('./pages/new-mortgage/new-mortgage.module').then(m => m.NewMortgageModule)
      },
      {
        path: '',
        redirectTo: 'mainPanel',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
