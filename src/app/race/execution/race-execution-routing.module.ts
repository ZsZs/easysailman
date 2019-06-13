import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceExecutionComponent } from './race-execution.component';

const routes: Routes = [
   { path: '', component: RaceExecutionComponent }
]

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceExecutionRoutingModule {}
