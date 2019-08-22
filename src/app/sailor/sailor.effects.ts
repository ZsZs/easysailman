import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { SailorService } from './sailor.service';
import { allSailorsLoaded, allSailorsRequested, changedSailor, sailorLoaded, sailorRequested, saveSailor } from './sailor.actions';
import { getAllSailorsLoaded } from './sailor.reducer';

@Injectable()
export class SailorEffects {

  @Effect() loadSailor = this.actions$.pipe(
    ofType( sailorRequested ),
    mergeMap( action => this.raceService.findRaceById( action.sailorId )),
    map( sailor => sailorLoaded({ sailor }))
  );

  @Effect() loadAllSailors = this.actions$.pipe(
    ofType( allSailorsRequested ),
    withLatestFrom( this.store.pipe( select( getAllSailorsLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allSailorsLoaded]) => !allSailorsLoaded ),
    mergeMap( action => this.raceService.fetchSailors() ),
    map( sailors => allSailorsLoaded({ sailors }))
  );

  @Effect() saveRace = this.actions$.pipe(
    ofType( saveSailor ),
    mergeMap( action => this.raceService.saveOrUpdateRace( action.sailor )),
    map( sailor => changedSailor( {sailor} ))
  );

  constructor( private actions$: Actions, private raceService: SailorService, private store: Store<AppState>) {}
}
