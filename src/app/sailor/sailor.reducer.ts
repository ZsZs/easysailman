import { disable, FormGroupState, onNgrxForms, onNgrxFormsAction, setValue, SetValueAction, updateGroup, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { Sailor } from './sailor';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { allSailorsLoaded, editSailor, newSailor, sailorLoaded, setSelectedSailors } from './sailor.actions';
import { INITIAL_SAILOR_DETAILS_FORM_VALUE, validateSailorDetailsForm } from './sailor-details/sailor-details.reducer';
import { AppState } from '../app.reducer';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export interface SailorManagementState extends EntityState<Sailor> {
  allSailorsLoaded: boolean;
  sailorDetailsForm: FormGroupState<Sailor>;
  selectedSailors: Sailor[];
}

export const sailorAdapter: EntityAdapter<Sailor> = createEntityAdapter();
export const { selectAll, selectEntities, selectIds, selectTotal } = sailorAdapter.getSelectors();
export const INITIAL_SAILOR_MANAGEMENT_STATE: SailorManagementState = sailorAdapter.getInitialState({
    allSailorsLoaded: false,
    sailorDetailsForm: INITIAL_SAILOR_DETAILS_FORM_VALUE,
    selectedSailors: []
});

export interface State extends AppState {
  sailorManagement: SailorManagementState;
}

const rawReducer = createReducer(
  INITIAL_SAILOR_MANAGEMENT_STATE,
  onNgrxForms(),
  onNgrxFormsAction( SetValueAction, ( state, action ) => {
    return state;
  }),
  on( allSailorsLoaded, ( state, action ) => {
    return sailorAdapter.addAll( action.sailors, { ...state, allSailorsLoaded: true });
  }),
  on( sailorLoaded, ( state, action ) => {
    return sailorAdapter.addOne( action.sailor, { ...state, allSailorsLoaded: false });
  }),
  on( newSailor, ( state, action ) => {
    return sailorAdapter.addOne( action.sailor, { ...state, allSailorsLoaded: false });
  }),
  on( editSailor, ( state, action ) => {
    let formState = setValue<Sailor>( INITIAL_SAILOR_DETAILS_FORM_VALUE, { ...action.sailor });
    formState = updateGroup(formState, { id: disable });
    formState = validateSailorDetailsForm( formState );
    return { ...state, sailorDetailsForm: formState };
  }),
  on( setSelectedSailors, ( state, action ) => {
    return { ...state, selectedSailors: action.sailors };
  })
);

export const sailorReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.sailorDetailsForm,
  validateSailorDetailsForm
);

export const getSailorManagementState = createFeatureSelector<SailorManagementState>('sailorManagement');
export const getAllSailorsLoaded = createSelector( getSailorManagementState, sailorManagementState => sailorManagementState.allSailorsLoaded );
export const getSailors = createSelector( getSailorManagementState, selectAll );
export const getSailorById = ( id: number ) => createSelector( getSailorManagementState, sailorManagementState => sailorManagementState.entities[id] );
export const getSelectedSailors = createSelector( getSailorManagementState, sailorManagementState => sailorManagementState.selectedSailors );

export const getSailorDetailsForm = createSelector( getSailorManagementState, ( state: SailorManagementState ) => {
  console.log( state.sailorDetailsForm );
  return state.sailorDetailsForm;
});
