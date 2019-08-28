import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Race } from '../race';
import { RaceService } from '../race.service';
import * as fromRaceReducer from '../race.reducer';
import { RaceManagementState } from '../race.reducer';
import { allRacesRequested, newRace, setSelectedRaces } from '../race.actions';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from '../../authentication/auth.service';
import { UiService } from '../../shared/ui.service';
import * as fromAppReducer from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'srm-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements AfterViewInit, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['select', 'title', 'fromDate', 'toDate', 'country', 'place', 'organizer', 'state'];
  dataSource = new MatTableDataSource<Race>();
  selection = new SelectionModel<Race>(true, []);
  isLoading: Observable<boolean>;

  constructor( private uiService: UiService, private raceService: RaceService, private store: Store<fromRaceReducer.RaceManagementState>, private router: Router ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.store.dispatch( allRacesRequested() );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.subscribeToLoading();
    this.subscribeToRaces();
  }

  onChangeSelection( row?: Race ) {
    this.store.dispatch( setSelectedRaces( { races: this.selection.selected }));
  }

  onRowClick( row: Race ) {
    this.router.navigateByUrl( '/race/' + row.id + '/details' );
  }

  // public accessors and mutators
  /** The label for the checkbox on the passed row */
  checkboxLabel( row?: Race ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.title}`;
  }

  deleteRaces() {
    console.log( 'implement delete races' );
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

  newRace() {
    this.router.navigateByUrl( '/race/new-race/details' );
  }

  registerToRace() {
    this.router.navigateByUrl( '/race/' + this.selection.selected[0].id + '/registrations' );
  }

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }

  private subscribeToRaces() {
    this.store.select( fromRaceReducer.getRaces ).subscribe( ( races: Race[]) => {
      this.dataSource.data = races;
    });
    this.raceService.fetchRaces();
  }
}
