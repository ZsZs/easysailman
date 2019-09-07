import { createAction, props } from '@ngrx/store';
import { Sailor } from './sailor';
import { RouterUri } from '../shared/router/router-uri';

export const allSailorsRequested = createAction('[SAILOR] All sailors requested' );
export const allSailorsLoaded = createAction('[SAILOR] All sailors loaded', props<{ sailors: Sailor[], redirectTo?: RouterUri }>() );
export const sailorRequested = createAction('[SAILOR] Sailor requested', props<{ sailorId: string }>() );
export const sailorLoaded = createAction('[SAILOR] Sailor loaded', props<{ sailor: Sailor, redirectTo?: RouterUri }>() );
export const editSailor = createAction('[SAILOR] Edit Sailor', props<{ sailor: Sailor }>() );
export const newSailor = createAction('[SAILOR] New Sailor', props<{ sailor: Sailor }>() );
export const addSailor = createAction('[SAILOR] Add Sailor', props<{ sailor: Sailor, redirectTo?: RouterUri }>() );
export const deleteSailor = createAction('[SAILOR] Delete Sailor', props<{ sailorId: string, redirectTo?: RouterUri }>() );
export const sailorDeleted = createAction('[SAILOR] Sailor deleted', props<{ redirectTo?: RouterUri }>() );
export const updateSailor = createAction('[SAILOR] Save Sailor', props<{ sailor: Sailor, redirectTo?: RouterUri }>() );
export const sailorSaved = createAction('[SAILOR] Sailor saved', props<{ sailor: Sailor, redirectTo?: RouterUri }>() );
export const setSelectedSailors = createAction('[SAILOR] sailor selected', props<{ sailors: Sailor[] }>() );
export const sailorAPIError = createAction('[SAILOR] Sailor API error', props<{ error: string, redirectTo?: RouterUri }>() );
