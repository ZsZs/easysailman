import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, of, Subscription } from 'rxjs';
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
  delete( raceId: string ): Observable<void> {
    return from( this.raceCollection.doc( raceId ).delete() );
  }

  deleteBatch( raceIds: string[] ) {
  }

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
    const raceId = race.id;
    race = {...race };
    delete race.id;
    if ( raceId ) {
      return from( this.updateRace( raceId, race ));
    } else {
      return from( this.addRace( race ));
    }
  }

  // private helper methods
  private addRace( race: Race ): Promise<Race> {
    return this.raceCollection.add( race ).then( () => race );
  }

  private updateRace( raceId: string, race: Race ): Promise<Race> {
    return this.raceCollection.doc( raceId ).set( race, { merge: true }).then( res => {
          console.log( 'Colection SET response: ' + res );
          return race;
        });
  }
}
