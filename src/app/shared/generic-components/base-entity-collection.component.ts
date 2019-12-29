import { BaseEntityInterface } from '../firestore/base-entity.interface';
import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EMPTY, Observable, of, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ComponentDestroyService } from '../component-destroy.service';
import { Store } from '@ngrx/store';
import * as fromRaceReducer from '../../race/race.reducer';
import { FeatureDescriptor } from '../feature-descriptor';
import { routerGo } from '../router/router.actions';
import { tabIsActive, tabIsInActive } from '../ui/ui.actions';
import * as fromAppReducer from '../../app.reducer';
import { take } from 'rxjs/operators';

export abstract class BaseEntityCollectionComponent<T extends BaseEntityInterface> implements AfterViewInit, OnDestroy, OnInit {
  dataSource: Observable<T[]>;
  isLoading: Observable<boolean>;
  subscriptions: Subscription[] = [];

  constructor(
    protected router: Router,
    protected subscriptionService: ComponentDestroyService,
    protected store: Store<fromRaceReducer.RaceManagementState>,
    protected featureDescriptor: FeatureDescriptor ) {}

  // public accessors and mutators

  // life cycle hooks, event handling
  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe() );
    this.subscriptionService.unsubscribeComponent$.next();
    this.store.dispatch( tabIsInActive( { tabName: this.featureDescriptor.tabName }));
  }

  ngOnInit() {
    this.dataSource = of( [] );
    this.store.dispatch( tabIsActive( { tabName: this.featureDescriptor.tabName }));
    this.subscriptions.push( this.dispatchAllEntitiesRequestedAction().subscribe() );
    this.subscriptions.push( this.subscribeToSourceData() );
    this.subscribeToLoading();
  }

  // protected, private helper methods
  protected abstract dispatchAllEntitiesRequestedAction(): Observable<any>;
  protected abstract dispatchSelectedEntitiesAction( entities: T[] );

  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }

  protected subscribeToSourceData(): Subscription {
    if ( this.featureDescriptor.allEntitiesSelector ) {
      return this.store.select( this.featureDescriptor.allEntitiesSelector.call() ).subscribe( ( data: Observable<T[]> ) => {
        this.dataSource = data;
      });
    }
  }
}
