import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceDetailsComponent } from './details/race-details.component';
import { RaceResolver } from './common/race.resolver';
import { RegistrationListComponent } from './registration/list/registration-list.component';
import { RaceComponent } from './race.component';
import { RaceListComponent } from './list/race-list.component';
import { PathVariables } from './path-variables';
import { RegistrationDetailsResolver } from './common/registration-details.resolver';
import { RegistrationDetailsComponent } from './registration/details/registration-details.component';

const routes: Routes = [
   { path: '', component: RaceComponent, children: [
       { path: '', redirectTo: 'list', pathMatch: 'full' },
       { path: 'list', component: RaceListComponent },
       { path: ':' + PathVariables.raceID + '/details', component: RaceDetailsComponent, resolve: { race: RaceResolver } },
       { path: ':' + PathVariables.raceID + '/registration/list', component: RegistrationListComponent, resolve: { race: RaceResolver } },
       { path: ':' + PathVariables.raceID + '/registration/:' + PathVariables.registrationID + '/details', component: RegistrationDetailsComponent, resolve: { race: RegistrationDetailsResolver } },
       { path: '**', redirectTo: 'list', pathMatch: 'full' },
   ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceRoutingModule {}
