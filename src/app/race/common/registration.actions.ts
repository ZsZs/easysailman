import { createAction, props } from '@ngrx/store';
import { Registration } from '../domain/registration';
import { RouterUri } from '../../shared/router/router-uri';

export const allRegistrationsRequested = createAction('[REGISTRATION] All registrations requested', props<{ raceId: string }>() );
export const allRegistrationsLoaded = createAction('[REGISTRATION] All registrations loaded', props<{ registrations: Registration[], redirectTo?: RouterUri }>() );
export const allRegistrationsUnLoaded = createAction('[REGISTRATION] All registrations unloaded' );
export const registrationRequested = createAction('[REGISTRATION] Registration requested', props<{ raceId: string, registrationId: string }>() );
export const registrationLoaded = createAction('[REGISTRATION] Registration loaded', props<{ registration: Registration, redirectTo?: RouterUri }>() );
export const newRegistration = createAction('[REGISTRATION] New registration', props<{ registration: Registration }>() );
export const addRegistration = createAction( '[REGISTRATION] Add registration', props<{ registration: Registration, redirectTo?: RouterUri }>());
export const registrationSaved = createAction('[REGISTRATION] Registration saved', props<{ registration: Registration, redirectTo?: RouterUri }>() );
export const deleteRegistration = createAction( '[REGISTRATION] Delete registration', props<{ registration: Registration, redirectTo?: RouterUri }>());
export const registrationDeleted = createAction('[REGISTRATION] Registration deleted', props<{ redirectTo?: RouterUri }>() );
export const updateRegistration = createAction( '[REGISTRATION] Update registration', props<{ registration: Registration, redirectTo?: RouterUri }>());
export const editRegistration = createAction('[REGISTRATION] Edit registration', props<{ registration: Registration }>() );
export const setSelectedRegistrations = createAction('[REGISTRATION] Registrations selected', props<{ registrations: Registration[] }>() );
