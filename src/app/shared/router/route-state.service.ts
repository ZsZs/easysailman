import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class RouteStateService {
  private pathParameterState = new BehaviorSubject<{paramName, paramValue}>({paramName: '', paramValue: ''});
  public pathParameter: Observable<{paramName, paramValue}>;
  public urlSegment: Observable<string>;
  private urlSegmentState = new BehaviorSubject<string>('');

  constructor() {
    this.pathParameter = this.pathParameterState.asObservable();
    this.urlSegment = this.urlSegmentState.asObservable();
  }

  public updatePathParameterState( paramName: string, paramValue: string ) {
    this.pathParameterState.next({ paramName, paramValue });
  }

  public updateUrlSegmentState( segment: string ) {
    this.urlSegmentState.next( segment );
  }

  // properties
}
