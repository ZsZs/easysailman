import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { SharedModule } from '../shared/shared.module';
import { YachtClubComponent } from './yacht-club.component';
import { YachtClubRoutingModule } from './yacht-club-routing.module';

@NgModule({
  declarations: [YachtClubComponent],
  imports: [
    NgrxFormsModule,
    SharedModule,
    YachtClubRoutingModule
  ],
  exports: [],
  entryComponents: [],
  providers: []
})

export class YachtClubModule {}
