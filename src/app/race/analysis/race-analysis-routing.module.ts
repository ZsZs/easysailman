import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RaceExecutionComponent } from '../execution/race-execution.component';
import { RaceAnalysisComponent } from './race-analysis.component';

const routes: Routes = [
  { path: '', component: RaceAnalysisComponent }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceAnalysisRoutingModule { }
