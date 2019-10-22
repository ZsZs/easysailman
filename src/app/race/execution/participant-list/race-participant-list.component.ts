import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/generic-components/base-form.component';
import { Participant } from '../../domain/participant';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../shared/subscription.service';
import { Store } from '@ngrx/store';
import * as fromRaceReducer from '../../common/race.reducer';
import { Observable, of, Subscription } from 'rxjs';
import { Registration } from '../../domain/registration';
import { tabIsActive, tabIsInActive } from '../../../shared/ui/ui.actions';
import { BaseEntityCollectionComponent } from '../../../shared/generic-components/base-entity-collection.component';

@Component({
  selector: 'srm-race-participants',
  templateUrl: './race-participant-list.component.html',
  styleUrls: ['./race-participant-list.component.css']
})

export class RaceParticipantListComponent extends BaseEntityCollectionComponent<Participant> implements OnDestroy, OnInit {
  private static readonly featureDescriptor = { name: 'participants', baseRoute: 'race-execution/participants' };

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
  }

  protected dispatchDeleteEntityAction( entity: Participant ) {
  }

  protected dispatchSelectedEntitiesAction( entities: Participant[] ) {
  }
}
