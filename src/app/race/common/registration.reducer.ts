import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

import { allRegistrationsLoaded, allRegistrationsUnLoaded, newRegistration, registrationLoaded, registrationSaved, setSelectedRegistrations } from './registration.actions';
import { RaceManagementState } from './race.reducer';
import { Registration } from '../domain/registration';

export interface RegistrationState extends EntityState<Registration> {
  allRegistrationsLoaded: boolean;
  selectedRegistrations: Registration[];
}

export const registrationAdapter: EntityAdapter<Registration> = createEntityAdapter();
export const { selectAll, selectEntities, selectIds, selectTotal } = registrationAdapter.getSelectors();
export const INITIAL_REGISTRATION_STATE: RegistrationState = registrationAdapter.getInitialState({
  allRegistrationsLoaded: false,
  selectedRegistrations: []
});

export const registrationReducer = createReducer(
  INITIAL_REGISTRATION_STATE,
  on( allRegistrationsLoaded, ( state, action ) => {
    return registrationAdapter.addAll( action.registrations, { ...state, allRegistrationsLoaded: true });
  }),
  on( allRegistrationsUnLoaded, ( state, action ) => {
    return { ...state, allRegistrationsLoaded: false, selectedRegistrations: [] };
  }),
  on( registrationLoaded, ( state, action ) => {
    return registrationAdapter.addOne( action.registration, { ...state, allRegistrationsLoaded: false });
  }),
  on( registrationSaved, ( state, action ) => {
    return registrationAdapter.addOne( action.registration, { ...state, allRegistrationsLoaded: false });
  }),
  on( newRegistration, ( state, action ) => {
    return registrationAdapter.addOne( action.registration, { ...state, allRegistrationsLoaded: false });
  }),
  on( setSelectedRegistrations, ( state, action ) => {
    return { ...state, selectedRegistrations: action.registrations };
  })
);

const getRaceManagementState = createFeatureSelector<RaceManagementState>(`raceManagement`);

export const getRegistrationState = createSelector( getRaceManagementState, state => state.registration );
export const getAllRegistrationsLoaded = createSelector( getRegistrationState, state => state.allRegistrationsLoaded );
export const getRegistrations = createSelector( getRegistrationState, selectAll );
export const getSelectedRegistrations = createSelector( getRegistrationState, state => state.selectedRegistrations );
export const getFirstSelectedRegistration = createSelector( getRegistrationState,  state => state.selectedRegistrations ? state.selectedRegistrations[0] : undefined );
export const getRegistrationById = ( id: string ) => createSelector( getRegistrationState, state => state.entities[id]);
