import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Race } from '../domain/race';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Observable } from 'rxjs';
import { editRace, newRace, raceRequested, setSelectedRaces } from '../race.actions';
import { getRaceById } from '../race.reducer';
import { filter, first, switchMap, tap } from 'rxjs/operators';
import { PathVariables } from '../path-variables';
import { allRegistrationsRequested } from '../registration/registration.actions';
import { LapFacade } from './lap.facade';
import { Lap } from '../domain/lap';
import { Registration } from '../domain/registration';

@Injectable()
export class LapIdResolver implements Resolve<Lap> {
  private route: ActivatedRouteSnapshot;

  constructor( private store: Store<AppState>, private lapFacade: LapFacade ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Lap> {
    this.route = route;
    return this.resolveRace().pipe(
      switchMap( race => this.resolveLap( race ))
    );
  }

  // private helper methods
  private resolveExistingLap( lapId: number ): Observable<Lap> {
    this.lapFacade.selectByKey( lapId );
    return this.lapFacade.retrieveSelectedLapFromStore();
  }

  private resolveLap( race: Race ): Observable<Lap> {
    this.lapFacade.loadLapsForSelectedRace();
    const lapId = this.retrievePathParameterValue( this.route, PathVariables.lapID );
    let lap: Observable<Lap>;
    if ( lapId === 'unknown' ) {
      lap = this.resolveUnknownLap( race );
    } else {
      lap = this.resolveExistingLap( lapId );
    }
    return lap;
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
      tap( race => this.store.dispatch( setSelectedRaces({ races: [race]} ))),
      tap( race => this.lapFacade.loadAll( race.id ))
    );
  }

  private resolveUnknownLap( race: Race ): Observable<Lap> {
    this.lapFacade.selectByKey( 1 );
    return this.lapFacade.retrieveSelectedLapFromStore();
  }

  private retrievePathParameterValue( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }
}
