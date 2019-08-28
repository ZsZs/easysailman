import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RaceExecutionRoutingModule } from './race-execution-routing.module';
import { RaceExecutionComponent } from './race-execution.component';


@NgModule({
   declarations: [
      RaceExecutionComponent
   ],
   imports: [
      RaceExecutionRoutingModule,
      SharedModule
   ],
   exports: [],
   entryComponents: [ RaceExecutionComponent ]
})
export class RaceExecutionModule {}
