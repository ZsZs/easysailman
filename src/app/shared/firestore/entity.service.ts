import { Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { from, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class EntityService implements IAutoEntityService<any> {
  protected collection: AngularFirestoreCollection<any>;

  constructor( protected firestore: AngularFirestore ) {}

  load(entityInfo: IEntityInfo, id: any): Observable<any> {
    this.collection = this.firestore.collection( entityInfo.modelName );

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

  loadAll( entityInfo: IEntityInfo ): Observable<any[]> {
    this.collection = this.firestore.collection( entityInfo.modelName );

    return this.collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as any;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  create(entityInfo: IEntityInfo, entity: any): Observable<any> {
    this.collection = this.firestore.collection( entityInfo.modelName );
    delete entity.id;

    const promise = new Promise<any>((resolve, reject ) => {
      this.collection.add( entity ).then( ref => {
        const newEntity = {
          id: ref.id,
          /* workaround until spread works with generic types */
          ...( entity as any)
        };
        resolve(newEntity);
      });
    });
    return from( promise );
  }

  update(entityInfo: IEntityInfo, entity: any): Observable<any> {
    this.collection = this.firestore.collection( entityInfo.modelName );

    const promise = new Promise<any>((resolve, reject) => {
      const docRef = this.collection
        .doc<any>( entity.id )
        .set( entity )
        .then(() => {
          resolve({
            ...( entity as any)
          });
        });
    });
    return from( promise );
  }

  delete(entityInfo: IEntityInfo, entity: any): Observable<any> {
    this.collection = this.firestore.collection( entityInfo.modelName );

    const docRef = this.collection.doc<any>( entity.id );
    return from( docRef.delete());
  }
}
