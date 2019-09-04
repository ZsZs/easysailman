import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { startLoading, stopLoading } from '../shared/ui/ui.actions';
import { SubscriptionService } from '../shared/subscription.service';
import { AppState } from '../app.reducer';
import { Router } from '@angular/router';
import {
  addBoatClass,
  allBoatClassesLoaded,
  allBoatClassesRequested,
  boatClassDeleted,
  boatClassLoaded,
  boatClassRequested,
  boatClassSaved,
  deleteBoatClass,
  updateBoatClass } from './boat-class.actions';
import { BoatClassService } from './boat-class.service';
import { getAllBoatClassesLoaded } from './boat-class.reducer';

@Injectable()
export class BoatClassEffects {

  @Effect() stopLoading = this.actions$.pipe(
    ofType( allBoatClassesLoaded, boatClassLoaded, boatClassDeleted, boatClassSaved ),
    map( () => stopLoading() )
  );

  @Effect() allBoatClassesRequested = this.actions$.pipe(
    ofType( allBoatClassesRequested ),
    withLatestFrom( this.store.pipe( select( getAllBoatClassesLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allBoatClassesLoaded]) => !allBoatClassesLoaded ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.boatClassService.findAll().pipe( takeUntil( this.subscriptionService.unsubscribe$ ))),
    map( boatClasses => allBoatClassesLoaded({ boatClasses }))
  );

  @Effect() deleteBoatClass = this.actions$.pipe(
    ofType( deleteBoatClass ),
    tap( () => this.store.dispatch( startLoading() )),
    map( action => action.boatClassId ),
    tap( boatClassId => this.boatClassService.delete( boatClassId )),
    map( () => boatClassDeleted())
  );

  @Effect() boatClassRequested = this.actions$.pipe(
    ofType( boatClassRequested ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.boatClassService.findById( action.boatClassId )),
    map( boatClass => boatClassLoaded({ boatClass }))
  );

  @Effect() addBoatClass = this.actions$.pipe(
    ofType( addBoatClass ),
    tap( () => this.store.dispatch( startLoading() )),
    map( action => action.boatClass ),
    switchMap( boatClass => this.boatClassService.add( boatClass )),
    map( ( boatClass ) => boatClassSaved({ boatClass }))
  );

  @Effect() updateBoatClass = this.actions$.pipe(
    ofType( updateBoatClass ),
    tap( () => this.store.dispatch( startLoading() )),
    map( action => action.boatClass ),
    switchMap( boatClass => this.boatClassService.update( boatClass )),
    map( ( boatClass ) => boatClassSaved({ boatClass }))
  );

  constructor( private actions$: Actions, private boatClassService: BoatClassService, private subscriptionService: SubscriptionService, private store: Store<AppState>, private router: Router ) {}
}
