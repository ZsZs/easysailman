import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../shared/subscription.service';
import { select, Store } from '@ngrx/store';
import * as fromRaceReducer from '../../common/race.reducer';
import { getFirstSelectedRace } from '../../common/race.reducer';
import { BaseListComponent } from '../../../shared/generic-components/base-list.component';
import { Registration } from '../../domain/registration';
import { Subscription } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { Race } from '../../domain/race';
import { allRegistrationsRequested, deleteRegistration, setSelectedRegistrations } from '../../common/registration.actions';
import { getRegistrations } from '../../common/registration.reducer';

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

  constructor( protected router: Router, protected subscriptionService: SubscriptionService, protected store: Store<fromRaceReducer.RaceManagementState> ) {
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
