import { createFormGroupState, updateGroup, validate } from 'ngrx-forms';
import { required } from 'ngrx-forms/validation';
import { YachtClub } from '../yacht-club';

const YACHT_CLUB_DETAILS_FORM_ID = 'Yacht-Club-Details Form';

export const INITIAL_YACHT_CLUB_DETAILS_FORM_VALUE = createFormGroupState<YachtClub>( YACHT_CLUB_DETAILS_FORM_ID, {
  id: undefined,
  name: ''
});

export const validateYachtClubDetailsForm = updateGroup<YachtClub>({
  name: validate( required ),
});
