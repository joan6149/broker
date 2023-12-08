import { Component, OnInit, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Request } from '../../models/NewMortage.model';
import { RequestService } from '../services/request.service';
import { Store } from '@ngrx/store';
import { UserState } from '../../UserState/user-state.reducer';
import { UserStateActions } from '../../UserState/user-state.actions';
import { selectRequestLoaded } from '../../UserState/user-state.selectors';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss']
})
export class MyRequestsComponent implements OnInit {

  userStore: Store<UserState> = inject(Store<UserState>);
  requests$: Observable<Request[]> = new Observable<Request[]>();


  constructor() { }

  ngOnInit(): void {
    this.requests$ = this.userStore.select(selectRequestLoaded).pipe(
      tap(req => console.log('RECIBIDO STORE', req))
    );
    this.userStore.dispatch(UserStateActions.getRequests());
  }

  editRequest(request:Request):void {

  }

  publicRequest(request:Request):void {
    console.log(request);
    this.userStore.dispatch(UserStateActions.publishRequest({requestId: request.id!, publish: true}));
  }

  deleteRequest(request:Request):void {

}

}
