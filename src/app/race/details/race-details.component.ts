import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromRaceReducer from '../race.reducer';
import { Race } from '../domain/race';
import { map, take, tap } from 'rxjs/operators';
import { addRace, setSelectedRaces, updateRace } from '../race.actions';
import { ComponentDestroyService } from '../../shared/component-destroy.service';
import { routerGo } from '../../shared/router/router.actions';
import { BaseFormComponent } from '../../shared/generic-components/base-form.component';
import { getDetailsForm } from './race-details.reducer';

@Component({
  selector: 'srm-race-details',
  templateUrl: './race-details.component.html',
  styleUrls: ['./race-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaceDetailsComponent extends BaseFormComponent<Race> {
  countries = ['England', 'Germany', 'Hungary', 'United States'];

  constructor( protected router: Router, protected componentDestroyService: ComponentDestroyService, protected store: Store<fromRaceReducer.State> ) {
    super( router, componentDestroyService, store, 'race-details', getDetailsForm );
  }

  // event handling methods
  onCancel() {
    this.store.dispatch( setSelectedRaces({ races: [] }));
    this.store.dispatch( routerGo({ path: ['/race'] }));
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.store.dispatch( setSelectedRaces({ races: [] }))),
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
}
