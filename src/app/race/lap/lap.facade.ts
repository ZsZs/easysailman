import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { LapFacadeBase, numberOfLaps } from './lap.state';
import { Lap } from '../domain/lap';
import { getFirstSelectedRace, getSelectedRaces } from '../race.reducer';
import { filter, finalize, map, mergeMap, switchMap, take, takeLast, tap } from 'rxjs/operators';
import { Race } from '../domain/race';
import { Observable, of, Subject, Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LapFacade extends LapFacadeBase {

  constructor( protected store: Store<AppState> ) {
    super( Lap, store);
  }

  getNumberOfLaps(): Observable<number> {
    return this.total$;
  }

  isLoaded( raceId: string ): Observable<boolean> {
    return this.all$.pipe(
      map( laps => laps.filter( lap => {
        return lap.raceId === raceId;
      })),
      map( (laps: Lap[]) => {
        return laps.length > 0;
      })
    );
  }

  loadLapsForRace( raceId: string ) {
    this.loadAll( raceId );
  }

  loadLapsForSelectedRace() {
    this.store.select( getFirstSelectedRace ).pipe(
      filter( selectedRace => selectedRace !== undefined ),
      tap( race => this.loadAll( race.id ))
    );
  }

  retrieveSelectedLapFromStore(): Observable<Lap> {
    return this.current$;
  }

  retrieveFirstSelectedRaceFromStore(): Observable<Race> {
    return this.store.select( getFirstSelectedRace );
  }
}
