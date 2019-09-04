import { FirestoreBaseServiceInterface } from './firestore-base.interface';
import { NGXLogger } from 'ngx-logger';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FirestoreBaseEntityInterface } from './firestore-base-entity.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export abstract class FirestoreBaseService<T extends FirestoreBaseEntityInterface> implements FirestoreBaseServiceInterface<T> {
  protected collection: AngularFirestoreCollection<T>;

  constructor( path: string, protected firestore: AngularFirestore ) {
    this.collection = this.firestore.collection( path );
  }

  add( item: T): Promise<T> {
    // this.logger.debug( '[FirestoreService] adding item', item );

    item = {...item };
    delete item.id;

    const promise = new Promise<T>((resolve, reject ) => {
      this.collection.add( item ).then( ref => {
        const newItem = {
          id: ref.id,
          /* workaround until spread works with generic types */
          ...( item as any)
        };
        resolve(newItem);
      });
    });
    return promise;
  }

  delete( id: string ): void {
    // this.logger.debug(`[FirestoreService] deleting item ${id}`);

    const docRef = this.collection.doc<T>(id);
    docRef.delete();
  }

  findById( identifier: string): Observable<T> {
    // this.logger.debug( `[FirestoreService] get: ${identifier}` );

    return this.collection.doc<T>(identifier).snapshotChanges().pipe(
        map(doc => {
          if ( doc.payload.exists ) {
            /* workaround until spread works with generic types */
            const data = doc.payload.data() as any;
            const id = doc.payload.id;
            return { id, ...data };
          }
        })
      );
  }

  findAll(): Observable<T[]> {
    // this.logger.debug( '[FirestoreService] findAll');

    return this.collection.snapshotChanges().pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as T;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }

  update( item: T ): Promise<T> {
    // this.logger.debug(`[FirestoreService] updating item ${item.id}`);

    const promise = new Promise<T>((resolve, reject) => {
      const docRef = this.collection
        .doc<T>(item.id)
        .set(item)
        .then(() => {
          resolve({
            ...(item as any)
          });
        });
    });
    return promise;
  }
}
