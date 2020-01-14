import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ComponentDestroyService } from '../../shared/component-destroy.service';
import { Store } from '@ngrx/store';
import * as fromRaceReducer from '../race.reducer';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { allRacesRequested, setSelectedRaces } from '../race.actions';
import { Race } from '../domain/race';
import { BaseListComponent } from '../../shared/generic-components/base-list.component';
import { getRaces } from '../race.reducer';
import { SelectionModel } from '@angular/cdk/collections';
import { race } from 'rxjs';

@Component({
  selector: 'srm-race-select',
  templateUrl: './race-select.component.html',
  styleUrls: ['./race-select.component.css']
})

export class RaceSelectComponent extends BaseListComponent<Race> {
  private static readonly featureDescriptor = {
    name: 'race',
    allEntitiesSelector: getRaces,
    tabName: 'select-race'
  };
  @Output() closeRaceSelect = new EventEmitter<void>();
  displayedColumns = ['title', 'date', 'country', 'place'];
  selection = new SelectionModel<Race>(false, []);

  constructor(
    protected subscriptionService: ComponentDestroyService,
    protected store: Store<fromRaceReducer.RaceManagementState>,
    protected router: Router,
  ) {
    super( router, subscriptionService, store, RaceSelectComponent.featureDescriptor  );
  }

  // event handling methods
  onCancel(): void {
    this.router.navigateByUrl( '/' );
  }

  onCloseRaceSelect() {
    this.closeRaceSelect.emit();
  }

  onOk(): void {
    this.onCloseRaceSelect();
    this.navigateToExecutionTab( this.selection.selected[0].id );
  }

  // action methods

  // protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    this.onCloseRaceSelect();
    return this.determineExecutionTabUri( entityId );
  }

  private determineExecutionTabUri( raceId: string ): string {
    return 'race-execution/' + raceId + '/lap/unknown/participants';
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

  private navigateToExecutionTab( raceId: string ) {
    this.router.navigateByUrl( this.determineExecutionTabUri( raceId ));
  }
}
