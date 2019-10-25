import { InjectionToken, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RaceExecutionRoutingModule } from './race-execution-routing.module';
import { RaceExecutionComponent } from './race-execution.component';
import { RaceExecutionTabsComponent } from './tabs/race-execution-tabs.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RaceEffects } from '../race.effects';
import { RaceResolver } from '../race.resolver';
import { RaceService } from '../race.service';
import { RaceExecutionToolbarComponent } from './toolbar/race-execution-toolbar.component';
import { RaceSelectComponent } from '../race-select/race-select.component';
import { RaceFieldComponent } from './field/race-field.component';
import { RaceFinishComponent } from './finish/race-finish.component';
import { RaceParticipantListComponent } from './participant-list/race-participant-list.component';
import { RaceResultsComponent } from './results/race-results.component';
import { RaceStartComponent } from './race-start/race-start.component';
import { raceManagementReducer } from '../race.reducer';
import { RaceModule } from '../race.module';
import { LapEffects } from '../lap/lap.effects';

export const RACE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('race reducer');

@NgModule({
   declarations: [
      RaceExecutionComponent,
      RaceExecutionTabsComponent,
      RaceExecutionToolbarComponent,
      RaceFieldComponent,
      RaceFinishComponent,
      RaceParticipantListComponent,
      RaceResultsComponent,
      RaceStartComponent
   ],
  imports: [
    EffectsModule.forFeature( [ LapEffects, RaceEffects ] ),
    RaceExecutionRoutingModule,
    SharedModule,
    StoreModule.forFeature( 'raceManagement', RACE_REDUCER_TOKEN ),
    RaceModule
  ],
   exports: [],
   entryComponents: [ RaceSelectComponent ],
   providers: [RaceResolver, RaceService, { provide: RACE_REDUCER_TOKEN, useValue: raceManagementReducer }]
})

export class RaceExecutionModule {}
