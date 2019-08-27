import { createAction, props } from '@ngrx/store';
import { YachtClub } from './yacht-club';

export const allYachtClubsRequested = createAction( '[YACHT-CLUB] All yacht-clubs requested' );
export const allYachtClubsLoaded = createAction( '[YACHT-CLUB] All yacht-clubs loaded', props<{ yachtClubs: YachtClub[] }>() );
export const yachtClubRequested = createAction( '[YACHT-CLUB] Yacht-club requested', props<{ yachtClubId: string }>() );
export const yachtClubLoaded = createAction( '[YACHT-CLUB] All yacht-club loaded', props<{ yachtClub: YachtClub }>() );
export const editYachtClub = createAction( '[YACHT-CLUB] Edit yacht-club', props<{ yachtClub: YachtClub }>() );
export const newYachtClub = createAction( '[YACHT-CLUB] New yacht-club', props<{ yachtClub: YachtClub }>() );
export const saveYachtClub = createAction( '[YACHT-CLUB] Save yacht-club loaded', props<{ yachtClub: YachtClub }>() );
export const deleteYachtClub = createAction( '[YACHT-CLUB] Delete yacht-club', props<{ yachtClub: YachtClub }>() );
export const changedYachtClub = createAction( '[YACHT-CLUB] Changed yacht-club', props<{ yachtClub: YachtClub }>() );
export const setSelectedYachtClubs = createAction( '[YACHT-CLUB] Set selected yacht-clubs', props<{ yachtClubs: YachtClub[] }>() );
