import { Injectable } from '@angular/core';
import { catchError, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { AppState } from '../../app.reducer';
import { RaceService } from './race.service';
import { getAllRacesLoaded } from './race.reducer';
import { allRacesLoaded, allRacesRequested, deleteRace, raceDeleted, raceLoaded, raceRequested, raceSaved, addRace, updateRace, raceAPIError } from './race.actions';
import { startLoading, stopLoading } from '../../shared/ui/ui.actions';
import { SubscriptionService } from '../../shared/subscription.service';
import { of } from 'rxjs';
import { routerGo } from '../../shared/router/router.actions';
import { getAllSailorsLoaded } from '../../sailor/sailor.reducer';

@Injectable()
export class RaceEffects {

  constructor( protected actions$: Actions, protected raceService: RaceService, protected subscriptionService: SubscriptionService, protected store: Store<AppState> ) {}

  addRace$ = createEffect( () => this.actions$.pipe(
    ofType( addRace ),
    filter( action => action.race.id === undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.raceService.add( action.race ).pipe(
      map( ( race) => raceSaved({ race, redirectTo: action.redirectTo })),
      catchError( error => of( raceAPIError({error} )))
    ))
  ));

  deleteRace$ = createEffect( () => this.actions$.pipe(
    ofType( deleteRace ),
    tap( () => this.store.dispatch( startLoading() )),
    tap( action => this.raceService.delete( action.raceId )),
    map( action => raceDeleted({ redirectTo: action.redirectTo }))
  ));

  loadRace$ = createEffect( () => this.actions$.pipe(
    ofType( raceRequested ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.raceService.findById( action.raceId ).pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( race => raceLoaded({ race })),
      catchError( error => of( raceAPIError({ error })))
    ))
  ));

  loadAllRaces$ = createEffect( () => this.actions$.pipe(
    ofType( allRacesRequested ),
    withLatestFrom( this.store.pipe( select( getAllRacesLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allRacesLoaded]) => !allRacesLoaded ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.raceService.findAll().pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( races => allRacesLoaded({ races })),
      catchError( error => of( raceAPIError({ error })))
    )),
  ));

  stopLoading$ = createEffect( () => this.actions$.pipe(
    ofType( allRacesLoaded, raceLoaded, raceDeleted, raceSaved ),
    tap( () => this.store.dispatch( stopLoading() )),
    map( action => action.redirectTo ),
    filter( redirectTo => redirectTo !== undefined ),
    map( redirectTo => this.store.dispatch( routerGo( redirectTo )))
    ),
    {dispatch: false}
  );

  updateRace$ = createEffect( () => this.actions$.pipe(
    ofType( updateRace ),
    filter( action => action.race.id !== undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.raceService.update( action.race ).pipe(
      map( ( race) => raceSaved({ race, redirectTo: action.redirectTo })),
      catchError( error => of( raceAPIError({error} )))
    ))
  ));

}
