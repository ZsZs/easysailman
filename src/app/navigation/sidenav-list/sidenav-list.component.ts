import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import * as fromAppReducer from '../../app.reducer';
import { Store } from '@ngrx/store';
import { getIsAuthenticated } from '../../authentication/auth.reducer';


@Component({
  selector: 'srm-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: Observable<boolean>;

  constructor( private authService: AuthService, private store: Store<fromAppReducer.AppState> ) { }

  ngOnInit() {
    this.isAuth = this.store.select( getIsAuthenticated );
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }
}
