import { Action, combineReducers } from '@ngrx/store';
import { FormGroupState, createFormGroupState, formGroupReducer, validate, updateGroup } from 'ngrx-forms';
import { Race } from '../race';
import { required } from 'ngrx-forms/validation';
import { AppState } from '../../app.reducer';

const RACE_DETAILS_FORM_ID = 'Race-Details Form';

export interface RaceDetailsFormValue {
  race: Race;
}

export const INITIAL_RACE_DETAILS_FORM_VALUE = createFormGroupState<Race>( RACE_DETAILS_FORM_ID, {
    id: undefined,
    title: '',
    fromDate: new Date(),
    toDate: new Date(),
    country: 'Germany',
    place: '',
    organizer: '',
    state: 'planned'
});

export interface RaceDetailsFormState {
  raceDetailsForm: FormGroupState<Race>;
}

export class SetSubmittedValueAction implements Action {
  static readonly TYPE = 'raceDetailsForm/SET_SUBMITTED_VALUE';
  readonly type = SetSubmittedValueAction.TYPE;
  constructor( public submittedValue: Race ) { }
}

export const validateUpdateRaceDetailsForm = updateGroup<Race>({
  title: validate( required )
});
