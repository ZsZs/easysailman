import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { LapFacadeBase, numberOfLaps } from './lap.state';
import { Lap } from '../domain/lap';
import { getFirstSelectedRace, getSelectedRaces } from '../race.reducer';
import { filter, take, takeLast } from 'rxjs/operators';
import { Race } from '../domain/race';
import { Observable, of, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LapFacade extends LapFacadeBase {
  private numberOfLaps: Subject<number>;
  private race: Race;
  private selectedLap: Subject<Lap>;

  constructor( protected store: Store<AppState> ) {
    super( Lap, store);
    this.numberOfLaps = new Subject<number>();
    this.selectedLap = new Subject<Lap>();
  }

  getNumberOfLaps(): Observable<number> {
    return this.numberOfLaps;
  }

  getRaceId() {
    return this.race.id;
  }

  initializeStore() {
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

  retrieveSelectedLapFromStore(): Observable<Lap> {
    return this.selectedLap;
  }

  retrieveFirstSelectedRaceFromStore(): Observable<Race> {
    return this.store.select( getFirstSelectedRace );
  }

  updateNumberOfLaps() {
    this.total$.pipe( take( 1) ).subscribe( count => {
      this.numberOfLaps.next( count );
    });
  }

  updateSelectedLap() {
    this.current$.pipe( take( 1 ) ).subscribe( lap => {
      if ( lap ) {
        this.selectedLap.next( lap );
      }
    });
  }
}
