import { Action, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { startLoading, stopLoading, tabIsActive, tabIsInActive } from './ui.actions';
import { RaceManagementState } from '../../race/race.reducer';

export interface UiState {
   isLoading: boolean;
   activeTabs: string[];
}

const initialState: UiState = {
  isLoading: false,
  activeTabs: []
};

export const uiReducer = createReducer(
   initialState,
   on( startLoading, ( state, action ) => {
      return { ...state, isLoading: true };
   }),
  on( stopLoading, ( state, action ) => {
     return { ...state, isLoading: false };
  }),
  on( tabIsActive, ( state, action ) => {
    const activeTabs = [...state.activeTabs];
    activeTabs.push( action.tabName );
    return { ...state, activeTabs };
  }),
  on( tabIsInActive, ( state, action ) => {
    const activeTabs = state.activeTabs.filter( tabName => tabName !== action.tabName );
    return { ...state, activeTabs };
  })
);

export const getUIState = createFeatureSelector<UiState>('ui');

// export const getIsLoading = createSelector( getUIState, ( state: UiState ) => state.isLoading$ );
export const getIsLoading = ( state: UiState ) => state.isLoading;
export const getActiveTabs = createSelector( getUIState, ( state: UiState ) => state.activeTabs );
export const getIsActiveTab = ( tabName: string ) => createSelector( getUIState, ( state: UiState ) => state.activeTabs.includes( tabName ));
