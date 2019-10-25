import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Lap } from '../../domain/lap';
import { LapFacade } from '../lap.facade';
import { filter, map, takeLast, tap } from 'rxjs/operators';
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
  selectedLapKey = 1;
  selectedRace: Observable<Race>;

  constructor( private lapFacade: LapFacade ) { }

  // component lifecyle handling methods
  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this.numberOfLapsSubscription.unsubscribe();
  }

  ngOnInit() {
    this.selectedRace = this.lapFacade.retrieveFirstSelectedRaceFromStore();
    this.lapFacade.loadLapsForSelectedRace();
    this.numberOfLapsSubscription = this.lapFacade.getNumberOfLaps().subscribe( count => {
      this.numberOfLaps = count;
    });
  }

  // event handling methods
  addLap() {
    const newLap = new Lap();
    newLap.raceId = this.lapFacade.getRaceId();
    this.lapFacade.total$.pipe(
      takeLast(1),
      map( count => count ? count : 0 )
    ).subscribe( countOfLaps => {
      newLap.index = countOfLaps + 1;
      this.lapFacade.create( newLap );
    });
  }

  nextLap() {
    if ( this.selectedLapKey < this.numberOfLaps - 1) {
      this.selectedLapKey = this.selectedLapKey + 1;
      this.changeSelectedLap( this.selectedLapKey );
    }
  }

  previousLap() {
    if ( this.selectedLapKey > 0 ) {
      this.selectedLapKey = this.selectedLapKey - 1;
      this.changeSelectedLap( this.selectedLapKey );
    }
  }

  deleteLap() {}

  // protected, private helper methods
  private changeSelectedLap( index: number ) {
    this.lapFacade.selectByKey( index );
  }
}
