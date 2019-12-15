import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Race } from '../../domain/race';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../app.reducer';
import { getSelectedRaces } from '../../race.reducer';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'srm-race-execution-toolbar',
  templateUrl: './race-execution-toolbar.component.html',
  styleUrls: ['./race-execution-toolbar.component.css']
})

export class RaceExecutionToolbarComponent implements OnDestroy, OnInit {
  watcher: Subscription;
  activeMediaQuery = '';
//  selectedRaces: Observable<Race[]>;
  private readonly onDestroy = new Subject<void>();

  constructor( public mediaObserver: MediaObserver, private store: Store<fromAppReducer.AppState> ) {
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveSelectedRacesFromStore();
  }

  // protected, private helper methods
  retrieveSelectedRacesFromStore() {
//    this.selectedRaces = this.store.select( getSelectedRaces );
  }
}
