import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class RouteStateService {
  private pathParameterState = new BehaviorSubject<{paramName, paramValue}>({paramName: '', paramValue: ''});
  public pathParameter: Observable<{paramName, paramValue}>;

  constructor() {
    this.pathParameter = this.pathParameterState.asObservable();
  }

  public updatePathParameterState( paramName: string, paramValue: string ) {
    this.pathParameterState.next({ paramName, paramValue });
  }

  // properties
}
