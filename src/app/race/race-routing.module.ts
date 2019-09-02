import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceDetailsComponent } from './details/race-details.component';
import { RaceIdResolver } from './common/race-id.resolver';
import { RaceRegistrationComponent } from './registration/race-registration.component';
import { RaceComponent } from './race.component';
import { RaceListComponent } from './list/race-list.component';

const routes: Routes = [
   { path: '', component: RaceComponent, children: [
       { path: '', redirectTo: 'list', pathMatch: 'full' },
       { path: 'list', component: RaceListComponent },
       { path: ':id/details', component: RaceDetailsComponent, resolve: { race: RaceIdResolver } },
       { path: ':id/registrations', component: RaceRegistrationComponent, resolve: { race: RaceIdResolver } },
       { path: '**', redirectTo: 'list', pathMatch: 'full' },
   ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceRoutingModule {}
