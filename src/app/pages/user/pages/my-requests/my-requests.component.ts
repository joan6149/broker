import { Component, OnInit, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Request } from '../../models/NewMortage.model';
import { Store } from '@ngrx/store';
import { UserState } from '../../UserState/user-state.reducer';
import { selectRequestLoaded } from '../../UserState/user-state.selectors';
import { Confirmation, ConfirmationService } from 'primeng/api';
import { RequestStateActions } from '../../UserState/RequestsState/requests-state.actions';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {

  editDisplay: boolean = false;
  subForms: String[] = [];

  userStore: Store<UserState> = inject(Store<UserState>);
  requests$: Observable<Request[]> = new Observable<Request[]>();


  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.requests$ = this.userStore.select(selectRequestLoaded).pipe(
      tap(val => console.log(val))
    );
    this.userStore.dispatch(RequestStateActions.getRequests());
  }

  editRequest(request:Request):void {
    this.editDisplay = true;
  }

  publicRequest(request:Request):void {
    this.confirmationService.confirm({
      message: '¿Quiere publicar esta petición, para poder recibir ofertas sobre ella?',
      accept: () => {
        this.userStore.dispatch(RequestStateActions.publishRequest({requestId: request.id!, publish: true}));
      }
    } as Confirmation)
  }

  deleteRequest(request:Request):void {

}

}
