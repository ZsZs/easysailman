import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BoatClassComponent } from './boat-class.component';

const routes: Routes = [
  { path: '', component: BoatClassComponent }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})

export class BoatClassRoutingModule {}

