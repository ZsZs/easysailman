import { InjectionToken, NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { SharedModule } from '../shared/shared.module';
import { BoatClassComponent } from './boat-class.component';
import { BoatClassRoutingModule } from './boat-class-routing.module';
import { BoatClassDetailsComponent } from './details/boat-class-details.component';
import { BoatClassTabsComponent } from './tabs/boat-class-tabs.component';
import { BoatClassListComponent } from './list/boat-class-list.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { boatClassReducer } from './boat-class.reducer';
import { BoatClassService } from './boat-class.service';
import { BoatClassResolver } from './boat-class.resolver';
import { EffectsModule } from '@ngrx/effects';
import { BoatClassEffects } from './boat-class.effects';
import { YACHT_CLUB_REDUCER_TOKEN } from '../yacht-club/yacht-club.module';
import { CommonModule } from '@angular/common';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

export const BOAT_CLASS_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('boat-class reducer');

@NgModule({
  declarations: [
    BoatClassComponent,
    BoatClassDetailsComponent,
    BoatClassTabsComponent,
    BoatClassListComponent
  ],
  imports: [
    EffectsModule.forFeature([BoatClassEffects]),
    BoatClassRoutingModule,
    SharedModule,
    StoreModule.forFeature( 'boatClassManagement', BOAT_CLASS_REDUCER_TOKEN ),
  ],
  exports: [],
  entryComponents: [BoatClassComponent],
  providers: [BoatClassResolver, BoatClassService, { provide: BOAT_CLASS_REDUCER_TOKEN, useValue: boatClassReducer }]
})

export class BoatClassModule {}
