import { createAction, props } from '@ngrx/store';
import { Race } from './race';

export const allRacesRequested = createAction('[RACE] All races requested' );
export const allRacesLoaded = createAction('[RACE] All races loaded', props<{ races: Race[] }>() );
export const raceRequested = createAction('[RACE] Race requested', props<{ raceId: string }>() );
export const raceLoaded = createAction('[RACE] Race loaded', props<{ race: Race }>() );
export const editRace = createAction('[RACE] Edit Race', props<{ race: Race }>() );
export const newRace = createAction('[RACE] New Race', props<{ race: Race }>() );
export const deleteRace = createAction('[RACE] Delete Race', props<{ raceId: string }>() );
export const raceDeleted = createAction('[RACE] Race deleted' );
export const saveRace = createAction('[RACE] Save Race', props<{ race: Race }>() );
export const raceSaved = createAction('[RACE] Race saved', props<{ race: Race }>() );
export const changedRace = createAction('[RACE] Changed Race', props<{ race: Race }>() );
export const setSelectedRaces = createAction('[RACE] Races selected', props<{ races: Race[] }>() );

