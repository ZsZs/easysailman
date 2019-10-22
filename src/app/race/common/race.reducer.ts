import { combineReducers, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { AppState } from '../../app.reducer';
import { allRacesLoaded, newRace, raceLoaded, raceSaved, setSelectedRaces } from './race.actions';
import { Race } from '../domain/race';
import { INITIAL_REGISTRATION_DETAILS_FORM_VALUE, registrationDetailsReducer, validateRegistraionDetailsForm } from '../registration/details/registration-details.reducer';
import { registrationReducer, RegistrationState } from './registration.reducer';
import { raceDetailsReducer } from '../details/race-details.reducer';
import { lapReducer } from '../domain/lap.state';
import { IEntityState } from '@briebug/ngrx-auto-entity';
import { Lap } from '../domain/lap';

export interface RaceState extends EntityState<Race> {
   allRacesLoaded: boolean;
   selectedRaces: Race[];
}

export const raceAdapter: EntityAdapter<Race> = createEntityAdapter();
export const { selectAll, selectEntities, selectIds, selectTotal } = raceAdapter.getSelectors();
export const INITIAL_RACE_MANAGEMENT_STATE: RaceState = raceAdapter.getInitialState( {
   allRacesLoaded: false,
   selectedRaces: []
});

export interface RaceManagementState {
  lap: IEntityState<Lap>;
  race: RaceState;
  raceDetails: any;
  registration: RegistrationState;
  registrationDetails: any;
}

export interface State extends AppState {
   raceManagement: RaceManagementState;
}

const raceReducer = createReducer(
  INITIAL_RACE_MANAGEMENT_STATE,
  on( allRacesLoaded, ( state, action ) => {
     return raceAdapter.addAll( action.races, { ...state, allRacesLoaded: true });
  }),
  on( raceLoaded, ( state, action ) => {
    return raceAdapter.addOne( action.race, { ...state, allRacesLoaded: false });
  }),
  on( raceSaved, ( state, action ) => {
    return raceAdapter.addOne( action.race, { ...state, allRacesLoaded: false });
  }),
  on( newRace, ( state, action ) => {
    return raceAdapter.addOne( action.race, { ...state, allRacesLoaded: false });
  }),
  on( setSelectedRaces, ( state, action ) => {
    return { ...state, selectedRaces: action.races };
  })
);

export const raceManagementReducer = combineReducers({
  lap: lapReducer,
  race: raceReducer,
  raceDetails: raceDetailsReducer,
  registration: registrationReducer,
  registrationDetails: registrationDetailsReducer
});

const getRaceManagementState = createFeatureSelector<RaceManagementState>(`raceManagement`);
export const getAllRacesLoaded = createSelector( getRaceManagementState, state => state.race.allRacesLoaded );
export const getRaceState = createSelector( getRaceManagementState, state => state.race );
export const getRaces = createSelector( getRaceState, selectAll );
export const getRaceById = ( id: string ) => createSelector( getRaceState, state => state.entities[id]);
export const getSelectedRaces = createSelector( getRaceState, state => state.selectedRaces );
export const getFirstSelectedRace = createSelector( getRaceState, (state: RaceState) => state.selectedRaces ? state.selectedRaces[0] : undefined );

