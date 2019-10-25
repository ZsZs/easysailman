import { createFormGroupState, validate, updateGroup, onNgrxForms, onNgrxFormsAction, SetValueAction, setValue, disable, wrapReducerWithFormStateUpdate, FormGroupState } from 'ngrx-forms';
import { INITIAL_RACE_VALUE, Race } from '../domain/race';
import { required } from 'ngrx-forms/validation';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { editRace } from '../race.actions';
import { RaceManagementState } from '../race.reducer';

const RACE_DETAILS_FORM_ID = 'Race-Details Form';

export const INITIAL_RACE_DETAILS_FORM_VALUE = createFormGroupState<Race>( RACE_DETAILS_FORM_ID, INITIAL_RACE_VALUE );

export const validateRaceDetailsForm = updateGroup<Race>({
  title: validate( required ),
  fromDate: validate( required ),
  toDate: validate( required ),
  country: validate( required ),
  place: validate( required ),
  state: validate( required )
});

interface RaceDetailsFormState {
  form: FormGroupState<Race>;
}

const rawReducer = createReducer(
  {
    form: INITIAL_RACE_DETAILS_FORM_VALUE
  },
  onNgrxForms(),
  onNgrxFormsAction( SetValueAction, ( state, action ) => {
    return state;
  }),
  on( editRace, ( state, action ) => {
    let formState = setValue<Race>( INITIAL_RACE_DETAILS_FORM_VALUE, { ...action.race });
    formState = updateGroup(formState, { id: disable });
    formState = validateRaceDetailsForm( formState );
    return { ...state, form: formState };
  }),
);

export const raceDetailsReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.form,
  validateRaceDetailsForm
);

const getRaceManagementState = createFeatureSelector<RaceManagementState>(`raceManagement`);
export const getDetailsForm = createSelector( getRaceManagementState, ( state ) => state.raceDetails.form );
