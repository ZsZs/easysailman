import { NgModule } from '@angular/core';
import { NgrxFormsModule } from 'ngrx-forms';
import { SharedModule } from '../shared/shared.module';
import { BoatClassComponent } from './boat-class.component';
import { BoatClassRoutingModule } from './boat-class-routing.module';

@NgModule({
  declarations: [
    BoatClassComponent
  ],
  imports: [
    BoatClassRoutingModule,
    NgrxFormsModule,
    SharedModule
  ],
  exports: [],
  entryComponents: [BoatClassComponent],
  providers: []
})

export class BoatClassModule {}
