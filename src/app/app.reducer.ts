import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { BaseRouterStoreState, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromUiReducer from './shared/ui/ui.reducer';
import * as fromAuthReducer from './authentication/auth.reducer';
import { environment } from '../environments/environment';
import { IEntityState } from '@briebug/ngrx-auto-entity';
import { Lap } from './race/domain/lap';
import { lapReducer } from './race/lap/lap.state';

export interface AppState {
   auth: fromAuthReducer.AuthState;
   ui: fromUiReducer.UiState;
   router: RouterReducerState<BaseRouterStoreState>;
   lap: IEntityState<Lap>;
}

export const appReducers: ActionReducerMap<AppState> = {
   auth: fromAuthReducer.authReducer,
   ui: fromUiReducer.uiReducer,
   router: routerReducer,
   lap: lapReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];

export const getUiState = createFeatureSelector<fromUiReducer.UiState>( 'ui' );
export const getIsLoading = createSelector( getUiState, fromUiReducer.getIsLoading );
