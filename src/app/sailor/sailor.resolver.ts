import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Observable } from 'rxjs';
import { getRaceById } from '../race/common/race.reducer';
import { filter, first, tap } from 'rxjs/operators';
import { Sailor } from './sailor';
import { editSailor, newSailor, sailorRequested } from './sailor.actions';
import { getSailorById } from './sailor.reducer';

@Injectable()
export class SailorResolver implements Resolve<Sailor> {

  constructor( private store: Store<AppState> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<Sailor> {
    const idParam = 'id';
    const id = route.params[ idParam ];
    if ( id === 'new-sailor' ) {
      const sailor: Sailor = {
        id: undefined,
        firstName: '',
        lastName: ''
      };
      this.store.dispatch( newSailor( { sailor } ) );
      this.store.dispatch( editSailor( { sailor } ) );
    } else {
      return this.store.pipe(
        select( getSailorById( id ) ),
        tap( sailor => {
          if ( !sailor ) {
            this.store.dispatch( sailorRequested( { sailorId: id } ) );
          }
        } ),
        filter( sailor => !!sailor ),
        first(),
        tap( sailor => this.store.dispatch( editSailor( { sailor } ) ) )
      );
    }
  }
}
