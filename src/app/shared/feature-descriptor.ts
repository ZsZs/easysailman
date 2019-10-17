import { AppState } from '../app.reducer';
import { MemoizedSelector } from '@ngrx/store';
import App = firebase.app.App;

export interface FeatureDescriptor {
  name: string;
  ngrxState?: AppState;
  allEntitiesSelector?: any;
  detailsRoute?: string;
  listRoute?: string;
  tabName?: string;
}
