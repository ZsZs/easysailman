import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { YachtClub } from './yacht-club';

@Injectable({
  providedIn: 'root'
})
export class YachtClubService {
  private yachtClubCollection: AngularFirestoreCollection<YachtClub>;
  private firebaseSubscriptions: Subscription[] = [];

  constructor( private db: AngularFirestore ) {
    this.yachtClubCollection = this.db.collection<YachtClub>( 'yacht-clubs' );
  }

  // public accessors and mutators
  findById( yachtClubId: string ): Observable<YachtClub> {
    return this.yachtClubCollection.doc( yachtClubId ).get().pipe(
      map( document => {
        const data: YachtClub = document.data() as YachtClub;
        const id = document.id;
        return { id, ...data };
      })
    );
  }

  fetchAll(): Observable<YachtClub[]> {
    return this.yachtClubCollection.snapshotChanges().pipe(
      map( actions => {
        return actions.map( action => {
          const data: YachtClub = action.payload.doc.data() as YachtClub;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  saveOrUpdate( yachtClub: YachtClub ): Observable<YachtClub> {
    return from( this.save( yachtClub ));
  }

  // private helper methods
  private save( yachtClub: YachtClub ): Promise<YachtClub> {
    if ( yachtClub.id === undefined ) {
      yachtClub = {...yachtClub };
      delete yachtClub.id;
    }
    return new Promise<YachtClub>(( resolve, reject ) => {
      this.yachtClubCollection
        .add( yachtClub )
        .then(res => {}, err => reject( err ));
    });
  }
}
