import { Action } from '@ngrx/store';
import { START_LOADING, STOP_LOADING, UiActions } from './ui.actions';

export interface UiState {
   isLoading: boolean;
}

const initialState: UiState = {
   isLoading: false
}

export function uiReducer( state = initialState, action: UiActions ): UiState {
   switch ( action.type ) {
      case START_LOADING:
         return { isLoading: true };
      case STOP_LOADING:
         return { isLoading: false };
      default:
         return state;
   }
}

export const getIsLoading = ( state: UiState ) => state.isLoading;
