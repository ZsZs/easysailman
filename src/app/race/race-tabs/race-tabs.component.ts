import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Race } from '../race';
import { AuthService } from '../../authentication/auth.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../app.reducer';
import { getSelectedRaces } from '../race-management.reducer';
import { Router } from '@angular/router';
import { map, mergeMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'srm-race-tabs',
  templateUrl: './race-tabs.component.html',
  styleUrls: ['./race-tabs.component.css']
})
export class RaceTabsComponent implements OnDestroy, OnInit {
  selectedRaces: Observable<Race[]>;
  selectedRaceId: string;
  private readonly onDestroy = new Subject<void>();

  constructor( private authService: AuthService, private store: Store<fromAppReducer.AppState>, private router: Router ) {}

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveSelectedRacesFromStore();
    this.determineSelectedRaceId();
  }

  showDetails() {
    this.router.navigateByUrl( '/race/' + this.selectedRaceId + '/details' );
  }

  showRegistrations() {
    this.router.navigateByUrl( '/race/' + this.selectedRaceId + '/registrations' );
  }

  // protected, private helper methods
  determineSelectedRaceId() {
    this.selectedRaces.pipe( takeUntil( this.onDestroy )).subscribe( races => {
      if ( races.length > 0 ) {
        this.selectedRaceId = races[0].id;
      } else {
        this.selectedRaceId = undefined;
      }
    });
  }

  retrieveSelectedRacesFromStore() {
    this.selectedRaces = this.store.select( getSelectedRaces );
  }
}
