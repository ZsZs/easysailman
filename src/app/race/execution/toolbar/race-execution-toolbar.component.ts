import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../../app.reducer';
import { MediaObserver, MediaChange } from '@angular/flex-layout';

@Component({
  selector: 'srm-race-execution-toolbar',
  templateUrl: './race-execution-toolbar.component.html',
  styleUrls: ['./race-execution-toolbar.component.css']
})

export class RaceExecutionToolbarComponent implements OnDestroy, OnInit {
  @Input() lastUrlSegment: string;

  constructor( public mediaObserver: MediaObserver, private store: Store<fromAppReducer.AppState> ) {}

  ngOnDestroy() {
  }

  ngOnInit() {
  }

  // protected, private helper methods
}
