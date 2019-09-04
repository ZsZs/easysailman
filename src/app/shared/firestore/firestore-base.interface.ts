import { Observable } from 'rxjs';

export interface FirestoreBaseServiceInterface<T> {
  add( item: T): Promise<T>;
  delete( id: string ): void;
  findById( id: string ): Observable<T>;
  findAll(): Observable<T[]>;
  update( item: T ): Promise<T>;
}
