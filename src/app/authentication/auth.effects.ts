import { Actions, Effect, ofType } from '@ngrx/effects';
import { RaceService } from '../race/race.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { authenticateUser, setAuthenticated } from './auth.actions';
import { filter, map, mergeMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { getRedirectTo } from './auth.reducer';

@Injectable()
export class AuthEffects {
  @Effect({dispatch: false}) authenticateUser = this.actions$.pipe(
    ofType( authenticateUser ),
    tap( action => {
        this.router.navigate( ['/login'] );
    }));

  @Effect({dispatch: false}) setAuthenticated = this.actions$.pipe(
    ofType( setAuthenticated ),
    tap( action => {
      this.store.select( getRedirectTo ).pipe( take( 1 )).subscribe( redirectTo => {
        if ( redirectTo ) {
          this.router.navigateByUrl( redirectTo );
        }
      });
    }));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}
}
