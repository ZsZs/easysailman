import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceListComponent } from './race-list/race-list.component';
import { RaceDetailsComponent } from './race-details/race-details.component';
import { RaceResolver } from './race.resolver';

const routes: Routes = [
   { path: '', component: RaceListComponent },
   { path: ':id', component: RaceDetailsComponent, resolve: { race: RaceResolver }}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class RaceManagementRoutingModule {}
