import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceExecutionComponent } from './race-execution.component';
import { RaceFieldComponent } from './field/race-field.component';
import { RaceFinishComponent } from './finish/race-finish.component';
import { RaceParticipantsComponent } from './participants/race-participants.component';
import { RaceResultsComponent } from './results/race-results.component';
import { RaceStartComponent } from './race-start/race-start.component';
import { LapIdResolver } from '../common/lap-id.resolver';

const routes: Routes = [
   { path: '', component: RaceExecutionComponent, children: [
       { path: '', redirectTo: '', pathMatch: 'full' },
       { path: ':boatClassId/lap/:lapId/field', component: RaceFieldComponent, resolve: { race: LapIdResolver } },
       { path: ':boatClassId/lap/:lapId/finish', component: RaceFinishComponent, resolve: { race: LapIdResolver } },
       { path: ':boatClassId/lap/:lapId/participants', component: RaceParticipantsComponent, resolve: { race: LapIdResolver } },
       { path: ':boatClassId/results', component: RaceResultsComponent, resolve: { race: LapIdResolver } },
       { path: ':boatClassId/lap/:lapId/start', component: RaceStartComponent, resolve: { race: LapIdResolver } },
       { path: '**', redirectTo: '', pathMatch: 'full' },
   ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceExecutionRoutingModule {}
