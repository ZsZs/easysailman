import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ComponentDestroyService } from '../component-destroy.service';
import { Store } from '@ngrx/store';
import * as fromRaceReducer from '../../race/race.reducer';
import * as fromAppReducer from '../../app.reducer';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { routerGo } from '../router/router.actions';
import { FeatureDescriptor } from '../feature-descriptor';
import { BaseEntityInterface } from '../firestore/base-entity.interface';
import { tabIsActive, tabIsInActive } from '../ui/ui.actions';

export abstract class BaseListComponent<T extends BaseEntityInterface> implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  dataSource = new MatTableDataSource<T>();
  dataSourceSubscription: Subscription;
  selection = new SelectionModel<T>(true, []);
  isLoading: Observable<boolean>;

  constructor(
    protected router: Router,
    protected subscriptionService: ComponentDestroyService,
    protected store: Store<fromRaceReducer.RaceManagementState>,
    protected featureDescriptor: FeatureDescriptor ) {}

  // public accessors and mutators
  addEntity() {
    this.store.dispatch( routerGo({ path: [this.detailsRoute( 'new' )] }));
  }

  checkboxLabel( row?: T ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.id }`;
  }

  deleteEntities() {
    if ( this.selection.selected.length > 0 ) {
      for ( let i = 0, len = this.selection.selected.length; i < len; i++) {
        this.dispatchDeleteEntityAction( this.selection.selected[i] );
      }

      this.selection.clear();
    }
  }

  doFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.cancelSelections() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // life cycle hooks, event handling
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

  onChangeSelection( row?: T ) {
    const entities = [row];
    this.dispatchSelectedEntitiesAction( entities );
  }

  onRowClick( row: T ) {
    const entities = [row];
    this.dispatchSelectedEntitiesAction( entities );
    this.store.dispatch( routerGo({ path: [this.detailsRoute( row.id )] }));
  }

  // protected, private helper methods
  private cancelSelections() {
    this.selection.clear();
  }

  protected abstract detailsRoute( entityId: string ): string;
  protected abstract dispatchAllEntitiesRequestedAction();
  protected abstract dispatchDeleteEntityAction( entity: T );
  protected abstract dispatchSelectedEntitiesAction( entities: T[] );

  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }

  protected subscribeToSourceData(): Subscription {
    return this.store.select( this.featureDescriptor.allEntitiesSelector ).subscribe( ( data: T[] ) => {
      this.dataSource.data = data;
    });
  }
}
