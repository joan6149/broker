import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Request } from '../models/NewMortage.model';

export const UserStateActions = createActionGroup({
  source: 'UserState',
  events: {
    'Load Request': props<{ request: Request }>(),
    'Load Request Success': props<{ request: Request }>(),
    'Load Request Failure': props<{ error: string }>(),
    'Get Requests':  emptyProps(),
    'Get Requests Success': props<{ requests: Request[] }>(),
    'Get Request Failure': props<{ error: string }>(),
    'Publish Request': props<{requestId:string, publish: boolean}>(),
    'Publish Success': props<{requestPublished: Request}>(),
    'UserActionError':props<{error: string}>()
  }
});
