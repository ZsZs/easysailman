import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { disable, FormGroupState, onNgrxForms, onNgrxFormsAction, setValue, SetValueAction, updateGroup, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { AppState } from '../app.reducer';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { YachtClub } from './yacht-club';
import { INITIAL_YACHT_CLUB_DETAILS_FORM_VALUE, validateYachtClubDetailsForm } from './yacht-club-details/yacht-club-details.reducer';
import { allYachtClubsLoaded, editYachtClub, newYachtClub, setSelectedYachtClubs, yachtClubLoaded } from './yacht-club.actions';

export interface YachtClubManagementState extends EntityState<YachtClub> {
  allYachtClubsLoaded: boolean;
  yachtClubDetailsForm: FormGroupState<YachtClub>;
  selectedYachtClubs: YachtClub[];
}

export const yachtClubAdapter: EntityAdapter<YachtClub> = createEntityAdapter();
export const { selectAll, selectEntities, selectIds, selectTotal } = yachtClubAdapter.getSelectors();
export const INITIAL_YACHT_CLUB_MANAGEMENT_STATE: YachtClubManagementState = yachtClubAdapter.getInitialState( {
  allYachtClubsLoaded: false,
  yachtClubDetailsForm: INITIAL_YACHT_CLUB_DETAILS_FORM_VALUE,
  selectedYachtClubs: []
});

export interface State extends AppState {
  yachtClubManagement: YachtClubManagementState;
}

const rawReducer = createReducer(
  INITIAL_YACHT_CLUB_MANAGEMENT_STATE,
  onNgrxForms(),
  onNgrxFormsAction( SetValueAction, ( state, action ) => {
    return state;
  }),
  on( allYachtClubsLoaded, ( state, action ) => {
    return yachtClubAdapter.addAll( action.yachtClubs, { ...state, allYachtClubsLoaded: true });
  }),
  on( yachtClubLoaded, ( state, action ) => {
    return yachtClubAdapter.addOne( action.yachtClub, { ...state, allYachtClubsLoaded: false });
  }),
  on( newYachtClub, ( state, action ) => {
    return yachtClubAdapter.addOne( action.yachtClub, { ...state, allYachtClubsLoaded: false });
  }),
  on( editYachtClub, ( state, action ) => {
    let formState = setValue<YachtClub>( INITIAL_YACHT_CLUB_DETAILS_FORM_VALUE, { ...action.yachtClub });
    formState = updateGroup(formState, { id: disable });
    formState = validateYachtClubDetailsForm( formState );
    return { ...state, yachtClubDetailsForm: formState };
  }),
  on( setSelectedYachtClubs, ( state, action ) => {
    return { ...state, selectedYachtClubs: action.yachtClubs };
  })
);

export const yachtClubReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.yachtClubDetailsForm,
  validateYachtClubDetailsForm
);

export const getYachtClubManagementState = createFeatureSelector<YachtClubManagementState>('yachtClubManagement');
export const getAllYachtClubsLoaded = createSelector( getYachtClubManagementState, state => state.allYachtClubsLoaded );
export const getYachtClubs = createSelector( getYachtClubManagementState, selectAll );
export const getYachtClubById = ( id: string ) => createSelector( getYachtClubManagementState, state => state.entities[id] );
export const getSelectedYachtClubs = createSelector( getYachtClubManagementState, state => state.selectedYachtClubs );

export const getDetailsForm = createSelector( getYachtClubManagementState, ( state: YachtClubManagementState ) => {
  console.log( state.yachtClubDetailsForm );
  return state.yachtClubDetailsForm;
});
