import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrokermainComponent } from './brokermain/brokermain.component';
import { BrokerGuard } from './guards/broker.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [BrokerGuard],
    component: BrokermainComponent
  },
  {
    path: '*',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerRoutingModule { }
