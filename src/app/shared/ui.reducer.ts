import { Action, createReducer, on } from '@ngrx/store';
import { startLoading, stopLoading } from './ui.actions';

export interface UiState {
   isLoading: boolean;
}

const initialState: UiState = {
   isLoading: false
};

export const uiReducer = createReducer(
   initialState,
   on( startLoading, ( state, action ) => {
      return { isLoading: true };
   }),
  on( stopLoading, ( state, action ) => {
     return { isLoading: false };
  })
);

export const getIsLoading = ( state: UiState ) => state.isLoading;
