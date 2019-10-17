import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Race } from '../../domain/race';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../app.reducer';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { getSelectedRaces } from '../../common/race.reducer';

@Component({
  selector: 'srm-race-execution-tabs',
  templateUrl: './race-execution-tabs.component.html',
  styleUrls: ['./race-execution-tabs.component.css']
})
export class RaceExecutionTabsComponent implements OnDestroy, OnInit {
  selectedRaces: Observable<Race[]>;
  selectedLapId = 1;
  selectedRaceId: string;
  private readonly onDestroy = new Subject<void>();

  constructor( private store: Store<fromAppReducer.AppState>, private router: Router ) {}

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveSelectedRacesFromStore();
    this.determineSelectedRaceId();
  }

  showField() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRaceId + '/lap/' + this.selectedLapId + '/field' );
  }

  showFinish() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRaceId + '/lap/' + this.selectedLapId + '/finish' );
  }

  showParticipants() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRaceId + '/lap/' + this.selectedLapId + '/participants' );
  }

  showResults() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRaceId + '/results' );
  }

  showStart() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRaceId + '/lap/' + this.selectedLapId + '/start' );
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
