import { InjectionToken, NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RaceComponent } from './race.component';
import { RaceRoutingModule } from './race-routing.module';
import { RaceDetailsComponent } from './details/race-details.component';
import { RaceListComponent } from './list/race-list.component';
import { RegistrationListComponent } from './registration/list/registration-list.component';
import { RaceTabsComponent } from './tabs/race-tabs.component';
import { RaceStatusbarComponent } from './statusbar/race-statusbar.component';
import { RegistrationDetailsComponent } from './registration/details/registration-details.component';
import { LapSelectorComponent } from './lap/lap-selector/lap-selector.component';
import { LapFacade } from './lap/lap.facade';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { AppMaterialModule } from '../app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EffectsModule } from '@ngrx/effects';
import { RaceEffects } from './race.effects';
import { RegistrationEffects } from './registration/registration.effects';
import { CommonModule } from '@angular/common';
import { RegistrationService } from './registration/registration.service';
import { RegistrationDetailsResolver } from './registration/registration-details.resolver';
import { RaceService } from './race.service';
import { RaceResolver } from './race.resolver';
import { raceManagementReducer } from './race.reducer';
import { LapIdResolver } from './lap/lap-id.resolver';
import { RaceSelectComponent } from './race-select/race-select.component';

export const RACE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('race reducer');

@NgModule({
  declarations: [
    RaceDetailsComponent,
    RaceComponent,
    RaceListComponent,
    RegistrationListComponent,
    RaceTabsComponent,
    RaceSelectComponent,
    RaceStatusbarComponent,
    RegistrationDetailsComponent,
    LapSelectorComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    EffectsModule.forFeature([RaceEffects, RegistrationEffects]),
    FlexLayoutModule,
    FormsModule,
    RaceRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature( 'raceManagement', RACE_REDUCER_TOKEN )
  ],
  exports: [
    LapSelectorComponent,
    RaceSelectComponent,
    RaceStatusbarComponent
  ],
  entryComponents: [ RaceListComponent ],
  providers: [
    LapFacade,
    LapIdResolver,
    RaceResolver,
    RaceService,
    RegistrationDetailsResolver,
    RegistrationService,
    { provide: RACE_REDUCER_TOKEN, useValue: raceManagementReducer }
  ]
})

export class RaceModule {}
