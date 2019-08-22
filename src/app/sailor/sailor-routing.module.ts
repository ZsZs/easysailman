import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SailorDetailsComponent } from './sailor-details/sailor-details.component';
import { SailorBoatsComponent } from './sailor-boats/sailor-boats.component';
import { SailorListComponent } from './sailor-list/sailor-list.component';
import { SailorComponent } from './sailor.component';
import { RaceResolver } from '../race/race.resolver';

const routes: Routes = [
  { path: '', component: SailorComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: SailorListComponent },
      { path: ':id/details', component: SailorDetailsComponent, resolve: { race: RaceResolver } },
      { path: ':id/boats', component: SailorBoatsComponent, resolve: { race: RaceResolver } },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class SailorRoutingModule {}
