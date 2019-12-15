import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Lap } from '../../domain/lap';
import { LapFacade } from '../lap.facade';
import { filter, map, take, takeLast, tap } from 'rxjs/operators';
import { Race } from '../../domain/race';
import { getSelectedRaces } from '../../race.reducer';

@Component({
  selector: 'srm-lap-selector',
  templateUrl: './lap-selector.component.html',
  styleUrls: ['./lap-selector.component.css']
})
export class LapSelectorComponent implements AfterViewInit, OnDestroy, OnInit {
  numberOfLaps = 0;
  numberOfLapsSubscription: Subscription;
  selectedLap: Lap;
  selectedLapSubscription: Subscription;
  selectedRace: Observable<Race>;

  constructor( private lapFacade: LapFacade ) { }

  // component lifecyle handling methods
  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this.numberOfLapsSubscription.unsubscribe();
    this.selectedLapSubscription.unsubscribe();
  }

  ngOnInit() {
    this.selectedRace = this.lapFacade.retrieveFirstSelectedRaceFromStore();
    this.lapFacade.loadLapsForSelectedRace();
    this.subscribeToNumberOfLaps();
    this.subscribeToSelectedLap();
  }

  // event handling methods
  addLap() {
    const newLap = new Lap();
    newLap.raceId = this.lapFacade.getRaceId();
    newLap.index = this.numberOfLaps + 1;
    this.lapFacade.create( newLap );
    this.changeSelectedLap( newLap.index );
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
      this.updateLapIndexInRoute( newLapIndex );
    }
  }

  previousLap() {
    if ( this.canPrevious() ) {
      const newLapIndex = this.selectedLap.index - 1;
      this.changeSelectedLap( newLapIndex );
      this.updateLapIndexInRoute( newLapIndex );
    }
  }

  deleteLap() {}

  // protected, private helper methods
  private changeSelectedLap( index: number ) {
    this.lapFacade.selectByKey( index );
  }

  private subscribeToNumberOfLaps() {
    this.numberOfLapsSubscription = this.lapFacade.getNumberOfLaps().subscribe( count => {
      this.numberOfLaps = count;
      this.changeSelectedLap( 1 );
    });
  }

  private subscribeToSelectedLap() {
    this.selectedLapSubscription = this.lapFacade.retrieveSelectedLapFromStore().subscribe( lap => {
      this.selectedLap = lap;
    });
  }

  private updateLapIndexInRoute( index: number ) {

  }
}
