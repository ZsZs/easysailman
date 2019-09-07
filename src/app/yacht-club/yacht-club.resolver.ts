import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { YachtClub } from './yacht-club';
import { editYachtClub, newYachtClub, yachtClubRequested } from './yacht-club.actions';
import { getYachtClubById } from './yacht-club.reducer';

@Injectable()
export class YachtClubResolver implements Resolve<YachtClub> {

  constructor( private store: Store<AppState> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<YachtClub> {
    const idParam = 'id';
    const yachtClubId = route.params[ idParam ];
    if ( yachtClubId === 'new' ) {
      const yachtClub: YachtClub = {
        id: undefined,
        name: ''
      };
      this.store.dispatch( newYachtClub( { yachtClub } ) );
      this.store.dispatch( editYachtClub( { yachtClub } ) );
    } else {
      return this.store.pipe(
        select( getYachtClubById( yachtClubId ) ),
        tap( yachtClub => {
          if ( !yachtClub ) {
            this.store.dispatch( yachtClubRequested( { yachtClubId } ) );
          }
        } ),
        filter( yachtClub => !!yachtClub ),
        first(),
        tap( yachtClub => this.store.dispatch( editYachtClub( { yachtClub } ) ) )
      );
    }
  }
}
