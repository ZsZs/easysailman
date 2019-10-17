import { Action, createAction, props } from '@ngrx/store';
import { Race } from '../race/domain/race';
import { UrlSegment } from '@angular/router';

export const authenticateUser = createAction( '[AUTH] Authenticate User', props<{ returnTo: string }>() );
export const setAuthenticated = createAction( '[AUTH] Set Authenticated' );
export const setUnauthenticated = createAction( '[AUTH] Set Unauthenticated' );
