import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RaceSelectComponent } from '../race-select/race-select.component';
import { LapFacade } from '../lap/lap.facade';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'srm-race-execution',
  templateUrl: './race-execution.component.html',
  styleUrls: ['./race-execution.component.css']
})
export class RaceExecutionComponent implements OnDestroy, OnInit {
  private dialogSubscription: Subscription;

  constructor( public dialog: MatDialog, private lapFacade: LapFacade ) {
  }

  // Component lifecycle events
  ngOnDestroy(): void {
    this.dialogSubscription.unsubscribe();
  }

  ngOnInit() {
    this.openRaceSelectDialog();
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
}
