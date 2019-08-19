import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../authentication/auth.service';
import * as fromAppReducer from '../../app.reducer';
import { getIsAuthenticated } from '../../authentication/auth.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth: Observable<boolean>;

  constructor( private authService: AuthService, private store: Store<fromAppReducer.AppState> ) { }

  ngOnInit() {
    this.isAuth = this.store.select( getIsAuthenticated );
  }

  onLogout() {
    this.authService.logout();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
