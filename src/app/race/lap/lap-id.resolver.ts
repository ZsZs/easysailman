import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Race } from '../domain/race';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { empty, Observable } from 'rxjs';
import { raceRequested, setSelectedRaces } from '../race.actions';
import { getRaceById } from '../race.reducer';
import { filter, first, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { PathVariables } from '../path-variables';
import { LapFacade } from './lap.facade';
import { Lap } from '../domain/lap';
import { getIsLoaded, allLaps, currentLap } from './lap.state';

@Injectable()
export class LapIdResolver implements Resolve<Lap> {
  private route: ActivatedRouteSnapshot;
  private raceId: string;
  private lapId: string;

  constructor( private store: Store<AppState>, private lapFacade: LapFacade ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Lap> {
    this.route = route;
    return this.resolveRace().pipe(
      switchMap( race => this.resolveLap( race ))
    );
  }

  // private helper methods
  private resolveLap( race: Race ): Observable<Lap> {
    return this.checkAndWaitForLapsLoaded( race.id ).pipe(
      switchMap( (laps: Lap[]) => this.setCurrentLap( laps ))
    );
  }

  private setCurrentLap( laps: Lap[] ): Observable<Lap> {
    const lapId = this.retrievePathParameterValue( this.route, PathVariables.lapID );
    return this.store.pipe(
      select( currentLap ),
      filter( lap => !( lap && lap.index !== Number( lapId ))),
      tap( () => {
        if ( laps.length > 0 ) {
          if ( lapId === 'unknown' ) {
            this.lapFacade.selectByKey( 1 );
          } else {
            this.lapFacade.selectByKey( Number( lapId ));
          }
        }
      })
    );
  }

  private checkAndWaitForLapsLoaded( raceId: string ): Observable<Lap[]> {
    return this.store.pipe(
      select( getIsLoaded( raceId )),
      tap( (isLoaded) => {
        if ( !isLoaded ) {
          this.lapFacade.loadAll( raceId );
        }
      }),
      select( allLaps ),
      filter( laps => !!laps )
    );
  }

  private resolveRace(): Observable<Race> {
    const raceId = this.retrievePathParameterValue( this.route, PathVariables.raceID );
    return this.store.pipe(
      select( getRaceById( raceId ) ),
      tap( race => {
        if ( !race ) {
          this.store.dispatch( raceRequested( { raceId } ) );
        }
      }),
      filter( race => !!race ),
      first(),
      tap( race => this.store.dispatch( setSelectedRaces({ races: [race]} )))
    );
  }

  private retrievePathParameterValue( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }
}
