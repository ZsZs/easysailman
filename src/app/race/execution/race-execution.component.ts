import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RaceSelectComponent } from '../race-select/race-select.component';
import { LapFacade } from '../lap/lap.facade';
import { Observable, of, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { getFirstSelectedRace } from '../race.reducer';
import { PathVariables } from '../path-variables';
import { raceRequested, raceRequestedAndSelect } from '../race.actions';
import { RouteStateService } from '../../shared/router/route-state.service';
import { Race } from '../domain/race';
import { Lap } from '../domain/lap';

@Component({
  selector: 'srm-race-execution',
  templateUrl: './race-execution.component.html',
  styleUrls: ['./race-execution.component.css']
})
export class RaceExecutionComponent implements AfterViewInit, OnDestroy, OnInit {
  private dialogSubscription: Subscription;
  private lapId$: Observable<string> = of( null );
  private lastUrlSegment$: Observable<string>;
  private lastUrlSegmentSubscription: Subscription;
  private raceId$: Observable<string> = of( null );
  private lapIdSubscription: Subscription;
  private lapParametersSubsciption: Subscription;
  private raceIdSubscription: Subscription;
  private raceParametersSubsciption: Subscription;
  public selectedLap$: Observable<Lap>;
  public selectedRace$: Observable<Race>;

  constructor( public dialog: MatDialog, private routeState: RouteStateService, private store: Store<AppState>, private lapFacade: LapFacade ) {}

  // Component lifecycle events
  ngAfterViewInit(): void {
    this.subscribeToRaceId();
    this.subscribeToLapId();
  }

  ngOnDestroy(): void {
    if ( this.dialogSubscription ) { this.dialogSubscription.unsubscribe(); }
    this.lapIdSubscription.unsubscribe();
    this.lapParametersSubsciption.unsubscribe();
    this.raceIdSubscription.unsubscribe();
    this.raceParametersSubsciption.unsubscribe();
    this.lastUrlSegmentSubscription.unsubscribe();
  }

  ngOnInit() {
    this.subscribeToRaceIdParameter();
    this.subscribeToLapIdParameter();
    this.subscribeToLastUrlSegment();
    this.retrieveSelectedRace();
    this.retrieveSelectedLap();
  }

  // protected, private helper methods
  private openRaceSelectDialog(): void {
    const dialogRef = this.dialog.open( RaceSelectComponent, {
      width: '600px',
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      console.log('The select race dialog was closed');
    });
  }

  private retrieveSelectedLap() {
    this.selectedLap$ = this.lapFacade.current$;
  }

  private retrieveSelectedRace() {
    this.selectedRace$ = this.store.select( getFirstSelectedRace );
  }

  private subscribeToLapId() {
    this.lapIdSubscription = this.lapId$.pipe(
      switchMap( lapId => this.store.select( getFirstSelectedRace )),
      filter( (race: Race) => !!race ),
      tap( (race: Race) => this.lapFacade.loadLapsForRace( race.id ))
    ).subscribe();
  }

  private subscribeToLapIdParameter() {
    this.lapParametersSubsciption = this.routeState.pathParameter.pipe(
      filter( parameter => parameter.paramName === PathVariables.lapID ),
      map( parameter => parameter.paramValue ),
      tap( lapId => this.lapId$ = of( lapId )),
    ).subscribe();
  }

  private subscribeToLastUrlSegment() {
    this.lastUrlSegmentSubscription = this.routeState.urlSegment.pipe(
      filter( urlSegment => !!urlSegment )
    ).subscribe(
      urlSegment => this.lastUrlSegment$ = of( urlSegment )
    );
  }
  private subscribeToRaceId() {
    this.raceIdSubscription = this.raceId$.pipe(
      map( raceId => {
        if ( raceId === 'undefined' ) {
//          this.openRaceSelectDialog();
        } else {
          this.store.dispatch( raceRequestedAndSelect({ raceId }));
        }
      })
    ).subscribe();
  }

  private subscribeToRaceIdParameter() {
    this.raceParametersSubsciption = this.routeState.pathParameter.pipe(
      filter( parameter => parameter.paramName === PathVariables.raceID ),
      map( parameter => parameter.paramValue ),
      tap( raceId => this.raceId$ = of( raceId )),
    ).subscribe();
  }
}
