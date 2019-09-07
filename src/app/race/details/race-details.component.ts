import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';

import * as fromAppReducer from '../../app.reducer';
import * as fromRaceReducer from '../common/race.reducer';
import { Race } from '../common/race';
import { map, take, tap } from 'rxjs/operators';
import { RaceIdResolver } from '../common/race-id.resolver';
import { addRace, setSelectedRaces, updateRace } from '../common/race.actions';
import { SubscriptionService } from '../../shared/subscription.service';
import { routerGo } from '../../shared/router/router.actions';
import { addSailor, setSelectedSailors, updateSailor } from '../../sailor/sailor.actions';

@Component({
  selector: 'srm-race-details',
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceDetailsComponent implements OnDestroy, OnInit {
  formState$: Observable<FormGroupState<Race>>;
  submittedValue$: Observable<Race | undefined>;
  isLoading: Observable<boolean>;
  countries = ['England', 'Germany', 'Hungary', 'United States'];
  dateValueConverter: NgrxValueConverter<Date | null, string | null> = {
    convertViewToStateValue(value) {
      if (value === null) {
        return null;
      }

      // the value provided by the date picker is in local time but we want UTC so we recreate the date as UTC
      value = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
      return NgrxValueConverters.dateToISOString.convertViewToStateValue(value);
    },
    convertStateToViewValue: NgrxValueConverters.dateToISOString.convertStateToViewValue,
  };

  constructor( private subscriptionService: SubscriptionService, private store: Store<fromRaceReducer.State>, @Inject(RaceIdResolver) private race: Observable<Race> ) {
    this.formState$ = this.store.pipe( select(state => state.raceManagement.raceDetailsForm ));
    this.submittedValue$ = race;
  }

  // event handling methods
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$.next();
  }

  ngOnInit() {
    this.subscribeToLoading();
  }

  onCancel() {
    this.store.dispatch( setSelectedRaces({ races: [] }));
    this.store.dispatch( routerGo({ path: ['/race'] }));
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.store.dispatch( setSelectedSailors({ sailors: [] }))),
      map( formState => formState.value ),
      map( race => {
        if ( race.id === undefined ) {
          return addRace({ race, redirectTo: { path: ['/race'] }});
        } else {
          return updateRace( { race, redirectTo: { path: ['/race'] }});
        }
      })
    ).subscribe( this.store );
  }

  // public accessors and mutators

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
