import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SubscriptionService } from '../../shared/subscription.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import {
  addRegistration,
  allRegistrationsLoaded,
  allRegistrationsRequested,
  deleteRegistration, editRegistration,
  registrationDeleted,
  registrationLoaded,
  registrationRequested,
  registrationSaved,
  setSelectedRegistrations,
  updateRegistration
} from './registration.actions';
import { catchError, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { startLoading, stopLoading } from '../../shared/ui/ui.actions';
import { routerGo } from '../../shared/router/router.actions';
import { raceAPIError } from '../race.actions';
import { of } from 'rxjs';
import { RegistrationService } from './registration.service';
import { getAllRegistrationsLoaded } from './registration.reducer';

@Injectable()
export class RegistrationEffects {
  constructor( protected actions$: Actions, protected registrationService: RegistrationService, protected subscriptionService: SubscriptionService, protected store: Store<AppState> ) {}

  addRegistration$ = createEffect(() => this.actions$.pipe(
    ofType( addRegistration ),
    filter( action => action.registration.id === undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.registrationService.addRegistration( action.registration.raceId, action.registration ).pipe(
      map( ( registration) => registrationSaved({ registration, redirectTo: action.redirectTo })),
      catchError( error => of( raceAPIError({error} )))
    ))
  ));

  deleteRegistration$ = createEffect(() => this.actions$.pipe(
    ofType( deleteRegistration ),
    tap( () => this.store.dispatch( startLoading() )),
    tap( action => this.registrationService.deleteRegistration( action.registration.raceId, action.registration.id )),
    map( action => registrationDeleted({ redirectTo: action.redirectTo }))
  ));

  editRegistration$ = createEffect( () => this.actions$.pipe(
    ofType( editRegistration ),
    map( action => action.registration ),
    tap( registration => this.store.dispatch( setSelectedRegistrations({ registrations: [registration] })))
    ),
    {dispatch: false}
  );

  loadAllRegistrations$ = createEffect(() => this.actions$.pipe(
    ofType( allRegistrationsRequested ),
    withLatestFrom( this.store.pipe( select( getAllRegistrationsLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allRegistrationsLoaded]) => !allRegistrationsLoaded ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( ([action]) => this.registrationService.findAllRegistrations( action.raceId ).pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( registrations => allRegistrationsLoaded({ registrations })),
      catchError( error => of( raceAPIError({ error })))
    ))
  ));

  loadRegistration$ = createEffect(() => this.actions$.pipe(
    ofType( registrationRequested ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.registrationService.findRegisrationById( action.raceId, action.registrationId ).pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( registration => registrationLoaded({ registration })),
      catchError( error => of( raceAPIError({ error })))
    ))
  ));

  stopLoading$ = createEffect(() => this.actions$.pipe(
    ofType( allRegistrationsLoaded, registrationLoaded, registrationDeleted, registrationSaved ),
    tap( () => this.store.dispatch( stopLoading() )),
    map( action => action.redirectTo ),
    filter( redirectTo => redirectTo !== undefined ),
    tap( redirectTo => this.store.dispatch( routerGo( redirectTo )))),
    {dispatch: false}
  );

  updateRegistration$ = createEffect( () => this.actions$.pipe(
    ofType( updateRegistration ),
    filter( action => action.registration.id !== undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.registrationService.updateRegistration( action.registration.raceId, action.registration ).pipe(
      map( ( registration ) => registrationSaved({ registration, redirectTo: action.redirectTo })),
      catchError( error => of( raceAPIError({error} )))
    ))
  ));
}
