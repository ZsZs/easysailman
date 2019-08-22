import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { FormGroupState, SetValueAction, onNgrxForms, wrapReducerWithFormStateUpdate, onNgrxFormsAction, setValue, updateGroup, disable } from 'ngrx-forms';

import { Race } from './race';
import { AppState } from '../app.reducer';
import { INITIAL_RACE_DETAILS_FORM_VALUE, validateRaceDetailsForm } from './race-details/race-details.reducer';
import { allRacesLoaded, editRace, newRace, raceLoaded, setSelectedRaces } from './race.actions';

export interface RaceManagementState extends EntityState<Race> {
   allRacesLoaded: boolean;
   raceDetailsForm: FormGroupState<Race>;
   selectedRaces: Race[];
}

export const raceAdapter: EntityAdapter<Race> = createEntityAdapter();
export const { selectAll, selectEntities, selectIds, selectTotal } = raceAdapter.getSelectors();
export const INITIAL_RACE_MANAGEMENT_STATE: RaceManagementState = raceAdapter.getInitialState( {
   allRacesLoaded: false,
   raceDetailsForm: INITIAL_RACE_DETAILS_FORM_VALUE,
   selectedRaces: []
});

export interface State extends AppState {
   raceManagement: RaceManagementState;
}

const rawReducer = createReducer(
  INITIAL_RACE_MANAGEMENT_STATE,
  onNgrxForms(),
  onNgrxFormsAction( SetValueAction, ( state, action ) => {
     console.log( action.controlId );
     if ( action.controlId === 'raceDetailsForm.title' ) {
        console.log( state );
     }
     return state;
  }),
  on( allRacesLoaded, ( state, action ) => {
     return raceAdapter.addAll( action.races, { ...state, allRacesLoaded: true });
  }),
  on( raceLoaded, ( state, action ) => {
    return raceAdapter.addOne( action.race, { ...state, allRacesLoaded: false });
  }),
  on( newRace, ( state, action ) => {
    return raceAdapter.addOne( action.race, { ...state, allRacesLoaded: false });
  }),
  on( editRace, ( state, action ) => {
    let formState = setValue<Race>( INITIAL_RACE_DETAILS_FORM_VALUE, { ...action.race });
    formState = updateGroup(formState, { id: disable });
    formState = validateRaceDetailsForm( formState );
    return { ...state, raceDetailsForm: formState };
  }),
  on( setSelectedRaces, ( state, action ) => {
    return { ...state, selectedRaces: action.races };
  })
);

export const raceReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.raceDetailsForm,
  validateRaceDetailsForm
);

export const getRaceManagementState = createFeatureSelector<RaceManagementState>('raceManagement');
export const getAllRacesLoaded = createSelector( getRaceManagementState, raceManagementState => raceManagementState.allRacesLoaded );
export const getRaces = createSelector( getRaceManagementState, selectAll );
export const getRaceById = ( raceId: number ) => createSelector( getRaceManagementState, raceManagementState => raceManagementState.entities[raceId] );
export const getSelectedRaces = createSelector( getRaceManagementState, raceManagementState => raceManagementState.selectedRaces );

export const getDetailsForm = createSelector( getRaceManagementState, ( state: RaceManagementState ) => {
   console.log( state.raceDetailsForm );
   return state.raceDetailsForm;
});
