import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewMortgageComponent } from './new-mortgage.component';

const routes: Routes = [
  {
    path: '',
    component: NewMortgageComponent,
    pathMatch: 'full'
  },
  {
    path: ':step',
    component: NewMortgageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewMortgageRoutingModule { }
