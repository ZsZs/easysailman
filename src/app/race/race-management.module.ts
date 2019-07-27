import { InjectionToken, NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxFormsModule } from 'ngrx-forms';

import { SharedModule } from '../shared/shared.module';
import { RaceManagementComponent } from './race-management.component';
import { RaceManagementRoutingModule } from './race-management-routing.module';
import { raceManagementReducer } from './race-management.reducer';
import { RaceDetailsComponent } from './race-details/race-details.component';
import { RaceListComponent } from './race-list/race-list.component';
import { RaceManagementEffects } from './race-management.effects';
import { RaceService } from './race.service';
import { RaceResolver } from './race.resolver';
import { AppState } from '../app.reducer';

export const RACE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('race reducer');

@NgModule({
  declarations: [
    RaceDetailsComponent,
    RaceManagementComponent,
    RaceListComponent
  ],
  imports: [
    EffectsModule.forFeature([RaceManagementEffects]),
    NgrxFormsModule,
    RaceManagementRoutingModule,
    SharedModule,
    StoreModule.forFeature( 'raceManagement', RACE_REDUCER_TOKEN )
  ],
  exports: [],
  entryComponents: [ RaceListComponent ],
  providers: [RaceResolver, RaceService, { provide: RACE_REDUCER_TOKEN, useValue: raceManagementReducer },
  ]
})

export class RaceManagementModule {}
