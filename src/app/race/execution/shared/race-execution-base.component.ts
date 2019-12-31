import { OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, takeUntil, tap } from 'rxjs/operators';
import { PathVariables } from '../../path-variables';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { RouteStateService } from '../../../shared/router/route-state.service';
import { tabIsActive, tabIsInActive } from '../../../shared/ui/ui.actions';
import { ComponentDestroyService } from '../../../shared/component-destroy.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import * as fromAppReducer from '../../../app.reducer';

export abstract class RaceExecutionBaseComponent implements OnDestroy, OnInit {
  isLoading$: Observable<boolean>;
  private componentDestroy = new Subject<void>();
  private routeParametersSubsciption: Subscription;
  private routeSegmentsSubsciption: Subscription;

  constructor(
    protected route: ActivatedRoute,
    protected routeState: RouteStateService,
    protected componentDestroyService: ComponentDestroyService,
    protected store: Store<AppState>,
    protected tabName: string
  ) {}

  // event handling methods
  ngOnDestroy(): void {
    this.componentDestroy.next();
    this.routeParametersSubsciption.unsubscribe();
    this.routeSegmentsSubsciption.unsubscribe();
    this.componentDestroyService.unsubscribeComponent$.next();
    this.store.dispatch( tabIsInActive( { tabName: this.tabName }));
  }

  ngOnInit(): void {
    this.subscribeToRouteParameters();
    this.subscribeToRouteSegments();
    this.subscribeToLoading();
    this.store.dispatch( tabIsActive( { tabName: this.tabName }));
  }

  // protected, private helper methods
  private subscribeToLoading() {
    this.isLoading$ = this.store.select( fromAppReducer.getIsLoading );
  }

  private subscribeToRouteParameters() {
    this.routeParametersSubsciption = this.route.paramMap.pipe(
      takeUntil( this.componentDestroy )
    ).subscribe( parameters => {
      if ( parameters.get( PathVariables.raceID )) {
        this.routeState.updatePathParameterState( PathVariables.raceID, parameters.get( PathVariables.raceID ));
      }
      if ( parameters.get( PathVariables.lapID )) {
        this.routeState.updatePathParameterState( PathVariables.lapID, parameters.get( PathVariables.lapID ));
      }
    });
  }

  private subscribeToRouteSegments() {
    this.routeSegmentsSubsciption = this.route.url.pipe(
      map( url => {
        const lastSegment: string = url[url.length - 1].path;
        this.routeState.updateUrlSegmentState( lastSegment );
        return of( lastSegment );
      })
    ).subscribe();
  }
}
