import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../shared/subscription.service';
import { select, Store } from '@ngrx/store';
import * as fromRaceReducer from '../../race.reducer';
import { Registration } from '../../domain/registration';
import { BaseEntityCollectionComponent } from '../../../shared/generic-components/base-entity-collection.component';
import { getFirstSelectedRace } from '../../race.reducer';
import { allRegistrationsRequested } from '../../registration/registration.actions';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Race } from '../../domain/race';

@Component({
  selector: 'srm-race-participants',
  templateUrl: './race-participant-list.component.html',
  styleUrls: ['./race-participant-list.component.css']
})

export class RaceParticipantListComponent extends BaseEntityCollectionComponent<Registration> implements OnDestroy, OnInit {
  private static readonly featureDescriptor = { name: 'participants', baseRoute: 'race-execution/participants' };
  private race: Race;

  constructor( protected router: Router, protected subscriptionService: SubscriptionService, protected store: Store<fromRaceReducer.RaceManagementState> ) {
    super( router, subscriptionService, store, RaceParticipantListComponent.featureDescriptor );
  }

  // event handling methods
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected detailsRoute( entityId: string ): string {
    return '';
  }

  protected dispatchAllEntitiesRequestedAction() {
    this.store.select( getFirstSelectedRace ).pipe(
      take( 1)
    ).subscribe( race => {
      this.store.dispatch( allRegistrationsRequested({ raceId: race.id }) );
      this.race = race;
    });
  }

  protected dispatchSelectedEntitiesAction( entities: Registration[] ) {
  }
}
