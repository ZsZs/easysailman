import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Race } from '../../race/domain/race';
import { BaseEntityInterface } from '../firestore/base-entity.interface';

export abstract class BaseResolver<T> implements Resolve<T> {

  constructor( protected parameterName: string, protected store: Store<AppState> ) {}

  resolve( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Observable<T> {
    const idParameter = this.resolveParameter( route, this.parameterName );
    let entity: Observable<T>;
    if ( idParameter === 'new' ) {
      entity = this.resolveNewEntity( route );
    } else {
      entity = this.resolveEntity( idParameter, route );
    }

    return entity;
  }

  // protected, private helper methods
  protected abstract resolveNewEntity( route: ActivatedRouteSnapshot ): Observable<T>;
  protected abstract resolveEntity( entityId: string, route: ActivatedRouteSnapshot ): Observable<T>;

  protected resolveParameter( route: ActivatedRouteSnapshot, parameterName: string ) {
    return route.params[parameterName];
  }
}
