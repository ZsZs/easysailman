import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Race } from './race';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  private raceCollection: AngularFirestoreCollection<Race>;
  private firebaseSubscriptions: Subscription[] = [];

  constructor( private db: AngularFirestore ) {
    this.raceCollection = this.db.collection<Race>( 'races' );
  }

  // public accessors and mutators
  findRaceById( raceId: string ): Observable<Race> {
    return this.raceCollection.doc( raceId ).get().pipe(
      map( document => {
        const data: Race = document.data() as Race;
        const id = document.id;
        return { id, ...data };
      })
    );
  }

  fetchRaces(): Observable<Race[]> {
    return this.raceCollection.snapshotChanges().pipe(
      map( actions => {
        return actions.map( action => {
          const data: Race = action.payload.doc.data() as Race;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
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
