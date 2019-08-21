import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../app.reducer';
import { getIsAuthenticated } from '../authentication/auth.reducer';
import { getSelectedRaces } from './race-management.reducer';
import { Race } from './race';

@Component({
  selector: 'srm-race-management',
  templateUrl: './race-management.component.html',
  styleUrls: ['./race-management.component.css']
})
export class RaceManagementComponent implements OnInit {

  constructor( private authService: AuthService, private store: Store<fromAppReducer.AppState> ) { }

  ngOnInit() {
  }

}
