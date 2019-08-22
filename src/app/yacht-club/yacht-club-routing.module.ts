import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { YachtClubComponent } from './yacht-club.component';

const routes: Routes = [
  { path: '', component: YachtClubComponent }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})

export class YachtClubRoutingModule {}
