import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgrxFormsModule } from 'ngrx-forms';
import { SharedModule } from '../shared/shared.module';
import { SailorTabsComponent } from './sailor-tabs/sailor-tabs.component';
import { SailorStatusbarComponent } from './sailor-statusbar/sailor-statusbar.component';
import { SailorListComponent } from './sailor-list/sailor-list.component';
import { SailorDetailsComponent } from './sailor-details/sailor-details.component';
import { SailorBoatsComponent } from './sailor-boats/sailor-boats.component';
import { SailorComponent } from './sailor.component';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SailorEffects } from './sailor.effects';
import { SailorService } from './sailor.service';
import { SailorResolver } from './sailor.resolver';
import { sailorReducer } from './sailor.reducer';
import { SailorRoutingModule } from './sailor-routing.module';

export const SAILOR_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>('sailor reducer');

@NgModule({
  declarations: [
    SailorBoatsComponent,
    SailorDetailsComponent,
    SailorComponent,
    SailorListComponent,
    SailorStatusbarComponent,
    SailorTabsComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([SailorEffects]),
    SailorRoutingModule,
    SharedModule,
    StoreModule.forFeature( 'sailorManagement', SAILOR_REDUCER_TOKEN )
  ],
  exports: [],
  entryComponents: [ SailorComponent ],
  providers: [SailorResolver, SailorService, { provide: SAILOR_REDUCER_TOKEN, useValue: sailorReducer }
  ]
})

export class SailorModule {}
