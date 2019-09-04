import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../app.reducer';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { YachtClub } from '../yacht-club';
import { getSelectedYachtClubs } from '../yacht-club.reducer';

@Component({
  selector: 'srm-yacht-club-tabs',
  templateUrl: './yacht-club-tabs.component.html',
  styleUrls: ['./yacht-club-tabs.component.css']
})
export class YachtClubTabsComponent implements OnDestroy, OnInit {
  selectedYachtClubs: Observable<YachtClub[]>;
  selectedYachtClubId: string;
  private readonly onDestroy = new Subject<void>();

  constructor( private store: Store<fromAppReducer.AppState>, private router: Router ) {}

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveSelectedYachtClubsFromStore();
    this.determineSelectedYachtClubId();
  }

  showDetails() {
    this.router.navigateByUrl( '/yacht-club/' + this.selectedYachtClubId + '/details' );
  }

  // protected, private helper methods
  determineSelectedYachtClubId() {
    this.selectedYachtClubs.pipe( takeUntil( this.onDestroy )).subscribe( yachtClubs => {
      if ( yachtClubs.length > 0 ) {
        this.selectedYachtClubId = yachtClubs[0].id;
      } else {
        this.selectedYachtClubId = undefined;
      }
    });
  }

  retrieveSelectedYachtClubsFromStore() {
    this.selectedYachtClubs = this.store.select( getSelectedYachtClubs );
  }
}
