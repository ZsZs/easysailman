import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { YachtClub } from '../yacht-club';
import { YachtClubService } from '../yacht-club.service';
import { getYachtClubs, YachtClubManagementState } from '../yacht-club.reducer';
import { allYachtClubsRequested, setSelectedYachtClubs } from '../yacht-club.actions';

@Component({
  selector: 'srm-yacht-club-list',
  templateUrl: './yacht-club-list.component.html',
  styleUrls: ['./yacht-club-list.component.css']
})
export class YachtClubListComponent implements AfterViewInit, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['select', 'name'];
  dataSource = new MatTableDataSource<YachtClub>();
  selection = new SelectionModel<YachtClub>(true, []);

  constructor( private yachtClubService: YachtClubService, private store: Store<YachtClubManagementState>, private router: Router ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.store.dispatch( allYachtClubsRequested() );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.store.select( getYachtClubs ).subscribe( ( yachtClubs: YachtClub[]) => {
      this.dataSource.data = yachtClubs;
    });
    this.yachtClubService.fetchAll();
  }

  onChangeSelection( row?: YachtClub ) {
    this.store.dispatch( setSelectedYachtClubs( { yachtClubs: this.selection.selected }));
  }

  onRowClick( row: YachtClub ) {
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
    console.log( 'implement delete yacht-club' );
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
    this.router.navigateByUrl( '/yacht-club/new-race/details' );
  }
}
