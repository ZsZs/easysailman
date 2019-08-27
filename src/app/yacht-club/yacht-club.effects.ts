import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { allYachtClubsLoaded, allYachtClubsRequested, changedYachtClub, saveYachtClub, yachtClubLoaded, yachtClubRequested } from './yacht-club.actions';
import { getAllYachtClubsLoaded } from './yacht-club.reducer';
import { YachtClubService } from './yacht-club.service';

@Injectable()
export class YachtClubEffects {

  @Effect() loadYachtClub = this.actions$.pipe(
    ofType( yachtClubRequested ),
    mergeMap( action => {
      return this.yachtClubService.findById( action.yachtClubId );
    }),
    map( yachtClub => yachtClubLoaded({ yachtClub }))
  );

  @Effect() loadAllYachtClubs = this.actions$.pipe(
    ofType( allYachtClubsRequested ),
    withLatestFrom( this.store.pipe( select( getAllYachtClubsLoaded ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allYachtClubsLoaded]) => !allYachtClubsLoaded ),
    mergeMap( action => this.yachtClubService.fetchAll() ),
    map( yachtClubs => allYachtClubsLoaded({ yachtClubs }))
  );

  @Effect() saveYachtClub = this.actions$.pipe(
    ofType( saveYachtClub ),
    mergeMap( action => this.yachtClubService.saveOrUpdate( action.yachtClub )),
    map( yachtClub => changedYachtClub( { yachtClub }))
  );

  constructor( private actions$: Actions, private yachtClubService: YachtClubService, private store: Store<AppState>) {}
}
