import { InjectionToken, NgModule } from '@angular/core';
import { AppMaterialModule } from '../../app-material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RaceSelectComponent } from './select/race-select.component';
import { RaceResolver } from './race.resolver';
import { RaceService } from './race.service';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { LapIdResolver } from './lap-id.resolver';
import { EffectsModule } from '@ngrx/effects';
import { RaceEffects } from './race.effects';
import { RegistrationDetailsResolver } from './registration-details.resolver';
import { raceManagementReducer } from './race.reducer';
import { RegistrationEffects } from './registration.effects';
import { RegistrationService } from './registration.service';

export const RACE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('race reducer');

@NgModule({
  declarations: [
    RaceSelectComponent
  ],
  imports: [
    AppMaterialModule,
    CommonModule,
    EffectsModule.forFeature([RaceEffects, RegistrationEffects]),
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature( 'raceManagement', RACE_REDUCER_TOKEN )
  ],
  exports: [
    AppMaterialModule,
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    LapIdResolver,
    RaceResolver,
    RaceService,
    RegistrationDetailsResolver,
    RegistrationService,
    { provide: RACE_REDUCER_TOKEN, useValue: raceManagementReducer }]
})

export class RaceCommonModule {}
