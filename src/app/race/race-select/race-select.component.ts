import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SubscriptionService } from '../../shared/subscription.service';
import { Store } from '@ngrx/store';
import * as fromRaceReducer from '../race.reducer';
import { Router } from '@angular/router';
import { allRacesRequested, setSelectedRaces } from '../race.actions';
import { Race } from '../domain/race';
import { BaseListComponent } from '../../shared/generic-components/base-list.component';
import { getRaces } from '../race.reducer';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'srm-race-select',
  templateUrl: './race-select.component.html',
  styleUrls: ['./race-select.component.css']
})

export class RaceSelectComponent extends BaseListComponent<Race> {
  private static readonly featureDescriptor = {
    name: 'race',
    allEntitiesSelector: getRaces
  };
  displayedColumns = ['select', 'title', 'date', 'country', 'place'];
  selection = new SelectionModel<Race>(false, []);

  constructor(
    public dialogRef: MatDialogRef<RaceSelectComponent>,
    protected subscriptionService: SubscriptionService,
    protected store: Store<fromRaceReducer.RaceManagementState>,
    protected router: Router
  ) {
    super( router, subscriptionService, store, RaceSelectComponent.featureDescriptor  );
  }

  // event handling methods
  onCancel(): void {
    this.dialogRef.close();
    this.router.navigateByUrl( '/' );
  }

  onOk(): void {
    this.dialogRef.close();
  }

  // action methods

  // protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    this.dialogRef.close();
    return 'race-execution';
  }

  protected dispatchAllEntitiesRequestedAction() {
    this.store.dispatch( allRacesRequested() );
  }

  protected dispatchDeleteEntityAction( entity: Race ) {
    // This dialog, doesn't delete races
  }

  protected dispatchSelectedEntitiesAction( entities: Race[] ) {
    this.store.dispatch( setSelectedRaces({ races: entities } ));
  }
}
