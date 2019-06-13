import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './authentication/auth-guard';

const routes: Routes = [
  { path: '', component : HomeComponent },
  { path: 'race', loadChildren: './race/race-management.module#RaceManagementModule'},
  { path: 'race-execution', loadChildren: './race/execution/race-execution.module#RaceExecutionModule', canLoad: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
