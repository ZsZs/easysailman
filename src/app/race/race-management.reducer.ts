import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

import { FETCH_RACES, CHANGED_RACE, RaceManagementActions, NEW_RACE } from './race-management.actions';
import { Race } from './race';
import * as fromAppReducer from '../app.reducer';
import { SET_UNAUTHENTICATED } from '../authentication/auth.actions';
import { AppState } from '../app.reducer';
import { createFormGroupState, formGroupReducer, FormGroupState } from 'ngrx-forms';
import { INITIAL_RACE_DETAILS_FORM_VALUE, SetSubmittedValueAction, validateUpdateRaceDetailsForm } from './race-details/race-details.reducer';

export interface RaceManagementState {
   races: Race[];
   selectedRace: Race;
   raceDetailsForm: FormGroupState<Race>;
}

const INITIAL_RACE_MANAGEMENT_STATE: RaceManagementState = {
   races: [],
   selectedRace: {
      id: undefined,
      title: '',
      fromDate: new Date(),
      toDate: new Date(),
      country: 'Germany',
      place: '',
      organizer: '',
      state: 'planned'
   },
   raceDetailsForm: INITIAL_RACE_DETAILS_FORM_VALUE
}

export interface State extends AppState {
   raceManagement: RaceManagementState;
}

export function raceManagementReducer( state = INITIAL_RACE_MANAGEMENT_STATE, action: RaceManagementActions ): RaceManagementState {

   const raceDetailsForm = validateUpdateRaceDetailsForm( formGroupReducer( state.raceDetailsForm, action ));
   if ( raceDetailsForm !== state.raceDetailsForm ) {
      state = { ...state, raceDetailsForm };
   }

   switch ( action.type ) {
      case FETCH_RACES:
         return { ...state, races: action.payload };
      case NEW_RACE:
         return {
            ...state,
            selectedRace: {
               id: undefined,
               title: '',
               fromDate: new Date(),
               toDate: new Date(),
               country: 'Germany',
               place: '',
               organizer: '',
               state: 'planned'
            }
         };
      case CHANGED_RACE:
         return { ...state, selectedRace: action.payload };
      case SetSubmittedValueAction.TYPE:
         return { ... state, selectedRace: action.submittedValue };
      default:
         return state;
   }
}

export const getRaceManagementState = createFeatureSelector<RaceManagementState>('raceManagement');

export const getRaces = createSelector( getRaceManagementState, ( state: RaceManagementState ) => state.races );
export const getSelectedRace = createSelector( getRaceManagementState, ( state: RaceManagementState ) => state.selectedRace );
export const getIsSelectedRace = createSelector( getRaceManagementState, ( state: RaceManagementState ) => state.selectedRace != null );

export const getDetailsForm = createSelector( getRaceManagementState, ( state: RaceManagementState ) => {
   console.log( state.raceDetailsForm );
   return state.raceDetailsForm;
});
