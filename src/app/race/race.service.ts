import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { from, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Race } from './race';
import { UiService } from '../shared/ui.service';
import * as fromRaceReducer from './race-management.reducer';
import * as RACE from './race-management.actions';
import * as UI from '../shared/ui.actions';
import { RaceManagementState } from './race-management.reducer';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private raceCollection: AngularFirestoreCollection<Race>;
  private firebaseSubscriptions: Subscription[] = [];

  constructor( private db: AngularFirestore, private uiService: UiService, private store: Store<fromRaceReducer.RaceManagementState> ) {
    this.raceCollection = this.db.collection<Race>( 'races' );
  }

  // public accessors and mutators
  fetchRaces() {
    this.store.dispatch( new UI.StartLoading() );
    this.firebaseSubscriptions.push( this.raceCollection.snapshotChanges().pipe(
      map( actions => actions.map( action => {
        return {
          id: action.payload.doc.id,
          title: action.payload.doc.data().title,
          fromDate: action.payload.doc.data().fromDate,
          toDate: action.payload.doc.data().toDate,
          country: action.payload.doc.data().country,
          place: action.payload.doc.data().place,
          organizer: action.payload.doc.data().organizer,
          state: action.payload.doc.data().state
        };
      })))
      .subscribe(( races: Race[] ) => {
        this.store.dispatch( new UI.StopLoading() );
        this.store.dispatch( new RACE.FetchRacesAction( races ));
      }, error => {
        this.store.dispatch( new UI.StopLoading() );
        this.store.dispatch( new RACE.FetchRacesAction( null ));
        this.uiService.showSnackbar( error.message, null, 5000 );
      }));
  }

  saveOrUpdateRace( race: Race ): Observable<Race> {
    return from( this.saveRace( race ));
  }

  // private helper methods
  private saveRace( race: Race ): Promise<Race> {
    if ( race.id === undefined ) {
      race = {...race };
      delete race.id;
    }
    return new Promise<Race>(( resolve, reject ) => {
      this.raceCollection
        .add( race )
        .then(res => {}, err => reject( err ));
    });
  }
}
