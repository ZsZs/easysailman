import { Action, createAction, props } from '@ngrx/store';

export const startLoading = createAction( '[UI] Start Loading' );
export const stopLoading = createAction( '[UI] Stop Loading' );

export const tabIsActive = createAction( '[UI] Tab is active', props<{ tabName: string }>() );
export const tabIsInActive = createAction( '[UI] Tab is inactive', props<{ tabName: string }>() );
