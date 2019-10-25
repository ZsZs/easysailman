import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromRaceReducer from '../../race.reducer';
import { BaseFormComponent } from '../../../shared/generic-components/base-form.component';
import { Registration } from '../../domain/registration';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../shared/subscription.service';
import { getFirstSelectedRace } from '../../race.reducer';
import { routerGo } from '../../../shared/router/router.actions';
import { map, mergeMap, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { getRegistrationDetailsForm } from './registration-details.reducer';
import { Observable } from 'rxjs';
import { INITIAL_RACE_VALUE, Race } from '../../domain/race';
import { addRegistration, setSelectedRegistrations, updateRegistration } from '../registration.actions';

@Component({
  selector: 'srm-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.css']
})

export class RegistrationDetailsComponent extends BaseFormComponent<Registration> implements OnInit {
  private race$: Observable<Race>;

  constructor( protected router: Router, protected subscriptionService: SubscriptionService, protected store: Store<fromRaceReducer.State> ) {
    super( router, subscriptionService, store, 'registration-details', getRegistrationDetailsForm );
  }

  ngOnInit() {
    super.ngOnInit();
    this.race$ = this.store.select( getFirstSelectedRace );
  }

  onCancel() {
    this.store.dispatch( setSelectedRegistrations({ registrations: [] }));
    this.store.dispatch( routerGo({ path: ['/race'] }));
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.store.dispatch( setSelectedRegistrations({ registrations: [] }))),
      map( formState => formState.value ),
      map( registration => {
        if ( registration.id === undefined ) {
          return addRegistration({ registration, redirectTo: { path: ['/race/' + registration.raceId + '/registration/list'] }});
        } else {
          return updateRegistration( { registration, redirectTo: { path: ['/race/' + registration.raceId + '/registration/list'] }} );
        }
      })
    ).subscribe( this.store );
  }
}
