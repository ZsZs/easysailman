import { InjectionToken, NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxFormsModule } from 'ngrx-forms';

import { SharedModule } from '../shared/shared.module';
import { RaceComponent } from './race.component';
import { RaceRoutingModule } from './race-routing.module';
import { raceReducer } from './race.reducer';
import { RaceDetailsComponent } from './race-details/race-details.component';
import { RaceListComponent } from './race-list/race-list.component';
import { RaceEffects } from './race.effects';
import { RaceService } from './race.service';
import { RaceResolver } from './race.resolver';
import { AppState } from '../app.reducer';
import { RaceRegistrationComponent } from './race-registration/race-registration.component';
import { RaceTabsComponent } from './race-tabs/race-tabs.component';
import { RaceStatusbarComponent } from './race-statusbar/race-statusbar.component';

export const RACE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('race reducer');

@NgModule({
  declarations: [
    RaceDetailsComponent,
    RaceComponent,
    RaceListComponent,
    RaceRegistrationComponent,
    RaceTabsComponent,
    RaceStatusbarComponent
  ],
  imports: [
    EffectsModule.forFeature([RaceEffects]),
    NgrxFormsModule,
    RaceRoutingModule,
    SharedModule,
    StoreModule.forFeature( 'raceManagement', RACE_REDUCER_TOKEN )
  ],
  exports: [],
  entryComponents: [ RaceListComponent ],
  providers: [RaceResolver, RaceService, { provide: RACE_REDUCER_TOKEN, useValue: raceReducer },
  ]
})

export class RaceModule {}
