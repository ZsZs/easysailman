import { createFormGroupState, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { Sailor } from '../sailor';

const SAILOR_DETAILS_FORM_ID = 'Sailor-Details Form';

export const INITIAL_SAILOR_DETAILS_FORM_VALUE = createFormGroupState<Sailor>( SAILOR_DETAILS_FORM_ID, {
  id: undefined,
  firstName: '',
  lastName: ''
});

export const validateSailorDetailsForm = updateGroup<Sailor>({
  firstName: validate( required ),
  lastName  : validate( required )
});
