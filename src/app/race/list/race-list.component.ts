import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Race } from '../domain/race';
import * as fromRaceReducer from '../common/race.reducer';
import { allRacesRequested, deleteRace, setSelectedRaces } from '../common/race.actions';
import { SelectionModel } from '@angular/cdk/collections';
import * as fromAppReducer from '../../app.reducer';
import { Observable } from 'rxjs';
import { SubscriptionService } from '../../shared/subscription.service';
import { routerGo } from '../../shared/router/router.actions';

@Component({
  selector: 'srm-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['select', 'title', 'fromDate', 'toDate', 'country', 'place', 'organizer', 'state'];
  dataSource = new MatTableDataSource<Race>();
  selection = new SelectionModel<Race>(true, []);
  isLoading: Observable<boolean>;

  constructor(
    private subscriptionService: SubscriptionService,
    private store: Store<fromRaceReducer.RaceManagementState>,
    private router: Router ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$.next();
  }

  ngOnInit() {
    this.dispatchAllEntitiesRequested();
    this.subscribeToRaces();
    this.subscribeToLoading();
  }

  onChangeSelection( row?: Race ) {
    this.dispatchSelectedEntities();
  }

  onRowClick( row: Race ) {
    const races = [row];
    this.store.dispatch( setSelectedRaces( { races }));
    this.store.dispatch( routerGo({ path: ['/race/' + row.id + '/details'] }));
  }

  // public accessors and mutators
  /** The label for the checkbox on the passed row */
  addRace() {
    this.store.dispatch( routerGo({ path: ['/race/new/details'] }));
  }

  checkboxLabel( row?: Race ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.title}`;
  }

  deleteRaces() {
    if ( this.selection.selected.length > 0 ) {
      for ( let i = 0, len = this.selection.selected.length; i < len; i++) {
        this.store.dispatch( deleteRace({ raceId: this.selection.selected[i].id }));
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

  registerToRace() {
    this.router.navigateByUrl( '/race/' + this.selection.selected[0].id + '/registrations' );
  }

  // protected, private helper methods
  private cancelSelections() {
    this.selection.clear();
  }

  protected dispatchAllEntitiesRequested() {
    this.store.dispatch( allRacesRequested() );
  }

  protected dispatchSelectedEntities() {
    this.store.dispatch( setSelectedRaces( { races: this.selection.selected }));
  }

  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }

  private subscribeToRaces() {
    this.store.select( fromRaceReducer.getRaces ).subscribe( ( races: Race[]) => {
      this.dataSource.data = races;
    });
  }
}
