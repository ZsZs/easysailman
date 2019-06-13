import { NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { NgrxFormsModule } from 'ngrx-forms';

import { SharedModule } from '../shared/shared.module';
import { RaceManagementComponent } from './race-management.component';
import { RaceManagementRoutingModule } from './race-management-routing.module';
import { raceManagementReducer } from './race-management.reducer';
import { RaceDetailsComponent } from './race-details/race-details.component';
import { RaceListComponent } from './race-list/race-list.component';
import * as fromRaceManagementReducer from './race-management.reducer';
import * as fromRaceDetailsReducer from './race-details/race-details.reducer';

export interface RaceModuleState {
  raceManagement: fromRaceManagementReducer.RaceManagementState;
  raceDetails: fromRaceDetailsReducer.RaceDetailsFormState;
}

@NgModule({
  declarations: [
    RaceDetailsComponent,
    RaceManagementComponent,
    RaceListComponent
  ],
  imports: [
    NgrxFormsModule,
    RaceManagementRoutingModule,
    SharedModule,
    StoreModule.forFeature( 'raceManagement', raceManagementReducer )
  ],
  exports: [],
  entryComponents: [ RaceListComponent ]
})

export class RaceManagementModule {}
