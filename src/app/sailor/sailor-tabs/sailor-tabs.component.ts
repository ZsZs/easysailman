import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../app.reducer';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Sailor } from '../sailor';
import { getSelectedSailors } from '../sailor.reducer';

@Component({
  selector: 'srm-sailor-tabs',
  templateUrl: './sailor-tabs.component.html',
  styleUrls: ['./sailor-tabs.component.css']
})
export class SailorTabsComponent implements OnDestroy, OnInit {
  selectedSailors: Observable<Sailor[]>;
  selectedSailorId: string;
  private readonly onDestroy = new Subject<void>();

  constructor( private authService: AuthService, private store: Store<fromAppReducer.AppState>, private router: Router ) {}

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveSelectedSailorsFromStore();
    this.determineSelectedSailorId();
  }

  showDetails() {
    this.router.navigateByUrl( '/sailor/' + this.selectedSailorId + '/details' );
  }

  showRegistrations() {
    this.router.navigateByUrl( '/sailor/' + this.selectedSailorId + '/addBoat' );
  }

  // protected, private helper methods
  determineSelectedSailorId() {
    this.selectedSailors.pipe( takeUntil( this.onDestroy )).subscribe( sailors => {
      if ( sailors.length > 0 ) {
        this.selectedSailorId = sailors[0].id;
      } else {
        this.selectedSailorId = undefined;
      }
    });
  }

  retrieveSelectedSailorsFromStore() {
    this.selectedSailors = this.store.select( getSelectedSailors );
  }
}
