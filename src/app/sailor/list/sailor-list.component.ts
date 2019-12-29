import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import * as fromSailorReducer from '../../sailor/sailor.reducer';
import { Router } from '@angular/router';
import { Sailor } from '../sailor';
import { SailorService } from '../sailor.service';
import { allSailorsRequested, deleteSailor, setSelectedSailors } from '../sailor.actions';
import { Observable } from 'rxjs';
import { ComponentDestroyService } from '../../shared/component-destroy.service';
import * as fromBoatClassReducer from '../../boat-class/boat-class.reducer';
import { BoatClass } from '../../boat-class/boat-class';
import * as fromAppReducer from '../../app.reducer';
import { routerGo } from '../../shared/router/router.actions';
import { deleteBoatClass } from '../../boat-class/boat-class.actions';

@Component({
  selector: 'srm-sailor-list',
  templateUrl: './sailor-list.component.html',
  styleUrls: ['./sailor-list.component.css']
})
export class SailorListComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['select', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<Sailor>();
  selection = new SelectionModel<Sailor>(true, []);
  isLoading: Observable<boolean>;

  constructor( private subscriptionService: ComponentDestroyService, private store: Store<fromSailorReducer.SailorManagementState> ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$.next();
  }

  ngOnInit() {
    this.store.dispatch( allSailorsRequested() );
    this.subscribeToSailors();
    this.subscribeToLoading();
  }

  onChangeSelection( row?: Sailor ) {
    this.store.dispatch( setSelectedSailors({ sailors: this.selection.selected }));
  }

  onRowClick( row: Sailor ) {
    const sailors = [row];
    this.store.dispatch( setSelectedSailors( { sailors }));
    this.store.dispatch( routerGo({ path: ['/sailor/' + row.id + '/details'] }));
  }

  // public accessors and mutators
  /** The label for the checkbox on the passed row */
  addBoat() {
    this.store.dispatch( routerGo({ path: ['/sailor/' + this.selection.selected[0].id + '/addBoat'] }));
  }

  addSailor() {
    this.store.dispatch( routerGo({ path: ['/sailor/new/details']} ));
  }

  checkboxLabel( row?: Sailor ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.firstName + ' ' + row.lastName }`;
  }

  deactivateSailors() {
    if ( this.selection.selected.length > 0 ) {
      for ( let i = 0, len = this.selection.selected.length; i < len; i++) {
        this.store.dispatch( deleteSailor({ sailorId: this.selection.selected[i].id }));
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

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // protected, private helper methods
  private cancelSelections() {
    this.selection.clear();
  }

  private subscribeToSailors() {
    this.store.select( fromSailorReducer.getSailors ).subscribe( ( sailors: Sailor[]) => {
      this.dataSource.data = sailors;
    });
  }

  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
