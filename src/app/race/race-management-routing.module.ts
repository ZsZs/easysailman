import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceDetailsComponent } from './race-details/race-details.component';
import { RaceResolver } from './race.resolver';
import { AuthGuard } from '../authentication/auth-guard';
import { RaceRegistrationComponent } from './race-registration/race-registration.component';
import { RaceManagementComponent } from './race-management.component';
import { RaceListComponent } from './race-list/race-list.component';

const routes: Routes = [
   { path: '', component: RaceManagementComponent, children: [
       { path: '', redirectTo: 'list', pathMatch: 'full' },
       { path: 'list', component: RaceListComponent },
       { path: ':id/details', component: RaceDetailsComponent, resolve: { race: RaceResolver } },
       { path: ':id/registrations', component: RaceRegistrationComponent, resolve: { race: RaceResolver } },
       { path: '**', redirectTo: 'list', pathMatch: 'full' },
   ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceManagementRoutingModule {}
