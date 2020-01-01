import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Race } from '../../domain/race';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../app.reducer';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { getSelectedRaces } from '../../race.reducer';
import { Lap } from '../../domain/lap';
import { LapFacade } from '../../lap/lap.facade';
import { getActiveTabs } from '../../../shared/ui/ui.reducer';

@Component({
  selector: 'srm-race-execution-tabs',
  templateUrl: './race-execution-tabs.component.html',
  styleUrls: ['./race-execution-tabs.component.css']
})
export class RaceExecutionTabsComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() selectedLap: Lap;
  @Input() selectedRace: Race;
  activeTabs: Observable<string[]>;

  constructor( private store: Store<fromAppReducer.AppState>, private router: Router, private lapFacade: LapFacade) {}

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    console.log( 'Tabs: OnDestroy' );
  }

  ngOnInit() {
    console.log( 'Tabs: OnInit' );
    this.retrieveActiveTabsFromStore();
  }

  showField() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRace.id + '/lap/' + this.selectedLap.index + '/field' );
  }

  showFinish() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRace.id + '/lap/' + this.selectedLap.index + '/finish' );
  }

  showParticipants() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRace.id + '/lap/' + this.selectedLap.index + '/participants' );
  }

  showResults() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRace.id + '/results' );
  }

  showStart() {
    this.router.navigateByUrl( '/race-execution/' + this.selectedRace.id + '/lap/' + this.selectedLap.index + '/start' );
  }

  // protected, private helper methods
  retrieveActiveTabsFromStore() {
    this.activeTabs = this.store.select( getActiveTabs );
  }
}
