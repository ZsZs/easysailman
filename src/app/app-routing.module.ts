import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authentication/auth-guard';

const appRoutes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'boat-class', loadChildren: './boat-class/boat-class.module#BoatClassModule'},
  { path: 'race', loadChildren: './race/race.module#RaceModule'},
  { path: 'race-execution', loadChildren: './race/execution/race-execution.module#RaceExecutionModule', canLoad: [AuthGuard]},
  { path: 'sailor', loadChildren: './sailor/sailor.module#SailorModule'},
  { path: 'yacht-club', loadChildren: './yacht-club/yacht-club.module#YachtClubModule'}
];

@NgModule({
  imports: [RouterModule.forRoot( appRoutes )],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule {}

