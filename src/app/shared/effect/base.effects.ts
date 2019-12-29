import { BaseEntityInterface } from '../firestore/base-entity.interface';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { ComponentDestroyService } from '../component-destroy.service';
import { Action, createAction, createFeatureSelector, createSelector, props, select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { FirestoreBaseService } from '../firestore/firestore-base.service';
import { RouterUri } from '../router/router-uri';
import { of } from 'rxjs';
import { startLoading, stopLoading } from '../ui/ui.actions';
import { routerGo } from '../router/router.actions';
import { RaceManagementState } from '../../race/race.reducer';
import { addEntity, allEntitiesLoaded, allEntitiesRequested, deleteEntity, entityAPIError, entityDeleted, entityLoaded, entityRequested, entitySaved, updateEntity } from './base.actions';

@Injectable()
export abstract class BaseEffects<T extends BaseEntityInterface, S extends FirestoreBaseService<T>> {
/*
  static allEntitiesRequested;
  static allEntitiesLoaded;
  static entityRequested;
  static entityLoaded;
  static editEntity;
  static newEntity;
  static deleteEntity;
  static entityDeleted;
  static addEntity;
  static addOrUpdateEntity;
  static updateEntity;
  static entitySaved;
  static setSelectedEntities;
  static entityAPIError;
*/
  protected constructor(
    protected actions$: Actions,
    protected entityService: S,
    protected subscriptionService: ComponentDestroyService,
    protected store: Store<AppState>,
    protected router: Router,
    protected featureName: string ) {}

  addEntity$ = createEffect(() => this.actions$.pipe(
    ofType( addEntity ),
    filter( action => action.entity.id === undefined ),
    switchMap( action => this.entityService.add( action.entity ).pipe(
      map( ( entity ) => entitySaved({ entity, redirectTo: action.redirectTo })),
      catchError( error => of( entityAPIError({error} )))
    ))
  ));

  deleteEntity$ = createEffect( () => this.actions$.pipe(
    ofType( deleteEntity ),
    tap( () => this.store.dispatch( startLoading() )),
    tap( action => this.entityService.delete( action.entityId )),
    map( action => entityDeleted({ redirectTo: action.redirectTo }))
  ));

  loadEntity$ = createEffect( () => this.actions$.pipe(
    ofType( entityRequested ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.entityService.findById( action.entityId ).pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( entity => entityLoaded({ entity })),
      catchError( error => of( entityAPIError({ error })))
    ))
  ));

  loadAllEntities$ = createEffect( () => this.actions$.pipe(
    ofType( allEntitiesRequested ),
    withLatestFrom( this.store.pipe( select( this.getAllEntitiesLoaded() ))),
    // tslint:disable-next-line:no-shadowed-variable
    filter(([action, allEntitiesLoaded]) => !allEntitiesLoaded ),
    tap( () => this.store.dispatch( startLoading() )),
    switchMap( action => this.entityService.findAll().pipe(
      takeUntil( this.subscriptionService.unsubscribe$ ),
      map( entities => allEntitiesLoaded({ entities })),
      catchError( error => of( entityAPIError({ error })))
    )),
  ));

  stopLoading$ = createEffect( () => this.actions$.pipe(
    ofType( allEntitiesLoaded, entityLoaded, entityDeleted, entitySaved ),
    tap( () => this.store.dispatch( stopLoading() )),
    map( action => action.redirectTo ),
    filter( redirectTo => redirectTo !== undefined ),
    tap( redirectTo => this.store.dispatch( routerGo( redirectTo )))
    ),
    {dispatch: false}
  );

  updateEntity$ = createEffect( () => this.actions$.pipe(
    ofType( updateEntity ),
    filter( action => action.entity.id !== undefined ),
    switchMap( action => this.entityService.update( action.entity ).pipe(
      map( ( entity ) => entitySaved({ entity, redirectTo: action.redirectTo })),
      catchError( error => of( entityAPIError({error} )))
    ))
  ));

  // protected, private helper methods
    private getEntityManagementState() {
      return createFeatureSelector<RaceManagementState>('raceManagement');
    }

    private getAllEntitiesLoaded() {
      return createSelector( this.getEntityManagementState(), state => state.race.allRacesLoaded );
    }
/*
      private createActions( featureName: string ) {
        BaseEffects.allEntitiesRequested = createAction(`[${featureName}] All entities requested` );
        BaseEffects.allEntitiesLoaded = createAction(`[${featureName}] All entities loaded`, props<{ boatClasses: T[], redirectTo?: RouterUri}>() );
        BaseEffects.entityRequested = createAction(`[${featureName}] Entity requested`, props<{ entityId: string }>() );
        BaseEffects.entityLoaded = createAction(`[${featureName}] Entity loaded`, props<{ entity: T, redirectTo?: RouterUri }>() );
        BaseEffects.editEntity = createAction(`[${featureName}] Edit entity`, props<{ entity: T }>() );
        BaseEffects.newEntity = createAction(`[${featureName}] New entity`, props<{ entity: T }>() );
        BaseEffects.deleteEntity = createAction(`[${featureName}] Delete entity`, props<{ entityId: string, redirectTo?: RouterUri }>() );
        BaseEffects.entityDeleted = createAction(`[${featureName}] Entity deleted`, props<{ redirectTo?: RouterUri }>());
        BaseEffects.addEntity = createAction(`[${featureName}] Add entity`, props<{ entity: T, redirectTo?: RouterUri }>() );
        BaseEffects.addOrUpdateEntity = createAction(`[${featureName}] Add or update entity`, props<{ entity: T, redirectTo?: RouterUri }>() );
        BaseEffects.updateEntity = createAction(`[${featureName}] Update entity`, props<{ entity: T, redirectTo?: RouterUri }>() );
        BaseEffects.entitySaved = createAction(`[${featureName}] Entity saved`, props<{ entity: T, redirectTo?: RouterUri }>() );
        BaseEffects.setSelectedEntities = createAction(`[${featureName}] Entities selected`, props<{ entities: T[] }>() );
        BaseEffects.entityAPIError = createAction(`[${featureName}] Entity API error`, props<{ error: string, redirectTo?: RouterUri }>() );
      }
    */
}
