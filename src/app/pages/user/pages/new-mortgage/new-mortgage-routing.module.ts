import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewMortgageComponent } from './new-mortgage.component';
import { newMortageResolver } from './new-mortage.resolver';

const routes: Routes = [
  {
    path: '',
    component: NewMortgageComponent,
    pathMatch: 'full',
    resolve: {
      newMortageResolver: newMortageResolver
    }
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewMortgageRoutingModule { }
