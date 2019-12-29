import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ComponentDestroyService } from '../../../shared/component-destroy.service';
import { select, Store } from '@ngrx/store';
import * as fromRaceReducer from '../../race.reducer';
import { getFirstSelectedRace } from '../../race.reducer';
import { BaseListComponent } from '../../../shared/generic-components/base-list.component';
import { Registration } from '../../domain/registration';
import { Subscription } from 'rxjs';
import { Race } from '../../domain/race';
import { allRegistrationsRequested, deleteRegistration, setSelectedRegistrations } from '../registration.actions';
import { getRegistrations } from '../registration.reducer';

@Component({
  selector: 'srm-race-registration',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})

export class RegistrationListComponent extends BaseListComponent<Registration> implements OnDestroy, OnInit {
  private static readonly featureDescriptor = {
    name: 'race',
    detailsRoute: 'race/:raceId/registration/:registrationId/details',
    tabName: 'registration-list',
    allEntitiesSelector: getRegistrations
  };
  displayedColumns = ['sailNumber', 'boatName', 'boatType', 'skipper'];
  private race: Race;
  private dispatchSubscription: Subscription;

  constructor( protected router: Router, protected subscriptionService: ComponentDestroyService, protected store: Store<fromRaceReducer.RaceManagementState> ) {
    super( router, subscriptionService, store, RegistrationListComponent.featureDescriptor  );
  }

  // event hendling methods
  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.dispatchSubscription.unsubscribe();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  // protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    return '/race/' + this.race.id + '/registration/' + entityId + '/details';
  }

  protected dispatchAllEntitiesRequestedAction() {
    this.dispatchSubscription = this.store.pipe(
      select( getFirstSelectedRace )
    ).subscribe( race => {
      this.store.dispatch( allRegistrationsRequested({ raceId: race.id }) );
      this.race = race;
    });
  }

  protected dispatchDeleteEntityAction( entity: Registration ) {
    this.store.dispatch( deleteRegistration({ registration: entity }));
  }

  protected dispatchSelectedEntitiesAction( entities: Registration[] ) {
    this.store.dispatch( setSelectedRegistrations({ registrations: entities }));
  }
}
