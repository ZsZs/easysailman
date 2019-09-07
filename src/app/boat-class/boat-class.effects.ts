import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, filter, flatMap, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../shared/ui/ui.actions';
import { SubscriptionService } from '../shared/subscription.service';
import { AppState } from '../app.reducer';
import { Router } from '@angular/router';
import {
  addBoatClass,
  addOrUpdateBoatClass,
  allBoatClassesLoaded,
  allBoatClassesRequested,
  boatClassAPIError,
  boatClassDeleted,
  boatClassLoaded,
  boatClassRequested,
  boatClassSaved,
  deleteBoatClass,
  updateBoatClass
} from './boat-class.actions';
import { BoatClassService } from './boat-class.service';
import { getAllBoatClassesLoaded } from './boat-class.reducer';
import { routerGo } from '../shared/router/router.actions';
import { of } from 'rxjs';

@Injectable()
export class BoatClassEffects {

  constructor( private actions$: Actions, private boatClassService: BoatClassService, private subscriptionService: SubscriptionService, private store: Store<AppState>, private router: Router ) {}

  @Effect() addOrUpdateBoatClass = this.actions$.pipe(
    ofType( addOrUpdateBoatClass ),
    tap( () => this.store.dispatch( startLoading() )),
    flatMap( action => [addBoatClass({ boatClass: action.boatClass, redirectTo: action.redirectTo }), updateBoatClass({ boatClass: action.boatClass, redirectTo: action.redirectTo })])
  );

  @Effect() addBoatClass = this.actions$.pipe(
    ofType( addBoatClass ),
    filter( action => action.boatClass.id === undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.boatClassService.add( action.boatClass ).pipe(
      map( (boatClass) => boatClassSaved({ boatClass, redirectTo: action.redirectTo })),
      catchError( error => of( boatClassAPIError({error} )))
    ))
  );

  @Effect() deleteBoatClass = this.actions$.pipe(
    ofType( deleteBoatClass ),
    tap( () => this.store.dispatch( startLoading() )),
    tap( action => this.boatClassService.delete( action.boatClassId )),
    map( action => boatClassDeleted({ redirectTo: action.redirectTo }))
  );

  @Effect() loadBoatClass = this.actions$.pipe(
    ofType( boatClassRequested ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.boatClassService.findById( action.boatClassId ).pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( boatClass => boatClassLoaded({ boatClass })),
      catchError( error => of( boatClassAPIError({ error })))
    ))
  );

  @Effect() loadAllBoatClasses = this.actions$.pipe(
    ofType( allBoatClassesRequested ),
    withLatestFrom( this.store.pipe( select( getAllBoatClassesLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allBoatClassesLoaded]) => !allBoatClassesLoaded ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.boatClassService.findAll().pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( boatClasses => allBoatClassesLoaded({ boatClasses })),
      catchError( error => of( boatClassAPIError({ error })))
    )),
  );

  @Effect({dispatch: false}) stopLoading = this.actions$.pipe(
    ofType( allBoatClassesLoaded, boatClassLoaded, boatClassDeleted, boatClassSaved ),
    tap( () => this.store.dispatch( stopLoading() )),
    map( action => action.redirectTo ),
    filter( redirectTo => redirectTo !== undefined ),
    map( redirectTo => this.store.dispatch( routerGo( redirectTo )))
  );

  @Effect() updateBoatClass = this.actions$.pipe(
    ofType( updateBoatClass ),
    filter( action => action.boatClass.id !== undefined ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.boatClassService.update( action.boatClass ).pipe(
      map( (boatClass) => boatClassSaved({ boatClass, redirectTo: action.redirectTo })),
      catchError( error => of( boatClassAPIError({error} )))
    ))
  );
}
