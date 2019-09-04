import { Action } from '@ngrx/store';
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { routeChange } from './router.actions';

export function ofRoute(route: string | string[]): OperatorFunction<Action, Action> {
  return filter((action: Action) => {
    const isRouteAction = action.type === '[Router] Route Change';
    if (isRouteAction) {
      // @ts-ignore
      const routeAction = action as routeChange;
      const routePath = routeAction.payload.path;
      if (Array.isArray(route)) {
        return route.includes(routePath);
      } else {
        return routePath === route;
      }
    }
    return isRouteAction;
  });
}
