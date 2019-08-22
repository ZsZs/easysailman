import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sailor } from './sailor';

@Injectable({
  providedIn: 'root'
})
export class SailorService {
  private sailorCollection: AngularFirestoreCollection<Sailor>;
  private firebaseSubscriptions: Subscription[] = [];

  constructor( private db: AngularFirestore ) {
    this.sailorCollection = this.db.collection<Sailor>( 'sailors' );
  }

  // public accessors and mutators
  findRaceById( sailorId: string ): Observable<Sailor> {
    return this.sailorCollection.doc( sailorId ).get().pipe(
      map( document => {
        const data: Sailor = document.data() as Sailor;
        const id = document.id;
        return { id, ...data };
      })
    );
  }

  fetchRaces(): Observable<Sailor[]> {
    return this.sailorCollection.snapshotChanges().pipe(
      map( actions => {
        return actions.map( action => {
          const data: Sailor = action.payload.doc.data() as Sailor;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  saveOrUpdateRace( sailor: Sailor ): Observable<Sailor> {
    return from( this.saveRace( sailor ));
  }

  // private helper methods
  private saveRace( sailor: Sailor ): Promise<Sailor> {
    if ( sailor.id === undefined ) {
      sailor = {...sailor };
      delete sailor.id;
    }
    return new Promise<Sailor>(( resolve, reject ) => {
      this.sailorCollection
        .add( sailor )
        .then(res => {}, err => reject( err ));
    });
  }
}
