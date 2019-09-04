import { InjectionToken, NgModule } from '@angular/core';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgrxFormsModule } from 'ngrx-forms';

import { SharedModule } from '../shared/shared.module';
import { RaceComponent } from './race.component';
import { RaceRoutingModule } from './race-routing.module';
import { raceReducer } from './common/race.reducer';
import { RaceDetailsComponent } from './details/race-details.component';
import { RaceListComponent } from './list/race-list.component';
import { RaceEffects } from './common/race.effects';
import { RaceService } from './common/race.service';
import { RaceIdResolver } from './common/race-id.resolver';
import { AppState } from '../app.reducer';
import { RaceRegistrationComponent } from './registration/race-registration.component';
import { RaceTabsComponent } from './tabs/race-tabs.component';
import { RaceStatusbarComponent } from './statusbar/race-statusbar.component';
import { RaceCommonModule } from './common/race-common.module';


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
    RaceCommonModule,
    RaceRoutingModule,
    SharedModule
  ],
  exports: [],
  entryComponents: [ RaceListComponent ]
})

export class RaceModule {}
