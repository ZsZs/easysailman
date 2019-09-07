import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RaceSelectComponent } from '../common/select/race-select.component';

@Component({
  selector: 'srm-race-execution',
  templateUrl: './race-execution.component.html',
  styleUrls: ['./race-execution.component.css']
})
export class RaceExecutionComponent implements OnInit {

  constructor( public dialog: MatDialog ) {}

  ngOnInit() {
    this.openRaceSelectDialog();
  }

  // protected, private helper methods
  private openRaceSelectDialog(): void {
    const dialogRef = this.dialog.open( RaceSelectComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
