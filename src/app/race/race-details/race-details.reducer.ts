import { createFormGroupState, validate, updateGroup } from 'ngrx-forms';
import { Race } from '../race';
import { required } from 'ngrx-forms/validation';

const RACE_DETAILS_FORM_ID = 'Race-Details Form';

export const INITIAL_RACE_DETAILS_FORM_VALUE = createFormGroupState<Race>( RACE_DETAILS_FORM_ID, {
    id: undefined,
    title: '',
    fromDate: undefined,
    toDate: undefined,
    country: 'Germany',
    place: '',
    organizer: '',
    state: 'planned'
});

export const validateRaceDetailsForm = updateGroup<Race>({
  title: validate( required ),
  fromDate: validate( required ),
  toDate: validate( required ),
  country: validate( required ),
  place: validate( required ),
  state: validate( required )
});
