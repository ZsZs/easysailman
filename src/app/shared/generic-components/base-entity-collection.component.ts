import { BaseEntityInterface } from '../firestore/base-entity.interface';
import { AfterViewInit, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SubscriptionService } from '../subscription.service';
import { Store } from '@ngrx/store';
import * as fromRaceReducer from '../../race/common/race.reducer';
import { FeatureDescriptor } from '../feature-descriptor';
import { routerGo } from '../router/router.actions';
import { tabIsActive, tabIsInActive } from '../ui/ui.actions';
import * as fromAppReducer from '../../app.reducer';

export abstract class BaseEntityCollectionComponent<T extends BaseEntityInterface> implements AfterViewInit, OnDestroy, OnInit {
  dataSource: Observable<T[]>;
  dataSourceSubscription: Subscription;
  isLoading: Observable<boolean>;

  constructor(
    protected router: Router,
    protected subscriptionService: SubscriptionService,
    protected store: Store<fromRaceReducer.RaceManagementState>,
    protected featureDescriptor: FeatureDescriptor ) {}

  // public accessors and mutators

  // life cycle hooks, event handling
  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    this.dataSourceSubscription.unsubscribe();
    this.subscriptionService.unsubscribeComponent$.next();
    this.store.dispatch( tabIsInActive( { tabName: this.featureDescriptor.tabName }));
  }

  ngOnInit() {
    this.store.dispatch( tabIsActive( { tabName: this.featureDescriptor.tabName }));
    this.dispatchAllEntitiesRequestedAction();
    this.dataSourceSubscription = this.subscribeToSourceData();
    this.subscribeToLoading();
  }

  // protected, private helper methods
  protected abstract detailsRoute( entityId: string ): string;
  protected abstract dispatchAllEntitiesRequestedAction();
  protected abstract dispatchDeleteEntityAction( entity: T );
  protected abstract dispatchSelectedEntitiesAction( entities: T[] );

  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }

  protected subscribeToSourceData(): Subscription {
    return this.store.select( this.featureDescriptor.allEntitiesSelector ).subscribe( ( data: Observable<T[]> ) => {
      this.dataSource = data;
    });
  }
}
