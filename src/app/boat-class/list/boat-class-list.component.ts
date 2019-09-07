import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { SubscriptionService } from '../../shared/subscription.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromBoatClassReducer from '../boat-class.reducer';
import * as fromAppReducer from '../../app.reducer';
import { BoatClass } from '../boat-class';
import { allBoatClassesRequested, deleteBoatClass, setSelectedBoatClasses } from '../boat-class.actions';

@Component({
  selector: 'srm-boat-class-list',
  templateUrl: './boat-class-list.component.html',
  styleUrls: ['./boat-class-list.component.css']
})
export class BoatClassListComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['select', 'name', 'yardstick'];
  dataSource = new MatTableDataSource<BoatClass>();
  selection = new SelectionModel<BoatClass>(true, []);
  isLoading: Observable<boolean>;

  constructor( private subscriptionService: SubscriptionService, private store: Store<fromBoatClassReducer.BoatClassManagementState>, private router: Router ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$.next();
  }

  ngOnInit() {
    this.store.dispatch( allBoatClassesRequested() );
    this.subscribeToBoatClasses();
    this.subscribeToLoading();
  }

  onChangeSelection( row?: BoatClass ) {
    this.store.dispatch( setSelectedBoatClasses( { boatClasses: this.selection.selected }));
  }

  onRowClick( row: BoatClass ) {
    const boatClasses = [row];
    this.store.dispatch( setSelectedBoatClasses( { boatClasses }));
    this.router.navigateByUrl( '/boat-class/' + row.id + '/details' );
  }

  // public accessors and mutators
  /** The label for the checkbox on the passed row */
  checkboxLabel( row?: BoatClass ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.name}`;
  }

  deleteBoatClasses() {
    if ( this.selection.selected.length > 0 ) {
      for ( let i = 0, len = this.selection.selected.length; i < len; i++) {
        this.store.dispatch( deleteBoatClass({ boatClassId: this.selection.selected[i].id }));
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
      this.cancelSelections() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  newBoatClass() {
    this.router.navigateByUrl( '/boat-class/new/details' );
  }

  // protected, private helper methods
  private cancelSelections() {
    this.selection.clear();
  }

  private subscribeToBoatClasses() {
    this.store.select( fromBoatClassReducer.getBoatClasses ).subscribe( ( boatClasses: BoatClass[]) => {
      this.dataSource.data = boatClasses;
    });
  }

  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
