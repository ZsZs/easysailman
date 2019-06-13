import { ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromUiReducer from './shared/ui.reducer';
import * as fromAuthReducer from './authentication/auth.reducer';
import { environment } from '../environments/environment';

export interface AppState {
   auth: fromAuthReducer.AuthState;
   ui: fromUiReducer.UiState;
}

export const appReducers: ActionReducerMap<AppState> = {
   auth: fromAuthReducer.authReducer,
   ui: fromUiReducer.uiReducer
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [storeFreeze] : [];

export const getAuthState = createFeatureSelector<fromAuthReducer.AuthState>( 'auth' );
export const getIsAuthenticated = createSelector( getAuthState, fromAuthReducer.getIsAuthenticated );

export const getUiState = createFeatureSelector<fromUiReducer.UiState>( 'ui' );
export const getIsLoading = createSelector( getUiState, fromUiReducer.getIsLoading );
