import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromAppReducer from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private store: Store<fromAppReducer.AppState> ) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select( fromAppReducer.getIsAuthenticated ).pipe( take( 1 ));
  }

  canLoad( route: Route ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select( fromAppReducer.getIsAuthenticated ).pipe( take( 1 ));
  }
}
