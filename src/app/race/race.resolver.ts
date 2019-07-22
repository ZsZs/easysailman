import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';

import { RaceService } from './race.service';
import { AppState } from '../app.reducer';
import { Race } from './race';
import { getRaceById } from './race-management.reducer';
import { editRace, raceRequested } from './race-management.actions';

@Injectable()
export class RaceResolver implements Resolve<Race> {

  constructor( private store: Store<AppState> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Race> {
    const raceId = route.params['id'];
    return this.store.pipe(
      select( getRaceById( raceId )),
      tap( race => {
        if ( !race ) {
          this.store.dispatch( raceRequested({ raceId }));
        }
      }),
      filter( race => !!race ),
      first(),
      tap( race => this.store.dispatch( editRace({ race: race })))
    );
  }
}

