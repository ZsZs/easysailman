import { Actions, createEffect } from '@ngrx/effects';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { EntityActionTypes, ofEntityType } from '@briebug/ngrx-auto-entity';
import { tap } from 'rxjs/operators';
import { Lap } from '../domain/lap';
import { Injectable } from '@angular/core';
import { LapFacade } from './lap.facade';

@Injectable()
export class LapEffects {

  constructor( private actions$: Actions, private store: Store<AppState>, private lapFacade: LapFacade ) {}

/*
  loadAllSuccess$ = createEffect( () => this.actions$.pipe(
    ofEntityType( Lap, EntityActionTypes.LoadAllSuccess ),
    tap( () => this.lapFacade.updateNumberOfLaps() )
  ), {dispatch: false} );

  selected$ = createEffect( () => this.actions$.pipe(
    ofEntityType( Lap, EntityActionTypes.Selected ),
    tap( () => this.lapFacade.updateSelectedLap() )
  ), {dispatch: false });
*/
}
