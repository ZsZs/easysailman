import { createFormGroupState, disable, FormGroupState, onNgrxForms, onNgrxFormsAction, setValue, SetValueAction, updateGroup, validate, wrapReducerWithFormStateUpdate } from 'ngrx-forms';
import { INITIAL_REGISTRATION_VALUE, Registration } from '../../domain/registration';
import { required } from 'ngrx-forms/validation';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { RaceManagementState } from '../../common/race.reducer';
import { editRegistration } from '../../common/registration.actions';

const REGISTRATION_DETAILS_FORM_ID = 'Registration-Details-Form';
export const INITIAL_REGISTRATION_DETAILS_FORM_VALUE = createFormGroupState<Registration>( REGISTRATION_DETAILS_FORM_ID, INITIAL_REGISTRATION_VALUE );
export const validateRegistraionDetailsForm = updateGroup<Registration>({
  sailNumber: validate( required ),
  boatName: validate( required ),
  boatType: validate( required ),
  skipper: validate( required )
});

interface RegistrationDetailsFormState {
  form: FormGroupState<Registration>;
}


const rawReducer = createReducer(
  {
    form: INITIAL_REGISTRATION_DETAILS_FORM_VALUE
  },
  onNgrxForms(),
  onNgrxFormsAction( SetValueAction, ( state, action ) => {
    return state;
  }),
  on( editRegistration, ( state, action ) => {
    let formState = setValue<Registration>( INITIAL_REGISTRATION_DETAILS_FORM_VALUE, { ...action.registration });
    formState = updateGroup(formState, { id: disable, raceId: disable });
    formState = validateRegistraionDetailsForm( formState );
    return { ...state, form: formState };
  })
);

export const registrationDetailsReducer = wrapReducerWithFormStateUpdate(
  rawReducer,
  state => state.form,
  validateRegistraionDetailsForm
);

const getRaceManagementState = createFeatureSelector<RaceManagementState>(`raceManagement`);
export const getRegistrationDetailsForm = createSelector( getRaceManagementState, ( state ) => state.registrationDetails.form );
