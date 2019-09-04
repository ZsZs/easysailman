import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const routerGo = createAction( '[Router] Go', props<{ path: any[], queryParams?: object, extras?: NavigationExtras }>());
export const routerBack = createAction( '[Router] Back' );
export const routerForward = createAction( '[Router] Forward' );
export const routeChange = createAction( '[Router] Route Change', props<{ params: any, path: string }>());

