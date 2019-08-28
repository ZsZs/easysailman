import { Injectable } from '@angular/core';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { AppState } from '../app.reducer';
import { RaceService } from './race.service';
import { getAllRacesLoaded } from './race.reducer';
import { allRacesLoaded, allRacesRequested, changedRace, raceLoaded, raceRequested, saveRace } from './race.actions';
import { startLoading, stopLoading } from '../shared/ui.actions';

@Injectable()
export class RaceEffects {

  @Effect() loadRace = this.actions$.pipe(
    ofType( raceRequested ),
    mergeMap( action => this.raceService.findRaceById( action.raceId )),
    map( race => raceLoaded({ race }))
  );

  @Effect() loadAllRaces = this.actions$.pipe(
    ofType( allRacesRequested ),
    withLatestFrom( this.store.pipe( select( getAllRacesLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allRacesLoaded]) => !allRacesLoaded ),
    mergeMap( action => {
      this.store.dispatch( startLoading() );
      return this.raceService.fetchRaces();
    }),
    map( races => {
      this.store.dispatch( stopLoading() );
      return allRacesLoaded({ races });
    })
  );

  @Effect() saveRace = this.actions$.pipe(
    ofType( saveRace ),
    mergeMap( action => this.raceService.saveOrUpdateRace( action.race )),
    map( race => changedRace( {race} ))
  );

  constructor( private actions$: Actions, private raceService: RaceService, private store: Store<AppState>) {}
}
