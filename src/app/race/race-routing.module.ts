import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceDetailsComponent } from './race-details/race-details.component';
import { RaceIdResolver } from './race-id-resolver.service';
import { AuthGuard } from '../authentication/auth-guard';
import { RaceRegistrationComponent } from './race-registration/race-registration.component';
import { RaceComponent } from './race.component';
import { RaceListComponent } from './race-list/race-list.component';

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
