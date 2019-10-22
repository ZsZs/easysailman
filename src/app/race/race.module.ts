import { InjectionToken, NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RaceComponent } from './race.component';
import { RaceRoutingModule } from './race-routing.module';
import { RaceDetailsComponent } from './details/race-details.component';
import { RaceListComponent } from './list/race-list.component';
import { RegistrationListComponent } from './registration/list/registration-list.component';
import { RaceTabsComponent } from './tabs/race-tabs.component';
import { RaceStatusbarComponent } from './statusbar/race-statusbar.component';
import { RaceCommonModule } from './common/race-common.module';
import { RegistrationDetailsComponent } from './registration/details/registration-details.component';
import { LapSelectorComponent } from './lap/lap-selector/lap-selector.component';
import { Lap } from './domain/lap';
import { EntityService } from '../shared/firestore/entity.service';
import { LapFacade } from './lap/lap.facade';

@NgModule({
  declarations: [
    RaceDetailsComponent,
    RaceComponent,
    RaceListComponent,
    RegistrationListComponent,
    RaceTabsComponent,
    RaceStatusbarComponent,
    RegistrationDetailsComponent,
    LapSelectorComponent
  ],
  imports: [
    RaceCommonModule,
    RaceRoutingModule,
    SharedModule
  ],
  exports: [
    LapSelectorComponent
  ],
  entryComponents: [ RaceListComponent ],
  providers: [
    LapFacade,
    { provide: Lap, useClass: EntityService }
  ]
})

export class RaceModule {}
