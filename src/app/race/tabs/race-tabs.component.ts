import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Race } from '../domain/race';
import { AuthService } from '../../authentication/auth.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../app.reducer';
import { getSelectedRaces } from '../race.reducer';
import { Router } from '@angular/router';
import { map, mergeMap, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { getActiveTabs } from '../../shared/ui/ui.reducer';
import { tabIsActive } from '../../shared/ui/ui.actions';
import { Registration } from '../domain/registration';
import { getSelectedRegistrations } from '../registration/registration.reducer';

@Component({
  selector: 'srm-race-tabs',
  templateUrl: './race-tabs.component.html',
  styleUrls: ['./race-tabs.component.css']
})
export class RaceTabsComponent implements OnDestroy, OnInit {
  activeTabs: Observable<string[]>;
  selectedRaces: Observable<Race[]>;
  selectedRegistrations: Observable<Registration[]>;
  selectedRaceId: string;
  private readonly onDestroy = new Subject<void>();

  constructor( private store: Store<fromAppReducer.AppState>, private router: Router ) {}

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveActiveTabsFromStore();
    this.retrieveSelectedRacesFromStore();
    this.determineSelectedRaceId();
  }

  showDetails() {
    this.router.navigateByUrl( '/race/' + this.selectedRaceId + '/details' );
  }

  showRegistrationDetails() {
    this.router.navigateByUrl( '/race/' + this.selectedRaceId + '/registration/1/details' );
  }

  showRegistrations() {
    this.router.navigateByUrl( '/race/' + this.selectedRaceId + '/registration/list' );
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

  retrieveActiveTabsFromStore() {
    this.activeTabs = this.store.select( getActiveTabs );
  }

  retrieveSelectedRacesFromStore() {
    this.selectedRaces = this.store.select( getSelectedRaces );
    this.selectedRegistrations = this.store.select( getSelectedRegistrations );
  }
}
