import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceExecutionComponent } from './race-execution.component';
import { RaceFieldComponent } from './field/race-field.component';
import { RaceFinishComponent } from './finish/race-finish.component';
import { RaceParticipantListComponent } from './participant-list/race-participant-list.component';
import { RaceResultsComponent } from './results/race-results.component';
import { RaceStartComponent } from './race-start/race-start.component';
import { LapIdResolver } from '../lap/lap-id.resolver';
import { RaceResolver } from '../race.resolver';

const routes: Routes = [
   { path: '', component: RaceExecutionComponent, children: [
       { path: '', redirectTo: '', pathMatch: 'full' },
       { path: ':raceId/lap/:lapId/field', component: RaceFieldComponent, resolve: { race: LapIdResolver } },
       { path: ':raceId/lap/:lapId/finish', component: RaceFinishComponent, resolve: { race: LapIdResolver } },
       { path: ':raceId/lap/:lapId/participants', component: RaceParticipantListComponent, resolve: { race: LapIdResolver } },
       { path: ':raceId/results', component: RaceResultsComponent, resolve: { race: LapIdResolver } },
       { path: ':raceId/lap/:lapId/start', component: RaceStartComponent, resolve: { race: LapIdResolver } },
       { path: '**', redirectTo: '', pathMatch: 'full' },
   ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceExecutionRoutingModule {}
