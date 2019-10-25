import { Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lap } from '../domain/lap';

@Injectable()
export class LapService implements IAutoEntityService<Lap> {
  static readonly racesPath = 'races';
  static readonly lapsPath = 'laps';
  protected collection: AngularFirestoreCollection<any>;

  constructor( protected firestore: AngularFirestore ) {}

  load(entityInfo: IEntityInfo, id: any, raceId: string ): Observable<Lap> {
    this.updateCollectionReferenceToLaps( raceId );

    return this.collection.doc<any>(id).snapshotChanges().pipe(
      map(doc => {
        if ( doc.payload.exists ) {
          /* workaround until spread works with generic types */
          const data = doc.payload.data() as any;
          const docId = doc.payload.id;
          return { docId, ...data };
        }
      })
    );
  }

  loadAll( entityInfo: IEntityInfo, raceId: string ): Observable<any[]> {
    this.updateCollectionReferenceToLaps( raceId );

    return this.collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as any;
          return data;
        });
      })
    );
  }

  create(entityInfo: IEntityInfo, entity: Lap ): Observable<any> {
    this.updateCollectionReferenceToLaps( entity.raceId );

    const promise = new Promise<Lap>((resolve, reject ) => {
      this.collection.doc<Lap>( String( entity.index ) ).set( { ...entity } ).then( ref => {
        const newEntity = {
          ...(entity as any)
        };
        resolve( newEntity );
      });
    });
    return from( promise );
  }

  update(entityInfo: IEntityInfo, entity: Lap ): Observable<any> {
    this.updateCollectionReferenceToLaps( entity.raceId );

    const promise = new Promise<any>((resolve, reject) => {
      const docRef = this.collection
        .doc<Lap>( String( entity.index ))
        .set( entity )
        .then(() => {
          resolve({
            ...( entity as any)
          });
        });
    });
    return from( promise );
  }

  delete(entityInfo: IEntityInfo, entity: Lap ): Observable<any> {
    this.updateCollectionReferenceToLaps( entity.raceId );

    const docRef = this.collection.doc<any>( String( entity.index ));
    return from( docRef.delete());
  }

  // protected, private helper methods
  updateCollectionReferenceToLaps( raceId: string ) {
    this.collection = this.firestore.collection( LapService.racesPath ).doc( raceId ).collection<Lap>( LapService.lapsPath );
  }
}
