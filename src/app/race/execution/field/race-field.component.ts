import { Component, OnDestroy, OnInit } from '@angular/core';
import { RaceExecutionBaseComponent } from '../shared/race-execution-base.component';
import { ActivatedRoute } from '@angular/router';
import { RouteStateService } from '../../../shared/router/route-state.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { ComponentDestroyService } from '../../../shared/component-destroy.service';

@Component({
  selector: 'srm-race-field',
  templateUrl: './race-field.component.html',
  styleUrls: ['./race-field.component.css']
})
export class RaceFieldComponent extends RaceExecutionBaseComponent implements OnDestroy, OnInit {

  constructor( protected route: ActivatedRoute, protected routeState: RouteStateService, protected componentDestroyService: ComponentDestroyService, protected store: Store<AppState> ) {
    super( route, routeState, componentDestroyService, store, 'race-execution-field' );
  }

  // component event handling methods
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
