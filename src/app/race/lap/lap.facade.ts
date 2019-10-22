import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { LapFacadeBase } from '../domain/lap.state';
import { Lap } from '../domain/lap';

@Injectable({ providedIn: 'root' })
export class LapFacade extends LapFacadeBase {
  constructor( store: Store<AppState> ) {
    super( Lap, store);
  }

  // TODO: Extend your facade's functionaltiy here!
}
