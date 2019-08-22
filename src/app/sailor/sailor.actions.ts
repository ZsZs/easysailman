import { createAction, props } from '@ngrx/store';
import { Sailor } from './sailor';

export const allSailorsRequested = createAction('[SAILOR] All sailors requested' );
export const allSailorsLoaded = createAction('[SAILOR] All sailors loaded', props<{ sailors: Sailor[] }>() );
export const sailorRequested = createAction('[SAILOR] Sailor requested', props<{ sailorId: string }>() );
export const sailorLoaded = createAction('[SAILOR] Sailor loaded', props<{ sailor: Sailor }>() );
export const editSailor = createAction('[SAILOR] Edit Sailor', props<{ sailor: Sailor }>() );
export const newSailor = createAction('[SAILOR] New Sailor', props<{ sailor: Sailor }>() );
export const changedSailor = createAction('[SAILOR] Changed Sailor', props<{ sailor: Sailor }>() );
export const deleteSailor = createAction('[SAILOR] Delete Sailor', props<{ sailorId: string }>() );
export const saveSailor = createAction('[SAILOR] Save Sailor', props<{ sailor: Sailor }>() );
export const setSelectedSailors = createAction('[SAILOR] sailor selected', props<{ sailors: Sailor[] }>() );
