import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { YachtClub } from '../../yacht-club/yacht-club';
import { AuthService } from '../../authentication/auth.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../app.reducer';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { getSelectedBoatClasses } from '../boat-class.reducer';

@Component({
  selector: 'srm-boat-class-tabs',
  templateUrl: './boat-class-tabs.component.html',
  styleUrls: ['./boat-class-tabs.component.css']
})
export class BoatClassTabsComponent implements OnDestroy, OnInit {
  selectedBoatClasses: Observable<YachtClub[]>;
  selectedBoatClassId: string;
  private readonly onDestroy = new Subject<void>();

  constructor( private store: Store<fromAppReducer.AppState>, private router: Router ) {}

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngOnInit() {
    this.retrieveSelectedBoatClassesFromStore();
    this.determineSelectedBoatClassId();
  }

  showDetails() {
    this.router.navigateByUrl( '/boat-class/' + this.selectedBoatClassId + '/details' );
  }

  // protected, private helper methods
  determineSelectedBoatClassId() {
    this.selectedBoatClasses.pipe( takeUntil( this.onDestroy )).subscribe( boatClasses => {
      if ( boatClasses.length > 0 ) {
        this.selectedBoatClassId = boatClasses[0].id;
      } else {
        this.selectedBoatClassId = undefined;
      }
    });
  }

  retrieveSelectedBoatClassesFromStore() {
    this.selectedBoatClasses = this.store.select( getSelectedBoatClasses );
  }
}
