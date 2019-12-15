import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, filter, flatMap, map, mergeMap, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { startLoading, stopLoading } from '../shared/ui/ui.actions';
import { AppState } from '../app.reducer';
import { SailorService } from './sailor.service';
import { addSailor, allSailorsLoaded, allSailorsRequested, deleteSailor, sailorAPIError, sailorDeleted, sailorLoaded, sailorRequested, sailorSaved, updateSailor } from './sailor.actions';
import { getAllSailorsLoaded } from './sailor.reducer';
import { SubscriptionService } from '../shared/subscription.service';
import { routerGo } from '../shared/router/router.actions';

@Injectable()
export class SailorEffects {

  constructor( private actions$: Actions, private sailorService: SailorService, private subscriptionService: SubscriptionService, private store: Store<AppState> ) {}

  addSailor$ = createEffect( () => this.actions$.pipe(
    ofType( addSailor ),
    filter( action => action.sailor.id === undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.sailorService.add( action.sailor ).pipe(
      map( ( sailor) => sailorSaved({ sailor, redirectTo: action.redirectTo })),
      catchError( error => of( sailorAPIError({error} )))
    ))
  ));

  deleteBoatClass$ = createEffect( () => this.actions$.pipe(
    ofType( deleteSailor ),
    tap( () => this.store.dispatch( startLoading() )),
    tap( action => this.sailorService.delete( action.sailorId )),
    map( action => sailorDeleted({ redirectTo: action.redirectTo }))
  ));

  loadSailor$ = createEffect( () => this.actions$.pipe(
    ofType( sailorRequested ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.sailorService.findById( action.sailorId ).pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( sailor => sailorLoaded({ sailor })),
      catchError( error => of( sailorAPIError({ error })))
    ))
  ));

  loadAllSailors$ = createEffect( () => this.actions$.pipe(
    ofType( allSailorsRequested ),
    withLatestFrom( this.store.pipe( select( getAllSailorsLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allSailorsLoaded]) => !allSailorsLoaded ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.sailorService.findAll().pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( sailors => allSailorsLoaded({ sailors })),
      catchError( error => of( sailorAPIError({ error })))
    )),
  ));

  stopLoading$ = createEffect( () => this.actions$.pipe(
    ofType( allSailorsLoaded, sailorLoaded, sailorDeleted, sailorSaved ),
    tap( () => this.store.dispatch( stopLoading() )),
    map( action => action.redirectTo ),
    filter( redirectTo => redirectTo !== undefined ),
    tap( redirectTo => this.store.dispatch( routerGo( redirectTo )))
    ),
    {dispatch: false}
  );

  updateSailor$ = createEffect( () => this.actions$.pipe(
    ofType( updateSailor ),
    filter( action => action.sailor.id !== undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.sailorService.update( action.sailor ).pipe(
      map( ( sailor) => sailorSaved({ sailor, redirectTo: action.redirectTo })),
      catchError( error => of( sailorAPIError({error} )))
    ))
  ));
}
