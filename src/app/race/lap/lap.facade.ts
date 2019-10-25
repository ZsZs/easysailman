import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { LapFacadeBase, numberOfLaps } from './lap.state';
import { Lap } from '../domain/lap';
import { getFirstSelectedRace, getSelectedRaces } from '../race.reducer';
import { filter, take, takeLast } from 'rxjs/operators';
import { Race } from '../domain/race';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LapFacade extends LapFacadeBase {
  private numberOfLapsEmitter;
  private numberOfLaps: Observable<number>;
  private race: Race;

  constructor( protected store: Store<AppState> ) {
    super( Lap, store);
    this.numberOfLaps = new Observable<number>( ( emitter ) => this.numberOfLapsEmitter = emitter );
  }

  getNumberOfLaps(): Observable<number> {
    return this.numberOfLaps;
  }

  getRaceId() {
    return this.race.id;
  }

  loadLapsForSelectedRace() {
    this.store.select( getFirstSelectedRace ).pipe(
      filter( selectedRace => selectedRace !== undefined )
    ).subscribe( race => {
        this.race = race;
        this.loadAll( race.id );
      }
    );
  }

  retrieveFirstSelectedRaceFromStore(): Observable<Race> {
    return this.store.select( getFirstSelectedRace );
  }

  updateNumberOfLaps() {
    this.total$.pipe( take( 1) ).subscribe( count => {
      this.numberOfLapsEmitter.next( count );
    });
  }
}
