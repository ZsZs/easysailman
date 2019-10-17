import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SubscriptionService } from '../../../shared/subscription.service';
import { Store } from '@ngrx/store';
import * as fromRaceReducer from '../race.reducer';
import { Router } from '@angular/router';
import { allRacesRequested, setSelectedRaces } from '../race.actions';
import * as fromAppReducer from '../../../app.reducer';
import { Race } from '../../domain/race';
import { Observable } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'srm-race-select',
  templateUrl: './race-select.component.html',
  styleUrls: ['./race-select.component.css']
})

export class RaceSelectComponent implements AfterViewInit, OnDestroy, OnInit {
  @ViewChild( MatSort, {static: false} ) sort: MatSort;
  @ViewChild( MatPaginator, {static: false} ) paginator: MatPaginator;
  displayedColumns = ['title', 'date', 'country', 'place'];
  dataSource = new MatTableDataSource<Race>();
  isLoading: Observable<boolean>;

  constructor(
    public dialogRef: MatDialogRef<RaceSelectComponent>,
    private subscriptionService: SubscriptionService,
    private store: Store<fromRaceReducer.RaceManagementState>,
    private router: Router
  ) {}

  // event handling methods
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$.next();
  }

  ngOnInit() {
    this.store.dispatch( allRacesRequested() );
    this.subscribeToRaces();
    this.subscribeToLoading();
  }

  onCancel(): void {
    this.dialogRef.close();
    this.router.navigateByUrl( '/' );
  }

  onRowClick( row: Race ) {
    const races = [row];
    this.store.dispatch( setSelectedRaces( { races }));
    this.dialogRef.close();
  }

  // action methods
  doFilter( filterValue: string ) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }


  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }

  private subscribeToRaces() {
    this.store.select( fromRaceReducer.getRaces ).subscribe( ( races: Race[]) => {
      this.dataSource.data = races;
    });
  }
}
