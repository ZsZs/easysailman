import { createAction, props } from '@ngrx/store';
import { Race } from './domain/race';
import { RouterUri } from '../shared/router/router-uri';

export const allRacesRequested = createAction('[RACE] All races requested' );
export const allRacesLoaded = createAction('[RACE] All races loaded', props<{ races: Race[], redirectTo?: RouterUri }>() );
export const raceRequested = createAction('[RACE] Race requested', props<{ raceId: string }>() );
export const raceRequestedAndSelect = createAction('[RACE] Race requested and select', props<{ raceId: string }>() );
export const raceLoaded = createAction('[RACE] Race loaded', props<{ race: Race, redirectTo?: RouterUri }>() );
export const editRace = createAction('[RACE] Edit Race', props<{ race: Race }>() );
export const newRace = createAction('[RACE] New Race', props<{ race: Race }>() );
export const addRace = createAction('[RACE] Add Race', props<{ race: Race, redirectTo?: RouterUri }>() );
export const deleteRace = createAction('[RACE] Delete Race', props<{ raceId: string, redirectTo?: RouterUri }>() );
export const raceDeleted = createAction('[RACE] Race deleted', props<{ redirectTo?: RouterUri }>());
export const updateRace = createAction('[RACE] Update race', props<{ race: Race, redirectTo?: RouterUri }>() );
export const raceSaved = createAction('[RACE] Race saved', props<{ race: Race, redirectTo?: RouterUri }>() );
export const setSelectedRaces = createAction('[RACE] Races selected', props<{ races: Race[] }>() );
export const raceAPIError = createAction( '[RACE] Race API error', props<{ error: string, redirectTo?: RouterUri }>());
