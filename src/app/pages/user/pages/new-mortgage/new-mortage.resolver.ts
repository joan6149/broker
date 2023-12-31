import type { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../UserState/user-state.reducer';
import { NewMortageActions } from '../../UserState/NewMortageState/new-mortage-state.actions';
import { NewMortgageComponent } from './new-mortgage.component';

export const newMortageResolver: ResolveFn<boolean> = (route, state) => {
  console.log(`New Mortage: Cargando Templates para formulario ${NewMortgageComponent.FORM_ID}`);
  inject(Store<UserState>).dispatch(NewMortageActions.getAllTemplates({formId: NewMortgageComponent.FORM_ID}));
  return true;
};
