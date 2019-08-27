import { InjectionToken, NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { AppState } from '../app.reducer';
import { SharedModule } from '../shared/shared.module';
import { YachtClubComponent } from './yacht-club.component';
import { YachtClubRoutingModule } from './yacht-club-routing.module';
import { YachtClubListComponent } from './yacht-club-list/yacht-club-list.component';
import { YachtClubDetailsComponent } from './yacht-club-details/yacht-club-details.component';
import { YachtClubTabsComponent } from './yacht-club-tabs/yacht-club-tabs.component';
import { YachtClubResolver } from './yacht-club-resolver';
import { YachtClubService } from './yacht-club.service';
import { yachtClubReducer } from './yacht-club.reducer';
import { YachtClubEffects } from './yacht-club.effects';

export const YACHT_CLUB_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('yacht-club reducer');

@NgModule({
  declarations: [
    YachtClubComponent,
    YachtClubListComponent,
    YachtClubDetailsComponent,
    YachtClubTabsComponent
  ],
  imports: [
    EffectsModule.forFeature([YachtClubEffects]),
    NgrxFormsModule,
    SharedModule,
    StoreModule.forFeature( 'yachtClubManagement', YACHT_CLUB_REDUCER_TOKEN ),
    YachtClubRoutingModule
  ],
  exports: [],
  entryComponents: [],
  providers: [YachtClubResolver, YachtClubService, { provide: YACHT_CLUB_REDUCER_TOKEN, useValue: yachtClubReducer }]
})

export class YachtClubModule {}
