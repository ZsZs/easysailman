import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import * as fromSailorReducer from '../../sailor/sailor.reducer';
import { Router } from '@angular/router';
import { Sailor } from '../sailor';
import { SailorService } from '../sailor.service';
import { allSailorsRequested, setSelectedSailors } from '../sailor.actions';

@Component({
  selector: 'srm-sailor-list',
  templateUrl: './sailor-list.component.html',
  styleUrls: ['./sailor-list.component.css']
})
export class SailorListComponent implements AfterViewInit, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['select', 'firstName', 'lastName'];
  dataSource = new MatTableDataSource<Sailor>();
  selection = new SelectionModel<Sailor>(true, []);

  constructor( private sailorService: SailorService, private store: Store<fromSailorReducer.SailorManagementState>, private router: Router ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.store.dispatch( allSailorsRequested() );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.store.select( fromSailorReducer.getSailors ).subscribe( ( sailors: Sailor[]) => {
      this.dataSource.data = sailors;
    });
    this.sailorService.fetchSailors();
  }

  onChangeSelection( row?: Sailor ) {
    this.store.dispatch( setSelectedSailors( { sailors: this.selection.selected }));
  }

  onRowClick( row: Sailor ) {
    this.router.navigateByUrl( '/sailor/' + row.id + '/details' );
  }

  // public accessors and mutators
  /** The label for the checkbox on the passed row */
  addBoat() {
    this.router.navigateByUrl( '/sailor/' + this.selection.selected[0].id + '/addBoat' );
  }

  addSailor() {
    this.router.navigateByUrl( '/sailor/new-sailor/details' );
  }

  checkboxLabel( row?: Sailor ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.firstName + ' ' + row.lastName }`;
  }

  deactivateSailors() {
    console.log( 'implement delete sailors' );
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
}
