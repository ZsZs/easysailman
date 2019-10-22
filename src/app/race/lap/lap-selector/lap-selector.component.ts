import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Lap } from '../../domain/lap';
import { LapFacade } from '../lap.facade';

@Component({
  selector: 'srm-lap-selector',
  templateUrl: './lap-selector.component.html',
  styleUrls: ['./lap-selector.component.css']
})
export class LapSelectorComponent implements OnInit {
  selectedRound: Observable<Lap | undefined>;

  constructor( lapFacade: LapFacade ) { }

  ngOnInit() {
  }

}
