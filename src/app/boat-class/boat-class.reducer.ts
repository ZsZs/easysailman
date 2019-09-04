import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { disable, FormGroupState, onNgrxForms, onNgrxFormsAction, setValue, SetValueAction, updateGroup, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { AppState } from '../app.reducer';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { BoatClass } from './boat-class';
import { allBoatClassesLoaded, boatClassLoaded, editBoatClass, newBoatClass, setSelectedBoatClasses } from './boat-class.actions';
import { INITIAL_BOAT_CLASS_DETAILS_FORM_VALUE, validateBoatClassDetailsForm } from './details/boat-class-details.reducer';

export interface BoatClassManagementState extends EntityState<BoatClass> {
  allBoatClassesLoaded: boolean;
  boatClassDetailsForm: FormGroupState<BoatClass>;
  selectedBoatClasses: BoatClass[];
}

export const boatClassAdapter: EntityAdapter<BoatClass> = createEntityAdapter();
export const { selectAll, selectEntities, selectIds, selectTotal } = boatClassAdapter.getSelectors();
export const INITIAL_BOAT_CLASS_MANAGEMENT_STATE: BoatClassManagementState = boatClassAdapter.getInitialState( {
  allBoatClassesLoaded: false,
  boatClassDetailsForm: INITIAL_BOAT_CLASS_DETAILS_FORM_VALUE,
  selectedBoatClasses: []
});

export interface State extends AppState {
  boatClassManagement: BoatClassManagementState;
}

const rawReducer = createReducer(
  INITIAL_BOAT_CLASS_MANAGEMENT_STATE,
  onNgrxForms(),
  onNgrxFormsAction( SetValueAction, ( state, action ) => {
    return state;
  }),
  on( allBoatClassesLoaded, ( state, action ) => {
    return boatClassAdapter.addAll( action.boatClasses, { ...state, allBoatClassesLoaded: true });
  }),
  on( boatClassLoaded, ( state, action ) => {
    return boatClassAdapter.addOne( action.boatClass, { ...state, allBoatClassesLoaded: false });
  }),
  on( newBoatClass, ( state, action ) => {
    return boatClassAdapter.addOne( action.boatClass, { ...state, allBoatClassesLoaded: false });
  }),
  on( editBoatClass, ( state, action ) => {
    let formState = setValue<BoatClass>( INITIAL_BOAT_CLASS_DETAILS_FORM_VALUE, { ...action.boatClass });
    formState = updateGroup(formState, { id: disable });
    formState = validateBoatClassDetailsForm( formState );
    return { ...state, boatClassDetailsForm: formState };
  }),
  on( setSelectedBoatClasses, ( state, action ) => {
    return { ...state, selectedBoatClasses: action.boatClasses };
  })
);

export const boatClassReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.boatClassDetailsForm,
  validateBoatClassDetailsForm
);

export const getBoatClassManagementState = createFeatureSelector<BoatClassManagementState>('boatClassManagement');
export const getAllBoatClassesLoaded = createSelector( getBoatClassManagementState, state => state.allBoatClassesLoaded );
export const getBoatClasses = createSelector( getBoatClassManagementState, selectAll );
export const getBoatClassById = ( id: number ) => createSelector( getBoatClassManagementState, state => state.entities[id] );
export const getSelectedBoatClasses = createSelector( getBoatClassManagementState, state => state.selectedBoatClasses );

export const getDetailsForm = createSelector( getBoatClassManagementState, ( state: BoatClassManagementState ) => state.boatClassDetailsForm );
