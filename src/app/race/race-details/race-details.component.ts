import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { FormGroupState, NgrxValueConverter, NgrxValueConverters } from 'ngrx-forms';

import * as fromAppReducer from '../../app.reducer';
import * as fromRaceReducer from '../race.reducer';
import { UiService } from '../../shared/ui.service';
import { Race } from '../race';
import { RaceService } from '../race.service';
import { map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RaceIdResolver } from '../race-id-resolver.service';
import { saveRace, setSelectedRaces } from '../race.actions';

@Component({
  selector: 'srm-race-details',
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceDetailsComponent implements OnInit {
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

  constructor( private formBuilder: FormBuilder,
               private raceService: RaceService,
               private uiService: UiService,
               private store: Store<fromRaceReducer.State>,
               private router: Router,
               @Inject(RaceIdResolver) private race: Observable<Race> ) {
    this.formState$ = this.store.pipe( select(state => state.raceManagement.raceDetailsForm ));
    this.submittedValue$ = race;
  }

  // event handling methods
  ngOnInit() {
    this.subscribeToLoading();
  }

  onCancel() {
    this.store.dispatch( setSelectedRaces({ races: [] }));
    this.router.navigateByUrl( '/race' );
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      map(formState => saveRace( { race: formState.value }))
    ).subscribe( this.store );
  }

  // public accessors and mutators

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
