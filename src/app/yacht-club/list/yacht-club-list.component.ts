import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { YachtClub } from '../yacht-club';
import { getYachtClubs, YachtClubManagementState } from '../yacht-club.reducer';
import { allYachtClubsRequested, deleteYachtClub, setSelectedYachtClubs } from '../yacht-club.actions';
import { ComponentDestroyService } from '../../shared/component-destroy.service';
import * as fromAppReducer from '../../app.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'srm-yacht-club-list',
  templateUrl: './yacht-club-list.component.html',
  styleUrls: ['./yacht-club-list.component.css']
})
export class YachtClubListComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['select', 'name'];
  dataSource = new MatTableDataSource<YachtClub>();
  selection = new SelectionModel<YachtClub>(true, []);
  isLoading: Observable<boolean>;

  constructor(
    private subscriptionService: ComponentDestroyService,
    private store: Store<YachtClubManagementState>,
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
    this.store.dispatch( allYachtClubsRequested({}) );
    this.subscribeToYachtClubs();
    this.subscribeToLoading();
  }

  onChangeSelection( row?: YachtClub ) {
    this.store.dispatch( setSelectedYachtClubs( { yachtClubs: this.selection.selected }));
  }

  onRowClick( row: YachtClub ) {
    const yachtClubs = [row];
    this.store.dispatch( setSelectedYachtClubs({ yachtClubs }));
    this.router.navigateByUrl( '/yacht-club/' + row.id + '/details' );
  }

  // public accessors and mutators
  /** The label for the checkbox on the passed row */
  checkboxLabel( row?: YachtClub ): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.name}`;
  }

  deleteOrganizations() {
    if ( this.selection.selected.length > 0 ) {
      for ( let i = 0, len = this.selection.selected.length; i < len; i++) {
        this.store.dispatch( deleteYachtClub({ yachtClubId: this.selection.selected[i].id }));
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

  newOrganization() {
    this.router.navigateByUrl( '/yacht-club/new/details' );
  }

  // protected, private helper methods
  private cancelSelections() {
    this.selection.clear();
  }

  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }

  private subscribeToYachtClubs() {
    this.store.select( getYachtClubs ).subscribe( ( yachtClubs: YachtClub[]) => {
      this.dataSource.data = yachtClubs;
    });
  }
}
