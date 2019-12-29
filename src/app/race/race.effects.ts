import { Injectable } from '@angular/core';
import { catchError, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { AppState } from '../app.reducer';
import { RaceService } from './race.service';
import { getAllRacesLoaded, getFirstSelectedRace, getRaceById } from './race.reducer';
import {
  allRacesLoaded,
  allRacesRequested,
  deleteRace,
  raceDeleted,
  raceLoaded,
  raceRequested,
  raceSaved,
  addRace,
  updateRace,
  raceAPIError,
  editRace,
  setSelectedRaces,
  raceRequestedAndSelect
} from './race.actions';
import { startLoading, stopLoading } from '../shared/ui/ui.actions';
import { ComponentDestroyService } from '../shared/component-destroy.service';
import { of } from 'rxjs';
import { routerGo } from '../shared/router/router.actions';
import { allRegistrationsRequested, allRegistrationsUnLoaded } from './registration/registration.actions';

@Injectable()
export class RaceEffects {

  constructor( protected actions$: Actions, protected raceService: RaceService, protected subscriptionService: ComponentDestroyService, protected store: Store<AppState> ) {}

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

  editrace$ = createEffect(() => this.actions$.pipe(
    ofType( editRace ),
    map( action => action.race ),
    tap( race => this.store.dispatch( setSelectedRaces({ races:  [race] })))
    ),
    {dispatch: false}
  );

  loadRace$ = createEffect( () => this.actions$.pipe(
    ofType( raceRequested ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.raceService.findById( action.raceId ).pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( race => raceLoaded({ race })),
      catchError( error => of( raceAPIError({ error })))
    ))
  ));

  loadAndSelectRace$ = createEffect( () => this.actions$.pipe(
    ofType( raceRequestedAndSelect ),
    tap( ( action ) => this.store.dispatch( raceRequested({ raceId: action.raceId }) )),
    switchMap( action => this.store.select( getRaceById( action.raceId ))),
    filter( race => !!race ),
    map( race => setSelectedRaces({ races: [race] }))
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
    ))
  ));

  raceAPIError$ = createEffect( () => this.actions$.pipe(
    ofType( raceAPIError ),
    tap( action => console.log( action.error) ),
    map( action => action.redirectTo ),
    filter( redirectTo => redirectTo !== undefined ),
    map( redirectTo => routerGo( redirectTo ))
  ));

  setSelectedRaces$ = createEffect( () => this.actions$.pipe(
    ofType( setSelectedRaces ),
    tap( () => this.store.dispatch( allRegistrationsUnLoaded() ))
  ),
    {dispatch: false}
  );

  stopLoading$ = createEffect( () => this.actions$.pipe(
    ofType( allRacesLoaded, raceLoaded, raceDeleted, raceSaved ),
    tap( () => this.store.dispatch( stopLoading() )),
    map( action => action.redirectTo ),
    filter( redirectTo => redirectTo !== undefined ),
    tap( redirectTo => this.store.dispatch( routerGo( redirectTo )))
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
