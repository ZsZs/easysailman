import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Race } from '../common/race';
import { AuthService } from '../../authentication/auth.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../app.reducer';
import { getSelectedRaces } from '../common/race.reducer';

@Component({
  selector: 'srm-race-statusbar',
  templateUrl: './race-statusbar.component.html',
  styleUrls: ['./race-statusbar.component.css']
})
export class RaceStatusbarComponent implements OnDestroy, OnInit {
  selectedRaces: Observable<Race[]>;
  private readonly onDestroy = new Subject<void>();

  constructor( private authService: AuthService, private store: Store<fromAppReducer.AppState> ) { }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveSelectedRacesFromStore();
  }

  // protected, private helper methods
  retrieveSelectedRacesFromStore() {
    this.selectedRaces = this.store.select( getSelectedRaces );
  }
}
