import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import { startLoading, stopLoading } from '../shared/ui/ui.actions';

import {
  addYachtClub,
  allYachtClubsLoaded,
  allYachtClubsRequested,
  deleteYachtClub,
  updateYachtClub,
  yachtClubAPIError,
  yachtClubDeleted,
  yachtClubLoaded,
  yachtClubRequested,
  yachtClubSaved
} from './yacht-club.actions';
import { getAllYachtClubsLoaded } from './yacht-club.reducer';
import { YachtClubService } from './yacht-club.service';
import { routerGo } from '../shared/router/router.actions';
import { ComponentDestroyService } from '../shared/component-destroy.service';
import { of } from 'rxjs';

@Injectable()
export class YachtClubEffects {

  constructor( private actions$: Actions, private yachtClubService: YachtClubService, private subscriptionService: ComponentDestroyService, private store: Store<AppState>) {}

  @Effect() addYachtClub = this.actions$.pipe(
    ofType( addYachtClub ),
    filter( action => action.yachtClub.id === undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.yachtClubService.add( action.yachtClub ).pipe(
      map( ( yachtClub) => yachtClubSaved({ yachtClub, redirectTo: action.redirectTo })),
      catchError( error => of( yachtClubAPIError({ error })))
    ))
  );

  @Effect() deleteYachtClub = this.actions$.pipe(
    ofType( deleteYachtClub ),
    tap( () => this.store.dispatch( startLoading() )),
    tap( action => this.yachtClubService.delete( action.yachtClubId )),
    map( action => yachtClubDeleted({ redirectTo: action.redirectTo }))
  );

  @Effect() loadYachtClub = this.actions$.pipe(
    ofType( yachtClubRequested ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.yachtClubService.findById( action.yachtClubId ).pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( yachtClub => yachtClubLoaded({ yachtClub })),
      catchError( error => of( yachtClubAPIError({ error })))
    )),
  );

  @Effect() loadAllYachtClubs = this.actions$.pipe(
    ofType( allYachtClubsRequested ),
    withLatestFrom( this.store.pipe( select( getAllYachtClubsLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allYachtClubsLoaded]) => !allYachtClubsLoaded ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.yachtClubService.findAll().pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( yachtClubs => allYachtClubsLoaded({ yachtClubs })),
      catchError( error => of( yachtClubAPIError({ error })))
    )),
  );

  @Effect({dispatch: false}) stopLoading = this.actions$.pipe(
    ofType( allYachtClubsLoaded, yachtClubLoaded, yachtClubDeleted, yachtClubSaved ),
    tap( () => this.store.dispatch( stopLoading() )),
    map( action => action.redirectTo ),
    filter( redirectTo => redirectTo !== undefined ),
    map( redirectTo => this.store.dispatch( routerGo( redirectTo )))
  );

  @Effect() updateYachtClub = this.actions$.pipe(
    ofType( updateYachtClub ),
    filter( action => action.yachtClub.id !== undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.yachtClubService.update( action.yachtClub ).pipe(
      map( ( yachtClub ) => yachtClubSaved({ yachtClub, redirectTo: action.redirectTo })),
      catchError( error => of( yachtClubAPIError({error} )))
    ))
  );
}
