import { Component, OnInit } from '@angular/core';
import { BaseFormComponent } from '../../../shared/generic-components/base-form.component';
import { Participant } from '../../domain/participant';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../../shared/subscription.service';
import { Store } from '@ngrx/store';
import * as fromRaceReducer from '../../common/race.reducer';
import { Observable } from 'rxjs';
import { BaseListComponent } from '../../../shared/generic-components/base-list.component';

@Component({
  selector: 'srm-race-participants',
  templateUrl: './race-participant-list.component.html',
  styleUrls: ['./race-participant-list.component.css']
})

export class RaceParticipantListComponent extends BaseListComponent<Participant> implements OnInit {
  private static readonly featureDescriptor = { name: 'race', baseRoute: 'race' };

  constructor( protected router: Router, protected subscriptionService: SubscriptionService, protected store: Store<fromRaceReducer.RaceManagementState> ) {
    super( router, subscriptionService, store, RaceParticipantListComponent.featureDescriptor );
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
