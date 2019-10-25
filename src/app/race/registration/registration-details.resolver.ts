import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { PathVariables } from '../path-variables';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { empty, Observable, of } from 'rxjs';

import { raceRequested, setSelectedRaces } from '../race.actions';
import { INITIAL_REGISTRATION_VALUE, Registration } from '../domain/registration';
import { getRaceById } from '../race.reducer';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { Race } from '../domain/race';
import { allRegistrationsRequested, editRegistration, newRegistration } from './registration.actions';
import { getRegistrationById } from './registration.reducer';

@Injectable()
export class RegistrationDetailsResolver implements Resolve<Registration> {
  private route: ActivatedRouteSnapshot;

  constructor( protected store: Store<AppState> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Registration> {
    this.route = route;
    return this.resolveRace().pipe(
      switchMap( race => this.resolveRegistration( race ))
    );
  }

  // protected, private helper methods
  private resolveRace(): Observable<Race> {
    const raceId = this.resolveParameter( this.route, PathVariables.raceID );
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
      tap( race => this.store.dispatch( allRegistrationsRequested({ raceId: race.id })))
    );
  }

  private resolveExistingRegistration(): Observable<Registration> {
    const registrationId = this.resolveParameter( this.route, PathVariables.registrationID );
    return this.store.pipe(
      select( getRegistrationById( registrationId ) ),
      filter( registration => !!registration ),
      first(),
      tap( registration => {
        return this.store.dispatch( editRegistration({ registration } ));
      }),
      map( registration => {
        return registration;
      })
    );
  }

  private resolveNewRegistration( race: Race ): Observable<Registration> {
    const registration: Registration = {... INITIAL_REGISTRATION_VALUE, raceId: race.id } ;
    this.store.dispatch( newRegistration( { registration }));
    this.store.dispatch( editRegistration( { registration }));
    return of( registration );
  }

  private resolveRegistration( race: Race): Observable<Registration> {
    const registrationId = this.resolveParameter( this.route, PathVariables.registrationID );
    let registration: Observable<Registration>;
    if ( registrationId === 'new' ) {
      registration = this.resolveNewRegistration( race );
    } else {
      registration = this.resolveExistingRegistration();
    }
    return registration;
  }

  private resolveParameter( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }
}
