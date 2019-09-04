import { createFormGroupState, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { BoatClass } from '../boat-class';

const BOAT_CLASS_DETAILS_FORM_ID = 'Race-Details Form';

export const INITIAL_BOAT_CLASS_DETAILS_FORM_VALUE = createFormGroupState<BoatClass>( BOAT_CLASS_DETAILS_FORM_ID, {
  id: undefined,
  name: '',
  yardstick: undefined
});

export const validateBoatClassDetailsForm = updateGroup<BoatClass>({
  name: validate( required ),
  yardstick: validate( required )
});
