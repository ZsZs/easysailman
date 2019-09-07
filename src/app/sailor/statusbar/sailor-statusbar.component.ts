import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../../app.reducer';
import { getSelectedSailors } from '../sailor.reducer';
import { Sailor } from '../sailor';

@Component({
  selector: 'srm-sailor-statusbar',
  templateUrl: './sailor-statusbar.component.html',
  styleUrls: ['./sailor-statusbar.component.css']
})
export class SailorStatusbarComponent implements OnInit {
  selectedSailors: Observable<Sailor[]>;

  constructor( private authService: AuthService, private store: Store<fromAppReducer.AppState> ) { }

  ngOnInit() {
    this.selectedSailors = this.store.select( getSelectedSailors );
  }
}
