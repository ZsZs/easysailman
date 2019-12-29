import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentDestroyService } from '../../../shared/component-destroy.service';
import { select, Store } from '@ngrx/store';
import * as fromRaceReducer from '../../race.reducer';
import { Registration } from '../../domain/registration';
import { BaseEntityCollectionComponent } from '../../../shared/generic-components/base-entity-collection.component';
import { getFirstSelectedRace } from '../../race.reducer';
import { allRegistrationsRequested } from '../../registration/registration.actions';
import { delay, filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { getRegistrations } from '../../registration/registration.reducer';
import { AppState } from '../../../app.reducer';
import { RouteStateService } from '../../../shared/router/route-state.service';
import { raceRequested } from '../../race.actions';
import { PathVariables } from '../../path-variables';

@Component({
  selector: 'srm-race-participants',
  templateUrl: './race-participant-list.component.html',
  styleUrls: ['./race-participant-list.component.css']
})

export class RaceParticipantListComponent extends BaseEntityCollectionComponent<Registration> implements OnDestroy, OnInit {
  private static readonly featureDescriptor = {
    name: 'participants',
    allEntitiesSelector: getRegistrations,
    baseRoute: 'race-execution/participants',
    tabName: 'race-execution-participants'
  };
  private componentDestroy = new Subject<void>();
  private routeParametersSubsciption: Subscription;

  constructor(
    protected router: Router,
    private route: ActivatedRoute,
    protected subscriptionService: ComponentDestroyService,
    protected store: Store<fromRaceReducer.RaceManagementState>,
    private routeState: RouteStateService ) {
    super( router, subscriptionService, store, RaceParticipantListComponent.featureDescriptor );
  }

  // event handling methods
  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.componentDestroy.next();
    this.routeParametersSubsciption.unsubscribe();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.subscribeToRouteParameters();
  }

  // protected, private helper methods
  protected detailsRoute( entityId: string ): string {
    return '';
  }

  protected dispatchAllEntitiesRequestedAction(): Observable<any> {
    return this.store.pipe(
      select( getFirstSelectedRace ),
      filter( lap => !!lap ),
      tap( race => this.store.dispatch( allRegistrationsRequested({ raceId: race.id })))
    );
  }

  protected dispatchSelectedEntitiesAction( entities: Registration[] ) {
    // there is no need to change manipulate selected registrations in this component
  }

  protected subscribeToSourceData(): Subscription {
    return this.store.select( getRegistrations ).subscribe( ( data: Registration[] ) => {
        this.dataSource = of( data );
      });
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
}
