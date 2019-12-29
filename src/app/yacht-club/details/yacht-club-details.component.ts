import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroupState } from 'ngrx-forms';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import * as fromAppReducer from '../../app.reducer';
import { YachtClub } from '../yacht-club';
import { State } from '../yacht-club.reducer';
import { YachtClubResolver } from '../yacht-club.resolver';
import { addYachtClub, setSelectedYachtClubs, updateYachtClub } from '../yacht-club.actions';
import { routerGo } from '../../shared/router/router.actions';
import { ComponentDestroyService } from '../../shared/component-destroy.service';

@Component({
  selector: 'srm-yacht-club-details',
  templateUrl: './yacht-club-details.component.html',
  styleUrls: ['./yacht-club-details.component.css']
})
export class YachtClubDetailsComponent implements OnDestroy, OnInit {
  formState$: Observable<FormGroupState<YachtClub>>;
  submittedValue$: Observable<YachtClub | undefined>;
  isLoading: Observable<boolean>;

  constructor( private subscriptionService: ComponentDestroyService, private store: Store<State>, @Inject(YachtClubResolver) private yachtClub: Observable<YachtClub> ) {
    this.formState$ = this.store.pipe( select(state => state.yachtClubManagement.yachtClubDetailsForm ));
    this.submittedValue$ = yachtClub;
  }

  // event handling methods
  ngOnDestroy(): void {
    this.subscriptionService.unsubscribeComponent$.next();
  }

  ngOnInit() {
    this.subscribeToLoading();
  }

  onCancel() {
    this.store.dispatch( setSelectedYachtClubs({ yachtClubs: [] }));
    this.store.dispatch( routerGo({ path: ['/yacht-club'] }));
  }

  onSubmit() {
    this.formState$.pipe(
      take(1),
      tap( () => this.store.dispatch( setSelectedYachtClubs({ yachtClubs: [] }))),
      map( formState => formState.value ),
      map(yachtClub => {
        if ( yachtClub.id === undefined ) {
          return addYachtClub({ yachtClub, redirectTo: { path: ['/yacht-club'] }});
        } else {
          return updateYachtClub( { yachtClub, redirectTo: { path: ['/yacht-club'] }});
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
