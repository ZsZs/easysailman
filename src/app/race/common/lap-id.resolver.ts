import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Race } from './race';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Observable } from 'rxjs';
import { editRace, newRace, raceRequested } from './race.actions';
import { getRaceById } from './race.reducer';
import { filter, first, tap } from 'rxjs/operators';

@Injectable()
export class LapIdResolver implements Resolve<Race> {

  constructor( private store: Store<AppState> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Race> {
    const raceId = this.retrievePathParameterValue( route, 'raceId' );
    const lapId = this.retrievePathParameterValue( route, 'lapId' );
    return this.store.pipe(
      select( getRaceById( raceId ) ),
      tap( race => {
        if ( !race ) {
          this.store.dispatch( raceRequested( { raceId } ) );
        }
      }),
      filter( race => !!race ),
      first(),
      tap( race => this.store.dispatch( editRace( { race } ) ) )
    );
  }

  // private helper methods
  private retrievePathParameterValue( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }
}
