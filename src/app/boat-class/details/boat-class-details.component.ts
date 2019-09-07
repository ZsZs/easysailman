import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, mergeMap, take, tap } from 'rxjs/operators';
import * as fromAppReducer from '../../app.reducer';
import { BoatClassResolver } from '../boat-class.resolver';
import { BoatClass } from '../boat-class';
import { State } from '../boat-class.reducer';
import { addBoatClass, addOrUpdateBoatClass, setSelectedBoatClasses, updateBoatClass } from '../boat-class.actions';
import { routerGo } from '../../shared/router/router.actions';

@Component({
  selector: 'srm-boat-class-details',
  templateUrl: './boat-class-details.component.html',
  styleUrls: ['./boat-class-details.component.css']
})
export class BoatClassDetailsComponent implements OnInit {
  formState$: Observable<FormGroupState<BoatClass>>;
  submittedValue$: Observable<BoatClass | undefined>;
  isLoading: Observable<boolean>;

  constructor( private store: Store<State>, @Inject( BoatClassResolver ) private boatClass$: Observable<BoatClass> ) {
    this.formState$ = this.store.pipe( select(state => state.boatClassManagement.boatClassDetailsForm ));
    this.submittedValue$ = boatClass$;
  }

  // event handling methods
  ngOnInit() {
    this.subscribeToLoading();
  }

  onCancel() {
    this.store.dispatch( setSelectedBoatClasses({ boatClasses: [] }));
    this.store.dispatch( routerGo({ path: ['/boat-class'] }));
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.store.dispatch( setSelectedBoatClasses({ boatClasses: [] }))),
      map( formState => formState.value ),
      map(boatClass => addOrUpdateBoatClass( { boatClass, redirectTo: { path: ['/boat-class'] } }))
    ).subscribe( this.store );
  }

  // public accessors and mutators

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
