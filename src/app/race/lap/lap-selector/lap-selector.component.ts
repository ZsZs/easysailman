import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Lap } from '../../domain/lap';
import { LapFacade } from '../lap.facade';
import { filter, map, take, takeLast, tap } from 'rxjs/operators';
import { Race } from '../../domain/race';
import { getSelectedRaces } from '../../race.reducer';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';

@Component({
  selector: 'srm-lap-selector',
  templateUrl: './lap-selector.component.html',
  styleUrls: ['./lap-selector.component.css']
})
export class LapSelectorComponent implements AfterViewInit, OnDestroy, OnInit {
  numberOfLaps = 0;
  numberOfLapsSubscription: Subscription;
  routeChangeSubscription: Subscription;
  selectedLap: Lap;
  selectedLapSubscription: Subscription;
  selectedRace: Observable<Race>;

  constructor( private lapFacade: LapFacade, private router: Router, private route: ActivatedRoute ) { }

  // component lifecyle handling methods
  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this.routeChangeSubscription.unsubscribe();
    this.numberOfLapsSubscription.unsubscribe();
    this.selectedLapSubscription.unsubscribe();
  }

  ngOnInit() {
    this.selectedRace = this.lapFacade.retrieveFirstSelectedRaceFromStore();
    this.subscribeToRouteChange();
    this.subscribeToNumberOfLaps();
    this.subscribeToSelectedLap();
  }

  // event handling methods
  addLap() {
    const newLap = new Lap();
    this.lapFacade.retrieveFirstSelectedRaceFromStore().pipe(
      map( race => {
        newLap.raceId = race.id;
        newLap.index = this.numberOfLaps + 1;
        this.lapFacade.create( newLap );
        this.changeSelectedLap( newLap.index );
      })
    );
  }

  canNext() {
    return this.selectedLap ? this.selectedLap.index < this.numberOfLaps : false;
  }

  canPrevious() {
    return this.selectedLap ? this.selectedLap.index > 1 : false;
  }

  nextLap() {
    if ( this.canNext() ) {
      const newLapIndex = this.selectedLap.index + 1;
      this.changeSelectedLap( newLapIndex );
    }
  }

  previousLap() {
    if ( this.canPrevious() ) {
      const newLapIndex = this.selectedLap.index - 1;
      this.changeSelectedLap( newLapIndex );
    }
  }

  deleteLap() {}

  // protected, private helper methods
  private changeSelectedLap( index: number ) {
    this.lapFacade.selectByKey( index );
  }

  private subscribeToNumberOfLaps() {
    this.numberOfLapsSubscription = this.lapFacade.total$.subscribe( count => {
      this.numberOfLaps = count;
      if ( this.numberOfLaps > 0 ) {
        this.changeSelectedLap( 1 );
      }
    });
  }

  private subscribeToRouteChange() {
    this.routeChangeSubscription = this.route.paramMap.subscribe( parameters => {
      this.lapFacade.loadLapsForSelectedRace();
    });
  }
  private subscribeToSelectedLap() {
    this.selectedLapSubscription = this.lapFacade.current$.subscribe( lap => {
      if ( lap ) {
        this.selectedLap = lap;
        this.updateLapIndexInRoute();
      }
    });
  }

  private updateLapIndexInRoute() {
    const urlFragment = this.determineLastUrlFragment();
    if ( this.selectedLap ) {
      this.router.navigateByUrl( 'race-execution/' + this.selectedLap.raceId + '/lap/' + this.selectedLap.index + '/' + urlFragment );
    }
  }

  private determineLastUrlFragment() {
    return 'participants';
  }
}
