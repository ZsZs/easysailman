import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Race } from '../race';
import { RaceService } from '../race.service';
import * as fromRaceReducer from '../race-management.reducer';
import { RaceManagementState } from '../race-management.reducer';
import { allRacesRequested, newRace } from '../race-management.actions';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements AfterViewInit, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['select', 'title', 'fromDate', 'toDate', 'country', 'place', 'organizer', 'state'];
  dataSource = new MatTableDataSource<Race>();
  selection = new SelectionModel<Race>(true, []);

  constructor( private raceService: RaceService, private store: Store<fromRaceReducer.RaceManagementState>, private router: Router ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.store.dispatch( allRacesRequested() );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.store.select( fromRaceReducer.getRaces ).subscribe( ( races: Race[]) => {
      this.dataSource.data = races;
    });
    this.raceService.fetchRaces();
  }

  onRowClick( row: Race ) {
    this.router.navigateByUrl( '/race/' + row.id );
  }

  doFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  newRace() {
    this.router.navigateByUrl( '/race/new-race' );
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

  /** The label for the checkbox on the passed row */
  checkboxLabel( row?: Race ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.title}`;
  }}
