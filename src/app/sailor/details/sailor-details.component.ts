import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { select, Store } from '@ngrx/store';
import * as fromSailorReducer from '../../sailor/sailor.reducer';
import { map, take, tap } from 'rxjs/operators';
import * as fromAppReducer from '../../app.reducer';
import { Sailor } from '../sailor';
import { SailorResolver } from '../sailor.resolver';
import { addSailor, setSelectedSailors, updateSailor } from '../sailor.actions';
import { routerGo } from '../../shared/router/router.actions';
import { SubscriptionService } from '../../shared/subscription.service';

@Component({
  selector: 'srm-sailor-details',
  templateUrl: './sailor-details.component.html',
  styleUrls: ['./sailor-details.component.css']
})
export class SailorDetailsComponent implements OnDestroy, OnInit {
  formState$: Observable<FormGroupState<Sailor>>;
  submittedValue$: Observable<Sailor | undefined>;
  isLoading: Observable<boolean>;

  constructor( private subscriptionService: SubscriptionService, private store: Store<fromSailorReducer.State>, @Inject( SailorResolver ) private sailor: Observable<Sailor> ) {
    this.formState$ = this.store.pipe( select(state => state.sailorManagement.sailorDetailsForm ));
    this.submittedValue$ = sailor;
  }

  // event handling methods
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$.next();
  }

  ngOnInit() {
    this.subscribeToLoading();
  }

  onCancel() {
    this.store.dispatch( setSelectedSailors({ sailors: [] }));
    this.store.dispatch( routerGo({ path: ['/sailor'] }));
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.store.dispatch( setSelectedSailors({ sailors: [] }))),
      map( formState => formState.value ),
      map( sailor => {
        if ( sailor.id === undefined ) {
          return addSailor({ sailor, redirectTo: { path: ['/sailor'] }});
        } else {
          return updateSailor( { sailor, redirectTo: { path: ['/sailor'] }});
        }
      })
    ).subscribe( this.store );
  }

  // public accessors and mutators

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading = this.store.select( fromAppReducer.getIsLoading );
  }
}
