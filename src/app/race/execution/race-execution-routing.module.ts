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
import { PathVariables } from '../path-variables';

const routes: Routes = [
   { path: '', component: RaceExecutionComponent, children: [
       { path: '', redirectTo: '', pathMatch: 'full' },
//       { path: ':raceId' },
       { path: ':' + PathVariables.raceID + '/lap/:' + PathVariables.lapID + '/field', component: RaceFieldComponent, resolve: { race: LapIdResolver } },
       { path: ':' + PathVariables.raceID + '/lap/:' + PathVariables.lapID + '/finish', component: RaceFinishComponent, resolve: { race: LapIdResolver } },
       { path: ':' + PathVariables.raceID + '/lap/:' + PathVariables.lapID + '/participants', component: RaceParticipantListComponent, resolve: { race: LapIdResolver } },
       { path: ':' + PathVariables.raceID + '/results', component: RaceResultsComponent, resolve: { race: LapIdResolver } },
       { path: ':' + PathVariables.raceID + '/lap/:' + PathVariables.lapID + '/start', component: RaceStartComponent, resolve: { race: LapIdResolver } },
       { path: '**', redirectTo: '', pathMatch: 'full' },
   ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceExecutionRoutingModule {}
