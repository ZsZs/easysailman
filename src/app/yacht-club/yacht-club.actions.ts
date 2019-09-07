import { createAction, props } from '@ngrx/store';
import { YachtClub } from './yacht-club';
import { RouterUri } from '../shared/router/router-uri';

export const allYachtClubsRequested = createAction( '[YACHT-CLUB] All yacht-clubs requested', props<{ redirectTo?: RouterUri }>() );
export const allYachtClubsLoaded = createAction( '[YACHT-CLUB] All yacht-clubs loaded', props<{ yachtClubs: YachtClub[], redirectTo?: RouterUri }>() );
export const yachtClubRequested = createAction( '[YACHT-CLUB] Yacht-club requested', props<{ yachtClubId: string, redirectTo?: RouterUri }>() );
export const yachtClubLoaded = createAction( '[YACHT-CLUB] All yacht-club loaded', props<{ yachtClub: YachtClub, redirectTo?: RouterUri }>() );
export const editYachtClub = createAction( '[YACHT-CLUB] Edit yacht-club', props<{ yachtClub: YachtClub }>() );
export const newYachtClub = createAction( '[YACHT-CLUB] New yacht-club', props<{ yachtClub: YachtClub }>() );
export const addYachtClub = createAction( '[YACHT-CLUB] Add yacht-club', props<{ yachtClub: YachtClub, redirectTo?: RouterUri }>() );
export const updateYachtClub = createAction( '[YACHT-CLUB] Update yacht-club', props<{ yachtClub: YachtClub, redirectTo?: RouterUri }>() );
export const yachtClubSaved = createAction( '[YACHT-CLUB] Yacht-club saved', props<{ yachtClub: YachtClub, redirectTo?: RouterUri }>() );
export const deleteYachtClub = createAction( '[YACHT-CLUB] Delete yacht-club', props<{ yachtClubId: string, redirectTo?: RouterUri }>() );
export const yachtClubDeleted = createAction( '[YACHT-CLUB] Yacht-club deleted', props<{ redirectTo?: RouterUri }>() );
export const setSelectedYachtClubs = createAction( '[YACHT-CLUB] Set selected yacht-clubs', props<{ yachtClubs: YachtClub[] }>() );
export const yachtClubAPIError = createAction( '[YACHT-CLUB] Yacht Club API error', props<{ error: string, redirectTo?: RouterUri }>() );
