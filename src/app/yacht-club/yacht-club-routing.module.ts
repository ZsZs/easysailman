import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { YachtClubComponent } from './yacht-club.component';
import { YachtClubListComponent } from './list/yacht-club-list.component';
import { YachtClubDetailsComponent } from './details/yacht-club-details.component';
import { YachtClubResolver } from './yacht-club.resolver';

const routes: Routes = [
  { path: '', component: YachtClubComponent, children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: YachtClubListComponent },
      { path: ':id/details', component: YachtClubDetailsComponent, resolve: { race: YachtClubResolver } },
      { path: '**', redirectTo: 'list', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})

export class YachtClubRoutingModule {}
