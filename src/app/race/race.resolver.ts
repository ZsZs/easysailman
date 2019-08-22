import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { AppState } from '../app.reducer';
import { Race } from './race';
import { getRaceById } from './race-management.reducer';
import { editRace, newRace, raceRequested } from './race-management.actions';

@Injectable()
export class RaceResolver implements Resolve<Race> {

  constructor( private store: Store<AppState> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Race> {
    const idParam = 'id';
    const raceId = route.params[ idParam ];
    if ( raceId === 'new-race' ) {
      const race: Race = {
        id: undefined,
        title: '',
        fromDate: undefined,
        toDate: undefined,
        country: 'Germany',
        place: '',
        organizer: '',
        state: 'planned'
      };
      this.store.dispatch( newRace( { race } ) );
      this.store.dispatch( editRace( { race } ) );
    } else {
      return this.store.pipe(
        select( getRaceById( raceId ) ),
        tap( race => {
          if ( !race ) {
            this.store.dispatch( raceRequested( { raceId } ) );
          }
        } ),
        filter( race => !!race ),
        first(),
        tap( race => this.store.dispatch( editRace( { race } ) ) )
      );
    }
  }
}
