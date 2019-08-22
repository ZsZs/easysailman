import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Race } from '../race';
import { AuthService } from '../../authentication/auth.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../app.reducer';
import { getSelectedRaces } from '../race.reducer';

@Component({
  selector: 'srm-race-statusbar',
  templateUrl: './race-statusbar.component.html',
  styleUrls: ['./race-statusbar.component.css']
})
export class RaceStatusbarComponent implements OnInit {
  selectedRaces: Observable<Race[]>;

  constructor( private authService: AuthService, private store: Store<fromAppReducer.AppState> ) { }

  ngOnInit() {
    this.selectedRaces = this.store.select( getSelectedRaces );
  }
}
