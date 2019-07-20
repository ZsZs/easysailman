import { Injectable } from '@angular/core';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AppState } from '../app.reducer';
import { RaceService } from './race.service';
import { SaveRaceAction, RaceActionTypes, ChangedRaceAction } from './race-management.actions';

@Injectable()
export class RaceManagementEffects {
  @Effect() saveRace = this.actions$.pipe(
    ofType<SaveRaceAction>( RaceActionTypes.SaveRace ),
    mergeMap( action => this.raceService.saveOrUpdateRace( action.payload )),
    map( race => new ChangedRaceAction( race ))
  );

  constructor( private actions$: Actions, private raceService: RaceService, private store: Store<AppState>) {}
}
