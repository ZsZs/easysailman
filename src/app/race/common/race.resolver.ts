import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { combineLatest, filter, first, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

import { AppState } from '../../app.reducer';
import { INITIAL_RACE_VALUE, Race } from '../domain/race';
import { getRaceById } from './race.reducer';
import { editRace, newRace, raceRequested } from './race.actions';
import { PathVariables } from '../path-variables';

@Injectable()
export class RaceResolver implements Resolve<Race> {

  constructor( protected store: Store<AppState> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Race> {
    const idParameter = this.resolveParameter( route, PathVariables.raceID );
    let entity: Observable<Race>;
    if ( idParameter === 'new' ) {
      entity = this.resolveNewEntity( route );
    } else {
      entity = this.resolveEntity( idParameter, route );
    }

    return entity;
  }

  // protected, private helper methods
  private resolveEntity( raceId: string, route: ActivatedRouteSnapshot ): Observable<Race> {
    return this.store.pipe(
      select( getRaceById( raceId ) ),
      tap( race => {
        if ( !race ) {
          this.store.dispatch( raceRequested( { raceId } ) );
        }
      }),
      filter( race => !!race ),
      first(),
      tap( race => this.store.dispatch( editRace( { race } )))
    );
  }

  private resolveNewEntity( route: ActivatedRouteSnapshot ): Observable<Race> {
    const race: Race = INITIAL_RACE_VALUE;
    this.store.dispatch( newRace( { race }));
    this.store.dispatch( editRace( { race }));
    return of( race );
  }

  private resolveParameter( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }
}
