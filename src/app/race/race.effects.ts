import { Injectable } from '@angular/core';
import { concatMap, filter, map, mapTo, mergeMap, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { AppState } from '../app.reducer';
import { RaceService } from './race.service';
import { getAllRacesLoaded } from './race.reducer';
import { allRacesLoaded, allRacesRequested, changedRace, deleteRace, raceDeleted, raceLoaded, raceRequested, raceSaved, saveRace } from './race.actions';
import { startLoading, stopLoading } from '../shared/ui.actions';
import { Router } from '@angular/router';
import { SubscriptionService } from '../shared/subscription.service';

@Injectable()
export class RaceEffects {

  @Effect() stopLoading = this.actions$.pipe(
    ofType( allRacesLoaded, raceLoaded, raceDeleted, raceSaved ),
    tap( () => this.router.navigateByUrl( '/race' )),
    map( () => stopLoading() )
  );

  @Effect() allRacesRequested = this.actions$.pipe(
    ofType( allRacesRequested ),
    withLatestFrom( this.store.pipe( select( getAllRacesLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allRacesLoaded]) => !allRacesLoaded ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.raceService.fetchRaces().pipe( takeUntil( this.subscriptionService.unsubscribe$ ))),
    map( races => allRacesLoaded({ races }))
  );

  @Effect() deleteRace = this.actions$.pipe(
    ofType( deleteRace ),
    tap( () => this.store.dispatch( startLoading() )),
    map( action => action.raceId ),
    switchMap( raceId => this.raceService.delete( raceId )),
    map( () => raceDeleted())
  );

  @Effect() raceRequested = this.actions$.pipe(
    ofType( raceRequested ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.raceService.findRaceById( action.raceId )),
    map( race => raceLoaded({ race }))
  );

  @Effect() saveRace = this.actions$.pipe(
    ofType( saveRace ),
    tap( () => this.store.dispatch( startLoading() )),
    map( action => action.race ),
    switchMap( race => this.raceService.saveOrUpdateRace( race )),
    map( ( race ) => raceSaved({ race }))
  );

  constructor( private actions$: Actions, private raceService: RaceService, private subscriptionService: SubscriptionService, private store: Store<AppState>, private router: Router ) {}
}
