import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';

import * as fromAppReducer from '../app.reducer';
import { authenticateUser } from './auth.actions';
import { getIsAuthenticated } from './auth.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private store: Store<fromAppReducer.AppState>, private router: Router ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select( getIsAuthenticated ),
      tap( loggedIn => {
        if ( !loggedIn ) {
          this.store.dispatch( authenticateUser( { returnTo: state.url }) );
        } else {
          return true;
        }
      }));
  }

  canLoad( route: Route ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select( getIsAuthenticated ).pipe( take( 1 ));
  }
}
