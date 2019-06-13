import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Race } from '../race';
import { RaceService } from '../race.service';
import * as fromRaceReducer from '../race-management.reducer';
import { DeletedRaceAction, NewRaceAction } from '../race-management.actions';
import { RaceManagementState } from '../race-management.reducer';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css']
})
export class RaceListComponent implements AfterViewInit, OnInit {
  @ViewChild( MatSort ) sort: MatSort;
  @ViewChild( MatPaginator ) paginator: MatPaginator;
  displayedColumns = ['fromDate', 'toDate', 'title', 'country', 'place', 'organizer', 'state'];
  dataSource = new MatTableDataSource<Race>();

  constructor( private raceService: RaceService, private store: Store<fromRaceReducer.RaceManagementState>, private router: Router ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.store.select( fromRaceReducer.getRaces ).subscribe( ( races: Race[]) => {
      this.dataSource.data = races;
    });
    this.raceService.fetchRaces();
  }

  doFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  newRace() {
    this.store.dispatch( new NewRaceAction());
    this.router.navigateByUrl( '/race/new-race' );
  }
}
