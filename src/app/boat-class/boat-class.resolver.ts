import { Injectable } from '@angular/core';
import { BoatClass } from './boat-class';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { boatClassRequested, editBoatClass, newBoatClass } from './boat-class.actions';
import { getBoatClassById } from './boat-class.reducer';

@Injectable() export class BoatClassResolver implements Resolve<BoatClass> {

  constructor( private store: Store<AppState> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<BoatClass> {
    const idParam = 'id';
    const boatClassId = route.params[ idParam ];
    if ( boatClassId === 'new' ) {
      const boatClass: BoatClass = {
        id: undefined,
        name: '',
        yardstick: undefined
      };
      this.store.dispatch( newBoatClass( { boatClass } ) );
      this.store.dispatch( editBoatClass( { boatClass } ) );
    } else {
      return this.store.pipe(
        select( getBoatClassById( boatClassId ) ),
        tap( boatClass => {
          if ( !boatClass ) {
            this.store.dispatch( boatClassRequested( { boatClassId } ) );
          }
        } ),
        filter( boatClass => !!boatClass ),
        first(),
        tap( boatClass => this.store.dispatch( editBoatClass( { boatClass } ) ) )
      );
    }
  }
}
